import DashboardLayout from "@dsarea/@/components/layout/DashboardLayout";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
