"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";
import { TutopiaLoader } from "@/components/common/tutopia-loader";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [minLoadingPassed, setMinLoadingPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingPassed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isStillLoading = isLoading || !minLoadingPassed;

  useEffect(() => {
    if (!isStillLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isStillLoading, isAuthenticated, router]);

  if (isStillLoading) {
    return <TutopiaLoader size="fullscreen" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
