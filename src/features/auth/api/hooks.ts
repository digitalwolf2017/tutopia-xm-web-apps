'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authEndpoints } from './endpoints';
import { authKeys } from './query-keys';
import {
  ChangePasswordPayload,
  CityItem,
  LoginPayload,
  RegisterPayload,
  RegistrationCompletePayload,
  ResetPasswordPayload,
  SendOtpPayload,
  UpdateProfilePayload,
  UserProfile,
  VerifyOtpPayload,
} from './types';

// ==========================================
// Queries
// ==========================================

/**
 * Hydrates current authenticated student profile
 */
export function useMeQuery(options?: { enabled?: boolean }) {
  return useQuery<UserProfile>({
    queryKey: authKeys.me(),
    queryFn: ({ signal }) => authEndpoints.getMe(signal),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: options?.enabled ?? true,
    retry: false,
  });
}

/**
 * Fetches available cities list for onboarding & profile editing
 */
export function useCitiesQuery(options?: { enabled?: boolean }) {
  return useQuery<CityItem[]>({
    queryKey: authKeys.cities(),
    queryFn: ({ signal }) => authEndpoints.getCities(signal),
    staleTime: 1000 * 60 * 60, // 1 hour static cache
    enabled:
      options?.enabled ??
      (typeof window !== 'undefined'
        ? !!localStorage.getItem('tutopia_auth_token')
        : false),
    retry: false,
  });
}

// ==========================================
// Mutations
// ==========================================

/**
 * Send OTP Mutation
 */
export function useSendOtpMutation() {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => authEndpoints.sendOtp(payload),
  });
}

/**
 * Verify OTP Mutation
 */
export function useVerifyOtpMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authEndpoints.verifyOtp(payload),
    onSuccess: (data) => {
      if (data?.data) {
        queryClient.setQueryData(authKeys.me(), data.data);
      }
    },
  });
}

/**
 * Password Login Mutation
 */
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authEndpoints.login(payload),
    onSuccess: (data) => {
      if (data?.data) {
        queryClient.setQueryData(authKeys.me(), data.data);
      }
    },
  });
}

/**
 * Step 1: Register Mutation
 */
export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authEndpoints.register(payload),
  });
}

/**
 * Step 2: Complete Profile Registration Mutation
 */
export function useRegistrationCompleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegistrationCompletePayload) =>
      authEndpoints.registrationComplete(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}

/**
 * Change Password Mutation
 */
export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      authEndpoints.changePassword(payload),
  });
}

/**
 * Reset Password Mutation
 */
export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authEndpoints.resetPassword(payload),
  });
}

/**
 * Update Profile Mutation
 */
export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      authEndpoints.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}

/**
 * Logout Mutation
 */
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authEndpoints.logout(),
    onSettled: () => {
      queryClient.clear();
    },
  });
}
