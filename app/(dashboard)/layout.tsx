import DashboardLayout from "@dsarea/@/components/layout/DashboardLayout";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import { HasDsAreaCookie } from "@dsarea/@/lib/DsAreaCookies";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

// const getData = async () => {
//   try {
//     const res = await axiosInstance.get("/api/users/list/role");

//     console.log(res);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };
export default async function Layout({ children }: { children: ReactNode }) {
  const hasCookie = await HasDsAreaCookie();
  if (!hasCookie) {
    redirect("/");
  }

  // await getData();
  return <DashboardLayout>{children}</DashboardLayout>;
}
