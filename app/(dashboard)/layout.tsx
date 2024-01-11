import DashboardLayout from "@dsarea/@/components/layout/DashboardLayout";
import { HasDsAreaCookie } from "@dsarea/@/lib/DsAreaCookies";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const hasCookie = await HasDsAreaCookie();
  if (!hasCookie) {
    redirect("/");
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
