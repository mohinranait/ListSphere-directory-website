

export function apiSuccess({ message, status = 200, payload }: { message: string; status?: number; payload?: unknown }) {
  return { success: true, message, status, payload };
} 

export function apiError({ message, status = 500 }: { message: string; status?: number }) {
  return { success: false, message, status };
}
