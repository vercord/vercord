import { z } from 'zod';

/**
 * Base schemas for Vercel webhook payloads
 * @see https://vercel.com/docs/webhooks/webhooks-api
 */

export const deploymentMetaSchema = z.record(z.string(), {
  description: 'Metadata key-value pairs associated with the deployment'
});

export const deploymentSchema = z.object({
  id: z.string().uuid({ message: 'Deployment ID must be a valid UUID' }),
  meta: deploymentMetaSchema,
  name: z.string().min(1, { message: 'Deployment name cannot be empty' }),
  url: z.string().url({ message: 'Deployment URL must be a valid URL' }),
  inspectorUrl: z.string().url({ message: 'Inspector URL must be a valid URL' })
});

export const linksSchema = z.object({
  deployment: z
    .string()
    .url({ message: 'Deployment link must be a valid URL' }),
  project: z.string().url({ message: 'Project link must be a valid URL' })
});

export const projectSchema = z.object({
  id: z.string().uuid({ message: 'Project ID must be a valid UUID' }),
  name: z
    .string()
    .min(1, { message: 'Project name cannot be empty' })
    .optional()
});

export const domainSchema = z.object({
  name: z.string().min(1, { message: 'Domain name cannot be empty' }),
  delegated: z.boolean().optional()
});

export const configurationSchema = z.object({
  id: z.string().uuid({ message: 'Configuration ID must be a valid UUID' }),
  projects: z.array(z.string().uuid()).optional(),
  projectSelection: z.enum(['all', 'selected']).optional(),
  scopes: z.array(z.string()).optional()
});

export const integrationSchema = z.object({
  id: z.string().uuid({ message: 'Integration ID must be a valid UUID' }),
  name: z.string().min(1, { message: 'Integration name cannot be empty' })
});

export const integrationResourceSchema = z.object({
  id: z.string().uuid({ message: 'Resource ID must be a valid UUID' }),
  name: z.string().min(1, { message: 'Resource name cannot be empty' }),
  type: z.string().min(1, { message: 'Resource type cannot be empty' }),
  integration: integrationSchema
});

export const marketplaceInvoiceSchema = z.object({
  id: z.string().uuid({ message: 'Invoice ID must be a valid UUID' })
});

export const userSchema = z.object({
  id: z.string().uuid({ message: 'User ID must be a valid UUID' }),
  email: z.string().email({ message: 'User email must be valid' }).optional(),
  username: z.string().min(1).optional()
});

export const teamSchema = z.object({
  id: z.string().uuid({ message: 'Team ID must be a valid UUID' }),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional()
});

// Webhook type enum with all supported event types
// https://vercel.com/docs/webhooks/webhooks-api#supported-event-types
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

// Webhook payload schema based on official Vercel documentation
// https://vercel.com/docs/webhooks/webhooks-api#payload
export const webhookSchema = z.object({
  id: z.string().uuid({ message: 'Webhook ID must be a valid UUID' }),
  region: z.string().optional(),
  createdAt: z
    .number()
    .int()
    .positive({ message: 'Created timestamp must be a positive integer' }),
  type: webhookTypeEnum,
  payload: z
    .object({
      // Common properties
      user: userSchema.optional(),
      team: teamSchema.optional(),

      // Deployment specific properties
      deployment: deploymentSchema.optional(),
      links: linksSchema.optional(),
      name: z.string().min(1).optional(),
      plan: z.string().min(1).optional(),
      project: projectSchema.optional(),
      regions: z.array(z.string()).min(1).optional(),
      target: z.string().nullable().optional(),
      type: z.string().min(1).optional(),
      url: z.string().url().optional(),
      alias: z.array(z.string()).default([]),
      integrationId: z.string().uuid().optional(),

      // Domain specific properties
      domain: domainSchema.optional(),

      // Integration configuration properties
      configuration: configurationSchema.optional(),
      projects: z
        .object({
          added: z.array(z.string().uuid()).optional(),
          removed: z.array(z.string().uuid()).optional()
        })
        .optional(),

      // Integration resource properties
      resource: integrationResourceSchema.optional(),

      // Marketplace invoice properties
      invoice: marketplaceInvoiceSchema.optional()
    })
    .passthrough() // Allow additional properties that might be present in webhook payloads
});
