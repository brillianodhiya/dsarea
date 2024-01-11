import DashboardLayout from "@dsarea/@/components/layout/DashboardLayout";
import { GetDsAreaCookie } from "@dsarea/@/lib/DsAreaCookies";
import Button from "antd/lib/button";
import Image from "next/image";

export default async function Home() {
  const cc = await GetDsAreaCookie();
  console.log(cc);
  return <Button type="primary">TEST</Button>;
}
