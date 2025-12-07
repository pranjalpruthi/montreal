import { createServerFn } from '@tanstack/react-start';
import { ofetch } from 'ofetch';
import { useRuntimeConfig } from 'nitro/runtime';

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours


export interface YouTubeShort {
  id: string;
  title: string;
  thumbnail: string;
}

let cache: {
  data: YouTubeShort[];
  timestamp: number;
  fetchCount: number; // Track API calls
} = {
  data: [],
  timestamp: 0,
  fetchCount: 0
};

export const getYouTubeShorts = createServerFn({ method: 'GET' })
  .handler(async () => {
    const now = Date.now();
    
    // Use Nitro runtime config for proper environment variable access
    const config = useRuntimeConfig();
    const API_KEY = config.youtubeApiKey as string;
    const CHANNEL_ID = config.youtubeChannelId as string;

    if (!API_KEY || !CHANNEL_ID) {
      throw new Error('Missing YouTube API credentials in environment variables');
    }

    // Check cache validity
    if (cache.data.length > 0 && (now - cache.timestamp < CACHE_DURATION)) {
      console.log('⚡ Cache hit - serving to user', {
        cacheAge: Math.round((now - cache.timestamp) / 1000 / 60), // minutes
        totalFetches: cache.fetchCount
      });
      return cache.data;
    }

    // Cache miss - fetch from API
    console.log('🔄 Cache expired - fetching from YouTube API', {
      lastFetch: new Date(cache.timestamp).toISOString(),
      fetchNumber: cache.fetchCount + 1
    });

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
        timeout: 10000, // 10s timeout
      });

      if (!response.items?.length) {
        console.warn('No shorts returned from API');
        return cache.data || [];
      }

      const shorts = response.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      // Update cache with metrics
      cache = {
        data: shorts,
        timestamp: now,
        fetchCount: cache.fetchCount + 1
      };

      console.log(`✅ Cached ${shorts.length} shorts - Quota used: 100 units`);
      return shorts;

    } catch (error) {
      console.error('YouTube API error:', error);
      
      // Serve stale cache on error (graceful degradation)
      if (cache.data.length > 0) {
        console.warn('⚠️ Serving stale cache due to API error');
        return cache.data;
      }
      
      throw error;
    }
  });
