import { type Embed } from '@vermaysha/discord-webhook';

import {
  createDeploymentEmbed,
  createDomainEmbed,
  createGenericEmbed,
  createProjectEmbed
} from '@/discord/embed-builders';
import { type VercelWebhook } from '@/schemas/vercel';

type EmbedCreator = (webhook: VercelWebhook) => Embed;

const EMBED_CREATORS: Record<string, EmbedCreator> = {
  deployment: createDeploymentEmbed,
  domain: createDomainEmbed,
  project: createProjectEmbed
} as const;

export function createEmbedFromWebhook(webhook: VercelWebhook): Embed {
  const typePrefix = webhook.type.split('.')[0];
  const creator = EMBED_CREATORS[typePrefix];

  return creator ? creator(webhook) : createGenericEmbed(webhook);
}
