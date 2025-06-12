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
