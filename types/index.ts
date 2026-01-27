export const ROLES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
} as const

export type Role = typeof ROLES[keyof typeof ROLES]

