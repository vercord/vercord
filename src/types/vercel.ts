import { type z } from 'zod';

import {
  type configurationSchema,
  type deploymentSchema,
  type domainSchema,
  type integrationResourceSchema,
  type integrationSchema,
  type linksSchema,
  type marketplaceInvoiceSchema,
  type projectSchema,
  type teamSchema,
  type userSchema,
  type webhookSchema,
  type webhookTypeEnum
} from '../schemas/vercel';

/**
 * Type definitions for Vercel webhook payloads
 */

export type VercelWebhook = z.infer<typeof webhookSchema>;
export type WebhookType = z.infer<typeof webhookTypeEnum>;
export type DeploymentMeta = Record<string, string>;
export type Deployment = z.infer<typeof deploymentSchema>;
export type Links = z.infer<typeof linksSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Domain = z.infer<typeof domainSchema>;
export type Configuration = z.infer<typeof configurationSchema>;
export type Integration = z.infer<typeof integrationSchema>;
export type IntegrationResource = z.infer<typeof integrationResourceSchema>;
export type MarketplaceInvoice = z.infer<typeof marketplaceInvoiceSchema>;
export type User = z.infer<typeof userSchema>;
export type Team = z.infer<typeof teamSchema>;
