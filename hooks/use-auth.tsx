"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken } from "@/lib/http";
import * as authApi from "@/lib/api/auth";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function base64UrlDecode(str: string): string {
  // Convert base64url to base64
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Pad with =
  while (base64.length % 4) base64 += "=";
  // Proper UTF-8 decode for Vietnamese characters
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(base64UrlDecode(parts[1]));
  } catch {
    return null;
  }
}

function userFromToken(accessToken: string): User | null {
  const payload = decodeJwtPayload(accessToken);
  if (!payload?.id || !payload?.email) return null;
  return {
    id: payload.id as string,
    email: payload.email as string,
    name: (payload.name as string) || (payload.email as string).split("@")[0],
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const { data: refreshData } = await authApi.refreshToken();
        const accessToken = refreshData.data?.accessToken;
        if (!accessToken) throw new Error("No access token");
        setAccessToken(accessToken);

        const sessionUser = userFromToken(accessToken);
        if (!sessionUser) throw new Error("Invalid token payload");

        try {
          const { data: userData } = await authApi.getMe();
          if (userData.data?.name) {
            sessionUser.name = userData.data.name;
          }
        } catch {
          // Name from JWT is sufficient
        }

        setUser(sessionUser);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    tryRefresh();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await authApi.signIn(email, password);
    const accessToken = data.data?.accessToken;
    if (!accessToken) throw new Error("No access token returned");
    setAccessToken(accessToken);

    const sessionUser = userFromToken(accessToken);
    if (!sessionUser) throw new Error("Invalid token payload");

    try {
      const { data: userData } = await authApi.getMe();
      if (userData.data?.name) {
        sessionUser.name = userData.data.name;
      }
    } catch {
      // Name from JWT is sufficient
    }

    setUser(sessionUser);
  };

  const register = async (name: string, email: string, password: string) => {
    await authApi.signUp(name, email, password, password);
    await login(email, password);
  };

  const logout = async () => {
    try {
      await authApi.signOut();
    } catch {
      // Proceed with local logout even if API call fails
    }
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
