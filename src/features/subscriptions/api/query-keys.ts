export const subscriptionKeys = {
  all: ['subscriptions'] as const,
  plans: () => [...subscriptionKeys.all, 'plans'] as const,
  orders: () => [...subscriptionKeys.all, 'orders'] as const,
  wallet: (type?: string, search?: string) =>
    [...subscriptionKeys.all, 'wallet', { type, search }] as const,
};
