"use client";

import PublicRoute from "@/components/routes/PublicRoute";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicRoute>{children}</PublicRoute>;
}