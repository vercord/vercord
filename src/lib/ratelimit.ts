import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import HttpStatusCode from '@/enums/http-status-codes';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s') // 10 requests per 60 seconds
});

/**
 * Rate limiting middleware for API routes
 * @param ip Client IP address to rate limit
 * @returns Response object if rate limit exceeded, undefined otherwise
 */
export async function checkRateLimit(
  ip: string
): Promise<Response | undefined> {
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Too many requests, please try again later',
        code: 'rate_limit_exceeded'
      }),
      {
        status: HttpStatusCode.TOO_MANY_REQUESTS_429,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  return undefined;
}
