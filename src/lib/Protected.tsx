"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { userAuth } from "./userAuth";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = userAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/"); // Redirect to homepage if not authenticated
    }
  }, [isAuthenticated, router]);

  // Return null while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default Protected;
