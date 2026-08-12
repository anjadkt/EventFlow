"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import ScreenLoader from "../ui/Loader";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({
  children,
}: PublicRouteProps) {

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <ScreenLoader/>;
  }

  if (user) {
    return null ;
  }

  return children;
}