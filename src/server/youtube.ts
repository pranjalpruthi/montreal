import { createServerFn } from '@tanstack/react-start';
import { ofetch } from 'ofetch';
import Redis from 'ioredis';

export interface YouTubeShort {
  id: string;
  title: string;
  thumbnail: string;
}

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours
const CACHE_KEY = 'youtube:shorts:v1';

// 1. Initialize Redis securely
// Use bracket notation to ensure Vite/Rollup doesn't replace these with static values during build
const getRedisClient = () => {
  const redisUrl = process.env['REDIS_URL'];
  
  if (!redisUrl) return null;

  try {
    return new Redis(redisUrl, {
      lazyConnect: true, // Don't connect immediately
      tls: redisUrl.startsWith('rediss://') ? {} : undefined,
      maxRetriesPerRequest: 1,
    });
  } catch (err) {
    console.error('Failed to initialize Redis client:', err);
    return null;
  }
};

const redis = getRedisClient();

// 2. Fallback Memory Cache (For Local Development)
let localCache: { data: YouTubeShort[]; timestamp: number } = {
  data: [],
  timestamp: 0,
};

export const getYouTubeShorts = createServerFn({ method: 'GET' })
  .handler(async () => {
    const now = Date.now();
    const API_KEY = process.env['YOUTUBE_API_KEY'];
    const CHANNEL_ID = process.env['YOUTUBE_CHANNEL_ID'];

    if (!API_KEY || !CHANNEL_ID) {
        console.error('❌ Missing Credentials on Server', {
            hasApiKey: !!API_KEY,
            hasChannelId: !!CHANNEL_ID,
            envKeys: Object.keys(process.env).filter(k => k.startsWith('YOUTUBE'))
        });
        throw new Error('Missing YouTube API Credentials in environment variables');
    }

    // --- STEP A: TRY TO READ CACHE ---
    if (redis) {
      try {
        const cachedString = await redis.get(CACHE_KEY);
        if (cachedString) {
          const cached = JSON.parse(cachedString);
          // Verify age (Optional safety check, since Redis expires keys automatically)
          if (now - cached.timestamp < CACHE_DURATION) {
            console.log('⚡ Redis Cache Hit');
            return cached.data;
          }
        }
      } catch (e) {
        console.warn('Redis connection failed, continuing to API...', e);
      }
    } else {
      // Local Dev: Check memory variable
      if (localCache.data.length > 0 && (now - localCache.timestamp < CACHE_DURATION)) {
        console.log('⚡ Local Memory Cache Hit');
        return localCache.data;
      }
    }

    // --- STEP B: FETCH FROM YOUTUBE ---
    console.log('🔄 Cache Empty/Expired - Calling YouTube API...');
    
    try {
      const response = await ofetch('https://www.googleapis.com/youtube/v3/search', {
        query: {
          part: 'snippet',
          channelId: CHANNEL_ID,
          maxResults: '50',
          order: 'date',
          type: 'video',
          videoDuration: 'short',
          key: API_KEY,
        },
        timeout: 10000,
      });

      if (!response.items?.length) return [];

      const shorts = response.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      // --- STEP C: WRITE TO CACHE ---
      const cacheObject = { data: shorts, timestamp: now };

      if (redis) {
        // Save to Redis
        // 'EX' 86400 = Auto-delete after 24 hours
        await redis.set(CACHE_KEY, JSON.stringify(cacheObject), 'EX', 86400);
        console.log(`✅ Saved ${shorts.length} shorts to Redis`);
      } else {
        // Save to Local Memory
        localCache = cacheObject;
        console.log(`✅ Saved ${shorts.length} shorts to Local Memory`);
      }

      return shorts;

    } catch (error) {
      console.error('API Error:', error);
      
      // Graceful Fallback: Try to serve stale data if API fails
      if (redis) {
        const stale = await redis.get(CACHE_KEY);
        if (stale) return JSON.parse(stale).data;
      }
      return localCache.data || [];
    }
  });
