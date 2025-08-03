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
  setDeploymentDescription(embed, webhook, state);
  addDeploymentFields(embed, deployment, links);
  addGitHubFields(embed, deployment);
  addDeploymentUrl(embed, webhook.type, links.deployment);

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
  state: string
): void {
  const { deployment } = webhook.payload;
  let description = `**Status**: ${state.charAt(0).toUpperCase() + state.slice(1)}`;

  if (webhook.type === 'deployment.error' && deployment?.meta.buildError) {
    description += `\n**Error**: \`\`\`\n${deployment.meta.buildError}\`\`\``;
  }

  embed.setDescription(description);
}

function addDeploymentFields(
  embed: Embed,
  deployment: Deployment,
  links: Links
): void {
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

  if (deployment.id) {
    embed.setFooter({ text: `Deployment ${deployment.id}` });
  }
}

function addGitHubFields(embed: Embed, deployment: Deployment): void {
  const meta = deployment?.meta;
  if (!meta?.githubCommitRef) return;

  const commitUrl = `https://github.com/${meta.githubCommitOrg}/${meta.githubCommitRepo}/commit/${meta.githubCommitSha}`;
  const shortSha = meta.githubCommitSha?.slice(0, 7);

  embed.addField({
    name: `${EMOJIS.BRANCH} Branch`,
    value: `\`${meta.githubCommitRef}\``,
    inline: true
  });

  embed.addField({
    name: `${EMOJIS.COMMIT} Commit`,
    value: `[${shortSha}](${commitUrl})`,
    inline: true
  });

  if (meta.githubCommitMessage) {
    embed.addField({
      name: `${EMOJIS.MESSAGE} Commit Message`,
      value: `\`\`\`\n${meta.githubCommitMessage}\`\`\``,
      inline: false
    });
  }
}

function addDeploymentUrl(
  embed: Embed,
  webhookType: string,
  deploymentUrl?: string
): void {
  if (!deploymentUrl) return;
  if (
    webhookType !== 'deployment.succeeded' &&
    webhookType !== 'deployment.ready'
  )
    return;

  embed.addField({
    name: `${EMOJIS.URL} Preview URL`,
    value: `[${new URL(deploymentUrl).hostname}](${deploymentUrl})`,
    inline: false
  });
}

function formatEventName(eventType: string): string {
  return eventType
    .split('.')
    .map(
      part => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
    )
    .join(' • ');
}
