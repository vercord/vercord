import HttpStatusCode from '@/enums/http-status-codes';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Create a memory-based rate limiter
// This is suitable for serverless functions with limited execution context persistence
// For production with multiple instances, consider using Redis or another distributed store
const apiLimiter = new RateLimiterMemory({
  points: 10, // Number of points
  duration: 60, // Per second
  blockDuration: 60 // Block for 1 minute if exceeded
});

/**
 * Rate limiting middleware for API routes
 * @param ip Client IP address to rate limit
 * @returns Response object if rate limit exceeded, undefined otherwise
 */
export async function checkRateLimit(
  ip: string
): Promise<Response | undefined> {
  try {
    await apiLimiter.consume(ip);
    return undefined; // No rate limit exceeded
  } catch (error) {
    // Rate limit exceeded
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
}
