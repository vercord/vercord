import { z } from 'zod';

/**
 * Base schemas for Vercel webhook payloads
 * @see https://vercel.com/docs/webhooks/webhooks-api
 */

// Records and metadata can have varied structures, so keep it flexible
export const deploymentMetaSchema = z.record(z.string().optional());

export const deploymentSchema = z
  .object({
    id: z.string(),
    meta: deploymentMetaSchema,
    name: z.string(),
    url: z.string(),
    inspectorUrl: z.string().optional(),
    projectId: z.string().optional(),
    teamId: z.string().optional(),
    createdAt: z.number().optional(),
    target: z.string().nullable().optional()
  })
  .passthrough();

export const linksSchema = z
  .object({
    deployment: z.string().url(),
    project: z.string().url().optional()
  })
  .passthrough();

export const projectSchema = z
  .object({
    id: z.string(),
    name: z.string().optional()
  })
  .passthrough();

export const domainSchema = z
  .object({
    name: z.string(),
    delegated: z.boolean().optional()
  })
  .passthrough();

export const configurationSchema = z
  .object({
    id: z.string(),
    projects: z.array(z.string()).optional(),
    projectSelection: z.enum(['all', 'selected']).optional(),
    scopes: z.array(z.string()).optional()
  })
  .passthrough();

export const integrationResourceSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    integration: z
      .object({
        id: z.string(),
        name: z.string()
      })
      .passthrough()
  })
  .passthrough();

export const marketplaceInvoiceSchema = z
  .object({
    id: z.string()
  })
  .passthrough();

// Webhook type enum with all supported event types from the documentation
export const webhookTypeEnum = z.enum([
  // Deployment events
  'deployment.created',
  'deployment.succeeded',
  'deployment.ready',
  'deployment.promoted',
  'deployment.canceled',
  'deployment.error',
  'deployment.check-rerequested',
  'deployment.integration.action.cancel',
  'deployment.integration.action.cleanup',
  'deployment.integration.action.start',

  // Domain events
  'domain.created',

  // Integration configuration events
  'integration-configuration.permission-upgraded',
  'integration-configuration.removed',
  'integration-configuration.scope-change-confirmed',

  // Integration resource events
  'integration-resource.project-connected',
  'integration-resource.project-disconnected',

  // Marketplace events
  'marketplace.invoice.created',
  'marketplace.invoice.notpaid',
  'marketplace.invoice.paid',
  'marketplace.invoice.refunded',

  // Project events
  'project.created',
  'project.removed'
]);

// Main webhook schema based on Vercel's documentation
export const webhookSchema = z
  .object({
    id: z.string(),
    region: z.string().optional(),
    createdAt: z.number(),
    projectId: z.string().optional(),
    teamId: z.string().optional(),
    type: webhookTypeEnum,
    payload: z
      .object({
        // Common properties
        user: projectSchema.optional(),
        team: projectSchema.optional(),

        // Deployment specific properties
        deployment: deploymentSchema.optional(),
        links: linksSchema.optional(),
        name: z.string().optional(),
        plan: z.string().optional(),
        project: projectSchema.optional(),
        regions: z.array(z.string()).optional(),
        target: z.string().nullable().optional(),
        type: z.string().optional(),
        url: z.string().optional(),
        alias: z.array(z.string()).optional().default([]),

        // Domain specific properties
        domain: domainSchema.optional(),

        // Integration configuration properties
        configuration: configurationSchema.optional(),
        projects: z
          .object({
            added: z.array(z.string()).optional(),
            removed: z.array(z.string()).optional()
          })
          .optional(),

        // Integration resource properties
        resource: integrationResourceSchema.optional(),

        // Marketplace invoice properties
        invoice: marketplaceInvoiceSchema.optional()
      })
      .passthrough()
  })
  .passthrough();

// ------------------------------
// Type definitions derived from schemas
// ------------------------------

export type VercelWebhook = z.infer<typeof webhookSchema>;
export type WebhookType = z.infer<typeof webhookTypeEnum>;
export type DeploymentMeta = z.infer<typeof deploymentMetaSchema>;
export type Deployment = z.infer<typeof deploymentSchema>;
export type Links = z.infer<typeof linksSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Domain = z.infer<typeof domainSchema>;
export type Configuration = z.infer<typeof configurationSchema>;
export type IntegrationResource = z.infer<typeof integrationResourceSchema>;
export type MarketplaceInvoice = z.infer<typeof marketplaceInvoiceSchema>;

// Additional types for entities not directly modeled as schemas

/**
 * Integration type
 */
export type Integration = {
  id: string;
  name: string;
};

/**
 * User type
 */
export type User = {
  id: string;
  email?: string;
  username?: string;
};

/**
 * Team type
 */
export type Team = {
  id: string;
  name?: string;
  slug?: string;
};
