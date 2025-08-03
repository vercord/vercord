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

  // Create a comprehensive but compact description
  let description = `**${deployment.name}** deployed to **${meta?.target || 'production'}**`;

  // Add GitHub info in a clean format
  if (meta?.githubCommitRef && meta?.githubCommitSha) {
    const shortSha = meta.githubCommitSha.slice(0, 7);
    const commitUrl = `https://github.com/${meta.githubCommitOrg}/${meta.githubCommitRepo}/commit/${meta.githubCommitSha}`;
    description += `\n${EMOJIS.BRANCH} \`${meta.githubCommitRef}\` ${EMOJIS.COMMIT} [\`${shortSha}\`](${commitUrl})`;
  }

  // Add build error if exists (truncated for readability)
  if (webhook.type === 'deployment.error' && meta?.buildError) {
    const errorText =
      meta.buildError.length > 300
        ? meta.buildError.slice(0, 300) + '...'
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

  // Add commit message if it exists and is reasonable length
  if (meta?.githubCommitMessage && meta.githubCommitMessage.length < 150) {
    embed.addField({
      name: `${EMOJIS.MESSAGE} Commit Message`,
      value: `*${meta.githubCommitMessage}*`,
      inline: false
    });
  }

  // Create action buttons row
  const actionFields = [];

  // Add preview/deployment URL
  if (links?.deployment) {
    const isLive =
      webhookType === 'deployment.succeeded' ||
      webhookType === 'deployment.ready';
    const label = isLive ? 'View Live Site' : 'View Deployment';
    const hostname = new URL(links.deployment).hostname;

    actionFields.push({
      name: `${EMOJIS.URL} ${label}`,
      value: `[${hostname}](${links.deployment})`,
      inline: true
    });
  }

  // Add project dashboard link
  if (links?.project) {
    actionFields.push({
      name: `${EMOJIS.PROJECT} Dashboard`,
      value: `[Open in Vercel](${links.project})`,
      inline: true
    });
  }

  // Add timestamp info
  actionFields.push({
    name: `${EMOJIS.DEPLOY} Duration`,
    value: `Started ${new Date().toLocaleTimeString()}`,
    inline: true
  });

  // Add all action fields
  actionFields.forEach(field => {
    embed.addField(field);
  });

  // Clean footer with deployment ID
  if (deployment.id) {
    embed.setFooter({
      text: `ID: ${deployment.id}`
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
