// Type declarations for Nitro runtime
declare module 'nitro/runtime' {
  export function useRuntimeConfig(): {
    youtubeApiKey?: string;
    youtubeChannelId?: string;
    [key: string]: any;
  };
}
