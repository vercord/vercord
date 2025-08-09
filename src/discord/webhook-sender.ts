import { type Embed, Webhook } from '@vermaysha/discord-webhook';

import { DEFAULT_AVATAR_URL } from '@/consts/discord';
import { env } from '@/env';

const WEBHOOK_CONFIG = {
  username: env.DISCORD_WEBHOOK_USERNAME || 'Vercord',
  avatarUrl: env.DISCORD_WEBHOOK_AVATAR_URL || DEFAULT_AVATAR_URL
} as const;

const RETRY_CONFIG = {
  maxRetries: 3,
  rateLimitDelay: 5000,
  backoffMultiplier: 1000
} as const;

export async function sendWebhook(embed: Embed): Promise<void> {
  const hook = new Webhook(env.DISCORD_WEBHOOK_URL);
  hook.setUsername(WEBHOOK_CONFIG.username);
  hook.setAvatarUrl(WEBHOOK_CONFIG.avatarUrl);
  hook.addEmbed(embed);

  await sendWithRetry(hook);
}

async function sendWithRetry(hook: Webhook, attempt = 0): Promise<void> {
  if (attempt >= RETRY_CONFIG.maxRetries) {
    throw new Error('Maximum retry attempts reached');
  }

  try {
    await hook.send();
  } catch (error) {
    if (error instanceof Error && error.message.includes('429')) {
      await delay(RETRY_CONFIG.rateLimitDelay);
      return sendWithRetry(hook, attempt);
    }

    if (attempt === RETRY_CONFIG.maxRetries - 1) {
      throw error;
    }

    await delay(RETRY_CONFIG.backoffMultiplier * (attempt + 1));
    return sendWithRetry(hook, attempt + 1);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
