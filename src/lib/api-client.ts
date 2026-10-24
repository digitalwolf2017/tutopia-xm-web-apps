/**
 * Standardized API Client for Tutopia Exam Web App
 * Adheres strictly to Rule 05 (Frontend API Handling & Data Fetching)
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorPayload;
}

export class AppApiError extends Error {
  status: number;
  code: string;
  details?: Record<string, string[]>;

  constructor(
    message: string,
    status: number = 500,
    code: string = 'UNKNOWN_ERROR',
    details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'AppApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  token?: string;
  skipAuth?: boolean;
}

/**
 * Resolves the API Base URL from environment variables
 */
export function getApiBaseUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://competitive.tutopia.in/api';

  return envUrl.trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
}

/**
 * Builds the complete request URL, normalizing duplicate /api paths
 */
function buildRequestUrl(endpoint: string): URL {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return new URL(endpoint);
  }

  const base = getApiBaseUrl();
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Avoid duplicate '/api' segment if base already ends with '/api'
  if (base.endsWith('/api') && cleanEndpoint.startsWith('/api/')) {
    cleanEndpoint = cleanEndpoint.replace(/^\/api/, '');
  }

  return new URL(`${base}${cleanEndpoint}`);
}

/**
 * Helper to retrieve stored auth token on the client
 */
/**
 * Helper to retrieve stored auth token on the client
 */
function getClientToken(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const rawToken = localStorage.getItem('tutopia_auth_token');
    if (rawToken && rawToken.trim()) return rawToken.trim();

    const rawUser = localStorage.getItem('tutopia_auth_user');
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      if (parsed?.token && typeof parsed.token === 'string') return parsed.token.trim();
    }

    // Check cookie fallback
    const cookieMatch = document.cookie.match(/(?:^|;\s*)tutopia_auth_token=([^;]+)/);
    if (cookieMatch && cookieMatch[1]) {
      return decodeURIComponent(cookieMatch[1]);
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Safely clears all auth tokens and session cookies
 */
export function clearAuthStorage() {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('tutopia_auth_user');
    localStorage.removeItem('tutopia_auth_token');
    sessionStorage.clear();
    document.cookie = 'tutopia_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Lax';
    document.cookie = 'tutopia_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Lax';
  } catch (e) {
    console.error('Failed to clear session', e);
  }
}

/**
 * Handle 401 Unauthorized redirect
 */
function handleUnauthorized() {
  if (typeof window === 'undefined') return;

  clearAuthStorage();

  const pathname = window.location.pathname;
  // Never kick to /login if user is deliberately on /register or another public auth route
  if (
    pathname.includes('/login') ||
    pathname.includes('/register') ||
    pathname.includes('/forgot-password')
  ) {
    return;
  }

  const currentPath = window.location.pathname + window.location.search;
  const redirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
  window.location.href = redirectUrl;
}

/**
 * Typed HTTP Client Wrapper
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, body, headers, token, skipAuth, ...customConfig } = options;

  // Build full URL with query parameters
  const url = buildRequestUrl(endpoint);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // Construct headers
  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has('Content-Type') && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  // Inject Bearer token if not skipped
  if (!skipAuth) {
    const activeToken = token || getClientToken();
    if (activeToken) {
      requestHeaders.set('Authorization', `Bearer ${activeToken}`);
    }
  }

  const config: RequestInit = {
    ...customConfig,
    headers: requestHeaders,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url.toString(), config);

    // Handle 401 Unauthorized
    if (response.status === 401 && !skipAuth) {
      handleUnauthorized();
      throw new AppApiError('Session expired. Please log in again.', 401, 'UNAUTHORIZED');
    }

    // Try parsing JSON response
    let responseData: unknown = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const errResponse = responseData as Partial<ApiErrorResponse> | null;
      const message =
        errResponse?.error?.message ||
        (typeof responseData === 'string' ? responseData : response.statusText) ||
        'An unexpected network error occurred';
      const code = errResponse?.error?.code || `HTTP_${response.status}`;
      const details = errResponse?.error?.details;

      throw new AppApiError(message, response.status, code, details);
    }

    // Process structured JSON response
    if (responseData && typeof responseData === 'object') {
      const respObj = responseData as Record<string, unknown>;

      // Catch backend errors returned with HTTP 200 (e.g. status: false)
      if (respObj.status === false || respObj.success === false) {
        const errorMsg =
          (typeof respObj.message === 'string' && respObj.message.trim()) ||
          (typeof respObj.error === 'string' && respObj.error.trim()) ||
          'Operation failed';
        throw new AppApiError(errorMsg, response.status || 400, 'API_ERROR');
      }

      // If response includes an authentication token, return the full payload
      if ('token' in respObj && respObj.token) {
        return responseData as T;
      }

      // If response has a wrapped data property, unpack it
      if ('data' in respObj && respObj.data !== undefined && respObj.data !== null) {
        return respObj.data as T;
      }
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof AppApiError) {
      throw error;
    }
    // Allow TanStack Query cancellation (AbortController) to bubble cleanly
    if (error instanceof Error && (error.name === 'AbortError' || error.message.includes('aborted'))) {
      throw error;
    }
    throw new AppApiError(
      error instanceof Error ? error.message : 'Failed to connect to the server',
      0,
      'NETWORK_ERROR'
    );
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PUT', body }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
