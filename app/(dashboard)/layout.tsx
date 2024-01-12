import DashboardLayout from "@dsarea/@/components/layout/DashboardLayout";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import { HasDsAreaCookie } from "@dsarea/@/lib/DsAreaCookies";
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
  if (!hasCookie) {
    redirect("/");
  }

  const profileData = await getDataProfile();
  // console.log(profileData);
  // if (profileData.error) {
  // redirect("/");
  // }

  return (
    <DashboardLayout profileData={profileData}>{children}</DashboardLayout>
  );
}
