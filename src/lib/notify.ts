import { Embed, Webhook } from '@vermaysha/discord-webhook';

import { EMOJIS, getStateProperty } from '@/consts/discord';
import { env } from '@/env';
import { type VercelWebhook, type WebhookType } from '@/schemas/vercel';

// Define bot info centrally
const DISCORD_BOT_USERNAME = 'Vercel';
const DISCORD_BOT_AVATAR_URL =
  'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png';

/**
 * Creates GitHub-related fields for the Discord message
 */
function createGithubFields(
  embed: Embed,
  deployment?: VercelWebhook['payload']['deployment']
): void {
  if (!deployment?.meta?.githubCommitRef) {
    return;
  }

  const githubCommitUrl = `https://github.com/${deployment.meta.githubCommitOrg}/${deployment.meta.githubCommitRepo}/commit/${deployment.meta.githubCommitSha}`;
  const shortSha = deployment.meta.githubCommitSha?.slice(0, 7);

  embed.addField({
    name: `${EMOJIS.BRANCH} Branch`,
    value: `\`${deployment.meta.githubCommitRef}\``,
    inline: true
  });

  embed.addField({
    name: `${EMOJIS.COMMIT} Commit`,
    value: `[${shortSha}](${githubCommitUrl})`,
    inline: true
  });

  if (deployment.meta.githubCommitMessage) {
    embed.addField({
      name: `${EMOJIS.MESSAGE} Commit Message`,
      value: `\`\`\`\n${deployment.meta.githubCommitMessage}\`\`\``,
      inline: false
    });
  }
}

/**
 * Creates the deployment URL field for successful deployments
 */
function createDeploymentUrlField(
  embed: Embed,
  webhookType: WebhookType,
  deploymentUrl?: string
): void {
  if (
    deploymentUrl &&
    (webhookType === 'deployment.succeeded' ||
      webhookType === 'deployment.ready')
  ) {
    embed.addField({
      name: `${EMOJIS.URL} Preview URL`,
      value: `[${new URL(deploymentUrl).hostname}](${deploymentUrl})`,
      inline: false
    });
  }
}

/**
 * Creates a message for deployment events
 */
export function createDeploymentMessage(webhook: VercelWebhook): Embed {
  const { deployment, links } = webhook.payload;

  if (!deployment || !links) {
    return createGenericMessage(webhook);
  }

  const state = webhook.type.split('.')[1];
  const stateEmoji = getStateProperty(webhook.type, 'emoji') as string;
  const stateColor = getStateProperty(webhook.type, 'color') as number;
  const deploymentUrl = links.deployment;

  const embed = new Embed();

  embed.setTitle(`${stateEmoji} Deployment ${state}`);
  embed.setUrl(deploymentUrl);
  embed.setColor(`#${stateColor.toString(16)}`);
  embed.setTimestamp();
  embed.setFooter({
    text: `Deployment ${deployment.id}`
  });

  // Simplified description building
  let description = `**Status**: ${
    state.charAt(0).toUpperCase() + state.slice(1)
  }`;
  if (webhook.type === 'deployment.error' && deployment.meta.buildError) {
    description += `\n**Error**: \`\`\`\n${deployment.meta.buildError}\`\`\``;
  }
  embed.setDescription(description);

  // Add base fields
  embed.addField({
    name: `${EMOJIS.PROJECT} Project`,
    value: `[${deployment.name}](${links.project})`,
    inline: true
  });

  embed.addField({
    name: `${EMOJIS.ENV} Environment`,
    value: deployment.meta.target || 'production',
    inline: true
  });

  // Add GitHub fields
  createGithubFields(embed, deployment);

  // Add deployment URL field
  createDeploymentUrlField(embed, webhook.type, deploymentUrl);

  return embed;
}

/**
 * Creates a message for domain events
 */
export function createDomainMessage(webhook: VercelWebhook): Embed {
  const { domain } = webhook.payload;
  const eventEmoji = getStateProperty(webhook.type, 'emoji') as string;
  const eventColor = getStateProperty(webhook.type, 'color') as number;

  if (!domain) {
    return createGenericMessage(webhook);
  }

  const embed = new Embed();

  embed.setTitle(`${eventEmoji} Domain ${webhook.type.split('.')[1]}`);
  embed.setDescription(`**Domain**: ${domain.name}`);
  embed.setColor(`#${eventColor.toString(16)}`);
  embed.setTimestamp();

  return embed;
}

/**
 * Creates a message for project events
 */
export function createProjectMessage(webhook: VercelWebhook): Embed {
  const { project } = webhook.payload;
  const eventEmoji = getStateProperty(webhook.type, 'emoji') as string;
  const eventColor = getStateProperty(webhook.type, 'color') as number;

  if (!project) {
    return createGenericMessage(webhook);
  }

  const embed = new Embed();

  embed.setTitle(`${eventEmoji} Project ${webhook.type.split('.')[1]}`);
  embed.setDescription(`**Project**: ${project.id}`);
  embed.setColor(`#${eventColor.toString(16)}`);
  embed.setTimestamp();

  return embed;
}

/**
 * Creates a generic message for any event type
 */
export function createGenericMessage(webhook: VercelWebhook): Embed {
  const eventType = webhook.type;
  const eventEmoji = getStateProperty(eventType, 'emoji') as string;
  const eventColor = getStateProperty(eventType, 'color') as number;
  const parts = eventType.split('.');

  // Format the event name for better readability
  const formattedEvent = parts
    .map(
      part => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
    )
    .join(' • ');

  const embed = new Embed();

  embed.setTitle(`${eventEmoji} ${formattedEvent}`);
  embed.setDescription(
    `Webhook event received at ${new Date(webhook.createdAt).toISOString()}`
  );
  embed.setColor(`#${eventColor.toString(16)}`);
  embed.setTimestamp();
  embed.setFooter({
    text: `Event ID: ${webhook.id}`
  });

  return embed;
}

/**
 * Creates the appropriate Discord message based on the webhook type
 */
const messageCreators: Partial<
  Record<string, (webhook: VercelWebhook) => Embed>
> = {
  deployment: createDeploymentMessage,
  domain: createDomainMessage,
  project: createProjectMessage
};

export function createMessageFromWebhook(webhook: VercelWebhook): Embed {
  const typePrefix = webhook.type.split('.')[0];
  const creator = messageCreators[typePrefix];

  if (creator) {
    return creator(webhook);
  }

  // For all other event types, use the generic message format
  return createGenericMessage(webhook);
}

/**
 * Sends a notification to Discord with retry capability
 */
export async function sendDiscordNotification(embed: Embed): Promise<void> {
  const MAX_RETRIES = 3;
  const calculateBackoff = (attempt: number): number => 1000 * attempt;

  const sendRequest = async (attempt: number = 0): Promise<void> => {
    if (attempt >= MAX_RETRIES) {
      throw new Error('Maximum retry attempts reached');
    }

    try {
      const hook = new Webhook(env.DISCORD_WEBHOOK_URL);
      hook.setUsername(DISCORD_BOT_USERNAME);
      hook.setAvatarUrl(DISCORD_BOT_AVATAR_URL);
      hook.addEmbed(embed);

      await hook.send();
      return;
    } catch (error) {
      if (error instanceof Error && error.message.includes('429')) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return sendRequest(attempt);
      }

      if (attempt === MAX_RETRIES - 1) throw error;

      const backoffTime = calculateBackoff(attempt + 1);
      await new Promise(resolve => setTimeout(resolve, backoffTime));
      return sendRequest(attempt + 1);
    }
  };

  return sendRequest();
}
