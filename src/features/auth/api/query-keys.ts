/**
 * Query Key Factory for Auth & User Profile
 * Adheres strictly to Rule 05
 */

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
  cities: () => [...authKeys.all, 'cities'] as const,
  checkPhone: (phone: string) => [...authKeys.all, 'check-phone', phone] as const,
};
