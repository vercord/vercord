import { type Embed } from '@vermaysha/discord-webhook';

import { createEmbedFromWebhook } from '@/discord/embed-factory';
import { sendWebhook } from '@/discord/webhook-sender';
import { type VercelWebhook } from '@/schemas/vercel';

export function createMessageFromWebhook(webhook: VercelWebhook): Embed {
  return createEmbedFromWebhook(webhook);
}

export async function sendDiscordNotification(embed: Embed): Promise<void> {
  return sendWebhook(embed);
}
