import DashboardLayout from "@dsarea/@/components/layout/DashboardLayout";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import {
  GetDsAreaRoleCookie,
  HasDsAreaCookie,
} from "@dsarea/@/lib/DsAreaCookies";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const getDataProfile = async () => {
  try {
    const res = await axiosInstance.get("/api/users/profile");

    // console.log(res.data);
    return {
      error: false,
      ...res.data,
    };
  } catch (error) {
    // console.log(error);
    return {
      error: true,
    };
  }
};

export default async function Layout({ children }: { children: ReactNode }) {
  const hasCookie = await HasDsAreaCookie();
  const role = await GetDsAreaRoleCookie();

  if (!hasCookie) {
    redirect("/");
  }

  // if (role !== "1") {
  //   redirect("/");
  // }

  const profileData = await getDataProfile();

  // if (profileData.error) {
  // redirect("/");
  // }

  return (
    <DashboardLayout profileData={profileData}>{children}</DashboardLayout>
  );
}
