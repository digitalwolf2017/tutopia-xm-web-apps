"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DummyUser, DUMMY_USERS } from "./dummy-users";

interface AuthContextType {
  user: DummyUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (mobileOrUser: string | DummyUser) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DummyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const login = (mobileOrUser: string | DummyUser) => {
    let targetUser: DummyUser;
    if (typeof mobileOrUser === "string") {
      targetUser =
        DUMMY_USERS.find((u) => u.mobile === mobileOrUser) || {
          id: "custom-user",
          name: "Tutopia Student",
          mobile: mobileOrUser,
          password: "password123",
          otp: "123456",
          targetExam: "SSC, RAIL, WBCS",
          subscriptionPlan: "General Prep Pack",
          subscriptionValidUntil: "31st Dec 2026",
          city: "Kolkata",
          badge: "Student",
          badgeColor: "bg-sky-50 text-sky-700 border-sky-200/80",
        };
    } else {
      targetUser = mobileOrUser;
    }

    setUser(targetUser);
    try {
      localStorage.setItem("tutopia_auth_user", JSON.stringify(targetUser));
      document.cookie = "tutopia_auth=true; path=/; max-age=86400";
    } catch (e) {
      console.error("Storage error", e);
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("tutopia_auth_user");
      document.cookie = "tutopia_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch (e) {
      console.error("Storage error", e);
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
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
