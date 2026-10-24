import { z } from 'zod';

// ==========================================
// User Profile Schema
// ==========================================
export const userProfileSchema = z.object({
  id: z.number(),
  first_name: z.string().nullable().default(''),
  last_name: z.string().nullable().default(''),
  email: z.string().nullable().default(''),
  phone: z.string(),
  whatsapp_number: z.string().nullable().default(null),
  profile_image: z.string().nullable().default(null),
  type: z.number().optional().default(0),
  district: z.string().nullable().default(''),
  address: z.string().nullable().default(''),
  city_id: z.union([z.string(), z.number()]).nullable().default(''),
  cityNmae: z.string().nullable().default(''),
  cityName: z.string().nullable().default(''),
  is_verified: z.union([z.number(), z.boolean()]).default(1),
  is_profile_completed: z.union([z.number(), z.boolean()]).default(0),
  is_onboard_completed: z.union([z.number(), z.boolean()]).default(0),
  registered_class_id: z.union([z.string(), z.number()]).nullable().default(null),
  pincode: z.string().nullable().default(null),
  isSubscribed: z.boolean().default(false),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// ==========================================
// Auth Response Envelope
// ==========================================
export const authResponseSchema = z.object({
  status: z.boolean(),
  data: userProfileSchema,
  token: z.string(),
  message: z.string().optional().default(''),
  error: z.string().optional().default(''),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// ==========================================
// Send OTP
// ==========================================
export const sendOtpPayloadSchema = z.object({
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  device_token: z.string().default(''),
});

export type SendOtpPayload = z.infer<typeof sendOtpPayloadSchema>;

export const sendOtpDataSchema = z.object({
  userId: z.number().optional(),
  otp: z.string().optional(),
  device_token: z.string().optional(),
});

export type SendOtpData = z.infer<typeof sendOtpDataSchema>;

// ==========================================
// Verify OTP
// ==========================================
export const verifyOtpPayloadSchema = z.object({
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  otp: z.string().min(4, 'OTP must be at least 4 digits'),
  device_token: z.string().default(''),
});

export type VerifyOtpPayload = z.infer<typeof verifyOtpPayloadSchema>;

// ==========================================
// Password Login
// ==========================================
export const loginPayloadSchema = z.object({
  phone: z.string().default(''),
  email: z.string().default(''),
  password: z.string().min(1, 'Password is required'),
  device_token: z.string().default(''),
});

export type LoginPayload = z.infer<typeof loginPayloadSchema>;

// ==========================================
// Registration
// ==========================================
export const registerPayloadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid 10-digit mobile number required'),
  device_token: z.string().default(''),
});

export type RegisterPayload = z.infer<typeof registerPayloadSchema>;

export const registrationCompletePayloadSchema = z.object({
  pin_code: z.string().min(6, 'Pincode must be 6 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  password_confirmation: z.string().min(6, 'Confirm password must match'),
  profile_image: z.string().optional(),
});

export type RegistrationCompletePayload = z.infer<typeof registrationCompletePayloadSchema>;

// ==========================================
// Password Reset & Change
// ==========================================
export const resetVerifyOtpPayloadSchema = z.object({
  phone: z.string().min(10),
  otp: z.string().min(4),
});

export type ResetVerifyOtpPayload = z.infer<typeof resetVerifyOtpPayloadSchema>;

export const resetPasswordPayloadSchema = z.object({
  phone: z.string().min(10),
  otp: z.string().min(4),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
});

export type ResetPasswordPayload = z.infer<typeof resetPasswordPayloadSchema>;

export const changePasswordPayloadSchema = z.object({
  old_password: z.string().min(6),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
});

export type ChangePasswordPayload = z.infer<typeof changePasswordPayloadSchema>;

// ==========================================
// Profile & Master Data
// ==========================================
export const cityItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CityItem = z.infer<typeof cityItemSchema>;

export const updateProfilePayloadSchema = z.object({
  whatsapp_number: z.string().optional(),
  profile_image: z.string().optional(),
  city_id: z.string().optional(),
  pin_code: z.string().optional(),
  address: z.string().optional(),
});

export type UpdateProfilePayload = z.infer<typeof updateProfilePayloadSchema>;
