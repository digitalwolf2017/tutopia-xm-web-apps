import { apiClient } from '@/lib/api-client';
import {
  AuthResponse,
  ChangePasswordPayload,
  CityItem,
  LoginPayload,
  RegisterPayload,
  RegistrationCompletePayload,
  ResetPasswordPayload,
  ResetVerifyOtpPayload,
  SendOtpData,
  SendOtpPayload,
  UpdateProfilePayload,
  UserProfile,
  VerifyOtpPayload,
} from './types';

/**
 * Pure API endpoints for Auth (Tutopia v1.0)
 * Uses apiClient with base URL from NEXT_PUBLIC_API_BASE_URL
 */

export const authEndpoints = {
  // Send OTP
  sendOtp: (payload: SendOtpPayload, signal?: AbortSignal) =>
    apiClient.post<SendOtpData>(
      '/v1/send-otp',
      { ...payload, device_token: '' },
      { skipAuth: true, signal }
    ),

  // Verify OTP (returns token & user)
  verifyOtp: (payload: VerifyOtpPayload, signal?: AbortSignal) =>
    apiClient.post<AuthResponse>(
      '/v1/verify-otp',
      { ...payload, device_token: '' },
      { skipAuth: true, signal }
    ),

  // Password Login (returns token & user)
  login: (payload: LoginPayload, signal?: AbortSignal) =>
    apiClient.post<AuthResponse>(
      '/v1/login',
      {
        phone: payload.phone ?? '',
        email: payload.email ?? '',
        password: payload.password,
        device_token: '',
      },
      { skipAuth: true, signal }
    ),

  // Check phone uniqueness
  checkPhoneUnique: (phone: string, signal?: AbortSignal) =>
    apiClient.post<{ success: boolean }>('/v1/check-phone-unique', { phone }, { skipAuth: true, signal }),

  // Step 1: Initial Register
  register: (payload: RegisterPayload, signal?: AbortSignal) =>
    apiClient.post<{ status: boolean }>(
      '/v1/register',
      { ...payload, device_token: '' },
      { skipAuth: true, signal }
    ),

  // Step 2: Complete Registration Profile
  registrationComplete: (payload: RegistrationCompletePayload, signal?: AbortSignal) =>
    apiClient.post<{ status: boolean; message?: string }>(
      '/v1/registration-complete',
      payload,
      { signal }
    ),

  // Hydrate current authenticated student profile
  getMe: (signal?: AbortSignal) =>
    apiClient.get<UserProfile>('/v1/me', { signal }),

  // Update profile
  updateProfile: (payload: UpdateProfilePayload, signal?: AbortSignal) =>
    apiClient.post<{ status: boolean; message?: string }>(
      '/v1/update-profile',
      payload,
      { signal }
    ),

  // Change password
  changePassword: (payload: ChangePasswordPayload, signal?: AbortSignal) =>
    apiClient.post<{ status: boolean }>('/v1/change-password', payload, { signal }),

  // Reset verify OTP (forgot password flow)
  resetVerifyOtp: (payload: ResetVerifyOtpPayload, signal?: AbortSignal) =>
    apiClient.post<{ status: boolean }>('/v1/reset-verify-otp', payload, { skipAuth: true, signal }),

  // Reset password
  resetPassword: (payload: ResetPasswordPayload, signal?: AbortSignal) =>
    apiClient.post<{ status: boolean }>('/v1/reset-password', payload, { skipAuth: true, signal }),

  // Cities list
  getCities: (signal?: AbortSignal) =>
    apiClient.get<CityItem[]>('/v1/cities', { signal }),

  // Destroy token on server
  logout: (signal?: AbortSignal) =>
    apiClient.get<{ status: boolean }>('/v1/logout', { signal }),
};
