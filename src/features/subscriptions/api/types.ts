import { z } from 'zod';

/**
 * Zod schema for a Tutopia Subscription Plan
 * Extracted from GET /api/v1/subscription-plans
 */
export const subscriptionPlanSchema = z.object({
  Refid: z.coerce.number().optional().nullable(),
  board_id: z.coerce.number().optional().nullable(),
  board_name: z.string().optional().nullable(),
  plan_id: z.coerce.number(),
  type: z.coerce.number().optional().nullable(),
  is_combo: z.coerce.number().optional().nullable(),
  package_id: z.coerce.number().optional().nullable(),
  display_name: z.string().default('Course Plan'),
  display_name_in_english: z.string().optional().nullable(),
  Print_name: z.string().optional().nullable(),
  class_id: z.coerce.string().optional().nullable(),
  class_name: z.string().optional().nullable(),
  roman_letter: z.string().optional().nullable(),
  student_price: z.coerce.number().default(0),
  discount: z.coerce.number().default(0),
  FinalAmount: z.coerce.number().default(0),
  free_addons: z.coerce.number().optional().nullable(),
  totalSubjects: z.coerce.number().optional().nullable().default(0),
  totalChapters: z.coerce.number().optional().nullable().default(0),
  totalTutorials: z.coerce.number().optional().nullable().default(0),
  totalNotes: z.coerce.number().optional().nullable().default(0),
});

export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>;

/**
 * Payload for POST /api/v1/order-request
 */
export interface OrderRequestPayload {
  list: string | number[] | Record<string, unknown>[];
  note?: string;
}

export interface OrderRequestResponse {
  status: boolean;
  data: unknown;
  error: string;
  message: string;
}

/**
 * Credit Order schema for GET /api/v1/credit-orders
 * from (1->CRM, 2->Student), status (0->Pending, 1->Placed, 2->Confirmed, 3->Rejected)
 */
export const creditOrderSchema = z.object({
  id: z.coerce.number(),
  credit_plan_id: z.coerce.number().optional().nullable(),
  user_id: z.coerce.number().optional().nullable(),
  action_by: z.coerce.number().optional().nullable(),
  credit: z.coerce.number().optional().nullable().default(0),
  amount: z.coerce.number().optional().nullable().default(0),
  note: z.string().optional().nullable(),
  from: z.coerce.number().optional().nullable().default(2),
  status: z.coerce.number().optional().nullable().default(0),
  created_at: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
});

export type CreditOrder = z.infer<typeof creditOrderSchema>;

/**
 * Wallet Transaction schema for GET /api/v1/wallet
 * type (1->Credit purchase, 2->Credit deducted, 3->Credit refunded)
 */
export const walletTransactionSchema = z.object({
  id: z.coerce.number(),
  user_id: z.coerce.number().optional().nullable(),
  com_exam_id: z.coerce.number().optional().nullable(),
  credit_order_id: z.coerce.number().optional().nullable(),
  credit: z.coerce.number().default(0),
  note: z.string().optional().nullable(),
  transaction_type: z.coerce.number().optional().nullable().default(1),
  type: z.coerce.number().optional().nullable(),
  date: z.string().optional().nullable(),
  credit_order: creditOrderSchema.optional().nullable(),
});

export type WalletTransaction = z.infer<typeof walletTransactionSchema>;

export interface WalletResponseData {
  status: boolean;
  total: number;
  data: WalletTransaction[];
  error?: string;
  message?: string;
}
