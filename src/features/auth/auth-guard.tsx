"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";
import { TutopiaLoader } from "@/components/common/tutopia-loader";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <TutopiaLoader size="fullscreen" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
