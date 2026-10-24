"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "./api/types";
import { authEndpoints } from "./api/endpoints";
import { clearAuthStorage } from "@/lib/api-client";

export interface AuthUser {
  id: string | number;
  name: string;
  first_name?: string | null;
  last_name?: string | null;
  mobile: string;
  phone?: string;
  email?: string | null;
  profile_image?: string | null;
  targetExam?: string;
  subscriptionPlan?: string;
  subscriptionValidUntil?: string;
  city?: string | null;
  cityNmae?: string | null;
  cityName?: string | null;
  badge?: string;
  badgeColor?: string;
  token?: string;
  isSubscribed?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (token: string, profile: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check client storage for authenticated session
    try {
      const stored = localStorage.getItem("tutopia_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse auth user", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setSession = useCallback((token: string, profile: UserProfile) => {
    const fullName =
      [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
      "Tutopia Student";

    const resolvedCity = profile.cityName || profile.cityNmae || null;

    const sessionUser: AuthUser = {
      id: profile.id,
      name: fullName,
      first_name: profile.first_name,
      last_name: profile.last_name,
      mobile: profile.phone,
      phone: profile.phone,
      email: profile.email,
      profile_image: profile.profile_image || null,
      city: resolvedCity,
      cityName: resolvedCity,
      cityNmae: resolvedCity,
      isSubscribed: Boolean(profile.isSubscribed),
      subscriptionPlan: profile.isSubscribed ? "Premium Enrolled" : "Free Explorer",
      subscriptionValidUntil: "31st Dec 2026",
      targetExam: "SSC, RAIL, WBCS",
      badge: profile.isSubscribed ? "Pro Student" : "Student",
      badgeColor: profile.isSubscribed
        ? "bg-amber-50 text-amber-700 border-amber-200/80"
        : "bg-sky-50 text-sky-700 border-sky-200/80",
      token,
    };

    setUser(sessionUser);
    try {
      localStorage.setItem("tutopia_auth_user", JSON.stringify(sessionUser));
      localStorage.setItem("tutopia_auth_token", token);
      document.cookie = `tutopia_auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = "tutopia_auth=true; path=/; max-age=86400; SameSite=Lax";
    } catch (e) {
      console.error("Session storage error", e);
    }
  }, []);

  const logout = () => {
    // 1. Revoke token on backend (best-effort)
    authEndpoints.logout().catch(() => {});

    // 2. Clear state and cache immediately
    setUser(null);
    clearAuthStorage();
    queryClient.clear();

    // 3. Navigate to login
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
