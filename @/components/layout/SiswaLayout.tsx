"use client";
import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  theme,
  Typography,
  Space,
  MenuProps,
} from "antd";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DashboardIcon from "../icons/DashboardIcon";
import SoalIcon from "../icons/SoalIcon";
import Link from "next/link";
import PenilaianIcon from "../icons/PenilaianIcon";
import { redirect, usePathname } from "next/navigation";
import { RootUser } from "./UserTypes";
import { deleteCookie } from "cookies-next";
import { ProfileContext } from "@dsarea/@/lib/ProfileContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Watermark } from "antd/lib";
import TransaksiIcon from "../icons/TransaksiIcon";
import KelasIcon from "../icons/KelasIcon";
import BannerIcon from "../icons/BannerIcon";

const { Sider, Content } = Layout;

const queryClient = new QueryClient();

type SiswaLayoutProps = {
  children: React.ReactNode;
  profileData: RootUser;
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const itemsSiswa: MenuItem[] = [
  getItem(
    <Link href={"/siswa/dashboard"}>Dashboard</Link>,
    "dashboard",
    <DashboardIcon />
  ),

  getItem(
    <Link href={"/siswa/latihan-soal"}>Latihan Soal</Link>,
    "latihan-soal",
    <SoalIcon />
  ),
  getItem(
    <Link href={"/siswa/pengumuman"}>Pengumuman</Link>,
    "pengumuman",
    <PenilaianIcon />
  ),
  getItem(
    <Link href={"/siswa/kelas"}>Kelas saya</Link>,
    "kelas",
    <KelasIcon />
  ),
  getItem(
    <Link href={"/siswa/informasi"}>Informasi</Link>,
    "informasi",
    <BannerIcon />
  ),
  getItem("Pembelian", "sub1", <TransaksiIcon />, [
    getItem(
      <Link className="sub-menu-item" href={"/siswa/pembelian/product"}>
        Product
      </Link>,
      "product"
    ),
    getItem(
      <Link className="sub-menu-item" href={"/siswa/pembelian/riwayat"}>
        Riwayat
      </Link>,
      "riwayat"
    ),
  ]),
];

const SiswaLayout: React.FC<SiswaLayoutProps> = ({ children, profileData }) => {
  // console.log(profileData);
  React.useEffect(() => {
    if (profileData.error) {
      deleteCookie("DS-X-Access-Agent-Token");
      deleteCookie("DS-X-Access-Agent-Role");
      redirect("/");
    }
  }, [profileData.error]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();
  const parts = pathname.split("/");
  let key: string;

  if (parts[2] === "pembelian") {
    key = parts[3].toString();
  } else {
    key = parts[2].toString();
  }

  const [activeKey, setActiveKey] = useState(key);
  const onClick: MenuProps["onClick"] = (e) => {
    setActiveKey(e.key);
  };

  const useOpens = () => {
    if (["product", "riwayat"].includes(key)) {
      return ["sub1"];
    } else {
      return [];
    }
  };

  const opens = useOpens();

  // buat state untuk menyimpan status fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // buat fungsi untuk mengubah status fullscreen berdasarkan document.fullscreenElement
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        // jika ada elemen yang fullscreen, maka ubah status menjadi true
        setIsFullscreen(true);
      } else {
        // jika tidak ada elemen yang fullscreen, maka ubah status menjadi false
        setIsFullscreen(false);
      }
    };

    // tambahkan event listener untuk mendeteksi perubahan fullscreen
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // hapus event listener ketika komponen unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ProfileContext.Provider value={profileData}>
        <Watermark
        // content={["AITI", "For Development Purpose"]}
        >
          <Layout
            style={{
              minHeight: "100vh",
            }}
          >
            <Sider
              collapsed={collapsed}
              breakpoint="md"
              collapsedWidth="80"
              onCollapse={(collapsed) => {
                setCollapsed(collapsed);
              }}
              style={{
                width: 500,
                display: isFullscreen ? "none" : undefined,
              }}
            >
              <Space
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 13,
                  borderBottom: "1px solid #AAD2D3",
                }}
              >
                <Image src="/DSAREA.png" width={36} height={36} alt="logo" />
                {!collapsed && (
                  <Typography.Text
                    strong
                    style={{
                      fontSize: 16,
                      opacity: collapsed ? 0 : 1,
                    }}
                  >
                    Digital Skill Area
                  </Typography.Text>
                )}
              </Space>
              <Menu
                theme="light"
                mode="inline"
                style={{
                  backgroundColor: "#EBF5F5",
                  borderWidth: 0,
                  padding: 18,
                }}
                className="!px-2"
                onClick={onClick}
                defaultSelectedKeys={[activeKey]}
                selectedKeys={[activeKey]}
                items={itemsSiswa}
                defaultOpenKeys={opens}
              />
            </Sider>
            <Layout>
              <Button
                type="link"
                icon={
                  !collapsed ? (
                    <ChevronLeft size={15} color="#AAD2D3" />
                  ) : (
                    <ChevronRight size={15} color="#AAD2D3" />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  borderWidth: 2,
                  borderColor: "#AAD2D3",
                  marginLeft: -20,
                  marginTop: 14,
                  borderRadius: 12,
                  position: "absolute",
                  backgroundColor: "#EBF5F5",
                }}
              />
              <Content
                style={{
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Watermark>
      </ProfileContext.Provider>
    </QueryClientProvider>
  );
};

export default SiswaLayout;
