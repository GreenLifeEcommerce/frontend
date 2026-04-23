import http from "@/lib/http";

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export function signIn(email: string, password: string) {
  return http.post<ApiResponse<{ accessToken: string }>>("/auth/sign-in", {
    email,
    password,
  });
}

export function signUp(
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
) {
  return http.post<ApiResponse<null>>("/auth/sign-up", {
    name,
    email,
    password,
    passwordConfirm,
  });
}

export function signOut() {
  return http.post<ApiResponse<null>>("/auth/sign-out");
}

export function refreshToken() {
  return http.post<ApiResponse<{ accessToken: string }>>("/auth/refresh-token");
}

export function getMe() {
  return http.get<
    ApiResponse<{ _id: string; email: string; name?: string }>
  >("/users/me");
}
