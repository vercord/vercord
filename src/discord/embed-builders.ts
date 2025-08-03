import { Embed } from '@vermaysha/discord-webhook';

import { EMOJIS, getStateProperty } from '@/consts/discord';
import {
  type Deployment,
  type Links,
  type VercelWebhook
} from '@/schemas/vercel';

export function createDeploymentEmbed(webhook: VercelWebhook): Embed {
  const { deployment, links } = webhook.payload;
  if (!deployment || !links) {
    return createGenericEmbed(webhook);
  }

  const state = webhook.type.split('.')[1];
  const embed = new Embed();

  setBasicEmbedProperties(embed, webhook, `Deployment ${state}`);

  // Make the title clickable for all deployment events
  if (links.deployment) {
    embed.setUrl(links.deployment);
  }

  setDeploymentDescription(embed, webhook, state, deployment);
  addDeploymentFields(embed, deployment, links, webhook.type);

  return embed;
}

export function createDomainEmbed(webhook: VercelWebhook): Embed {
  const { domain } = webhook.payload;
  if (!domain) {
    return createGenericEmbed(webhook);
  }

  const embed = new Embed();
  setBasicEmbedProperties(
    embed,
    webhook,
    `Domain ${webhook.type.split('.')[1]}`
  );
  embed.setDescription(`**Domain**: ${domain.name}`);

  return embed;
}

export function createProjectEmbed(webhook: VercelWebhook): Embed {
  const { project } = webhook.payload;
  if (!project) {
    return createGenericEmbed(webhook);
  }

  const embed = new Embed();
  setBasicEmbedProperties(
    embed,
    webhook,
    `Project ${webhook.type.split('.')[1]}`
  );
  embed.setDescription(`**Project**: ${project.id}`);

  return embed;
}

export function createGenericEmbed(webhook: VercelWebhook): Embed {
  const embed = new Embed();
  const formattedEvent = formatEventName(webhook.type);

  setBasicEmbedProperties(embed, webhook, formattedEvent);
  embed.setDescription(
    `Webhook event received at ${new Date(webhook.createdAt).toISOString()}`
  );
  embed.setFooter({ text: `Event ID: ${webhook.id}` });

  return embed;
}

function setBasicEmbedProperties(
  embed: Embed,
  webhook: VercelWebhook,
  title: string
): void {
  const emoji = getStateProperty(webhook.type, 'emoji') as string;
  const color = getStateProperty(webhook.type, 'color') as number;

  embed.setTitle(`${emoji} ${title}`);
  embed.setColor(`#${color.toString(16)}`);
  embed.setTimestamp();
}

function setDeploymentDescription(
  embed: Embed,
  webhook: VercelWebhook,
  state: string,
  deployment: Deployment
): void {
  const meta = deployment?.meta;

  // Clean, focused description without cramming everything
  let description = `**${deployment.name}** deployed to **${meta?.target || 'production'}**`;

  // Add build error if exists (truncated for Discord limits)
  if (webhook.type === 'deployment.error' && meta?.buildError) {
    const maxErrorLength = 500; // Leave room for other content
    const errorText =
      meta.buildError.length > maxErrorLength
        ? meta.buildError.slice(0, maxErrorLength) + '...'
        : meta.buildError;
    description += `\n\n**Build Error:**\n\`\`\`\n${errorText}\`\`\``;
  }

  embed.setDescription(description);
}

function addDeploymentFields(
  embed: Embed,
  deployment: Deployment,
  links: Links,
  webhookType: string
): void {
  const meta = deployment?.meta;

  // Add GitHub branch and commit info with proper spacing - 3 inline fields per row
  if (meta?.githubCommitRef && meta?.githubCommitSha) {
    const commitUrl = `https://github.com/${meta.githubCommitOrg}/${meta.githubCommitRepo}/commit/${meta.githubCommitSha}`;
    const shortSha = meta.githubCommitSha.slice(0, 7);

    embed.addField({
      name: `${EMOJIS.BRANCH} Branch`,
      value: `\`${meta.githubCommitRef}\``,
      inline: true
    });

    embed.addField({
      name: `${EMOJIS.COMMIT} Commit`,
      value: `[\`${shortSha}\`](${commitUrl})`,
      inline: true
    });

    // Add environment in the third column to complete the row
    embed.addField({
      name: `${EMOJIS.ENV} Environment`,
      value: meta?.target || 'production',
      inline: true
    });
  }

  // Always add commit message if it exists, with Discord field limit (1024 chars)
  if (meta?.githubCommitMessage) {
    const maxCommitLength = 1000; // Leave some buffer for formatting
    const commitMessage =
      meta.githubCommitMessage.length > maxCommitLength
        ? meta.githubCommitMessage.slice(0, maxCommitLength) + '...'
        : meta.githubCommitMessage;

    embed.addField({
      name: `${EMOJIS.MESSAGE} Commit Message`,
      value: `\`\`\`\n${commitMessage}\`\`\``,
      inline: false
    });
  }

  // Add deployment URL if available - full width for better readability
  if (links?.deployment) {
    const isLive =
      webhookType === 'deployment.succeeded' ||
      webhookType === 'deployment.ready';
    const label = isLive ? 'Preview URL' : 'Deployment URL';
    const hostname = new URL(links.deployment).hostname;

    embed.addField({
      name: `${EMOJIS.URL} ${label}`,
      value: `[${hostname}](${links.deployment})`,
      inline: false
    });
  }

  // Clean footer with deployment ID
  if (deployment.id) {
    embed.setFooter({
      text: `Deployment ${deployment.id}`
    });
  }
}

function formatEventName(eventType: string): string {
  return eventType
    .split('.')
    .map(
      part => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
    )
    .join(' • ');
}
