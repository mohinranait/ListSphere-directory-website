export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  status: number;
  payload?: T;
}

export function apiSuccess<T>(params: { message: string; status?: number; payload?: T }): ApiResponse<T> {
  const { message, status = 200, payload } = params;
  return { success: true, message, status, payload };
}

export function apiError(params: { message: string; status?: number }): ApiResponse<never> {
  const { message, status = 500 } = params;
  return { success: false, message, status };
}
