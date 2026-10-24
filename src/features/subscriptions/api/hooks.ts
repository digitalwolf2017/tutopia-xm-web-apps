import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { subscriptionKeys } from './query-keys';
import { subscriptionEndpoints } from './endpoints';
import { OrderRequestPayload } from './types';

export function useSubscriptionPlansQuery() {
  return useQuery({
    queryKey: subscriptionKeys.plans(),
    queryFn: ({ signal }) => subscriptionEndpoints.getSubscriptionPlans(signal),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
}

export function useOrderRequestMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: OrderRequestPayload) =>
      subscriptionEndpoints.orderRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.orders() });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.wallet() });
    },
  });
}

export function useCreditOrdersQuery() {
  return useQuery({
    queryKey: subscriptionKeys.orders(),
    queryFn: ({ signal }) => subscriptionEndpoints.getCreditOrders(signal),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateCreditOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { com_exam_type_id?: number; type?: number }) =>
      subscriptionEndpoints.createCreditOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.orders() });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.wallet() });
    },
  });
}

export function useWalletQuery(type?: string, search?: string) {
  return useQuery({
    queryKey: subscriptionKeys.wallet(type, search),
    queryFn: ({ signal }) => subscriptionEndpoints.getWallet({ type, search }, signal),
    staleTime: 2 * 60 * 1000,
  });
}
