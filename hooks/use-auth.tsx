"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("green-life-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login
    const users = JSON.parse(localStorage.getItem("green-life-users") || "[]");
    const foundUser = users.find(
      (u: User & { password?: string }) =>
        u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem(
        "green-life-user",
        JSON.stringify(userWithoutPassword)
      );
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock register
    const users = JSON.parse(localStorage.getItem("green-life-users") || "[]");

    if (users.some((u: User) => u.email === email)) {
      return false;
    }
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("green-life-users", JSON.stringify(updatedUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(
      "green-life-user",
      JSON.stringify(userWithoutPassword)
    );
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("green-life-user");
    router.refresh();
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
