import { createEnv } from '@t3-oss/env-nextjs';
import { string } from 'zod/v4';

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    WEBHOOK_INTEGRATION_SECRET: string(),
    DISCORD_WEBHOOK_URL: string().url(),
    DISCORD_WEBHOOK_USERNAME: string().optional(),
    DISCORD_WEBHOOK_AVATAR_URL: string().url().optional()
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    WEBHOOK_INTEGRATION_SECRET: process.env.WEBHOOK_INTEGRATION_SECRET,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    DISCORD_WEBHOOK_USERNAME: process.env.DISCORD_WEBHOOK_USERNAME,
    DISCORD_WEBHOOK_AVATAR_URL: process.env.DISCORD_WEBHOOK_AVATAR_URL
  }
});
