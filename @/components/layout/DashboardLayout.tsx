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
  Grid,
} from "antd";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DashboardIcon from "../icons/DashboardIcon";
import SoalIcon from "../icons/SoalIcon";
import Link from "next/link";
import BannerIcon from "../icons/BannerIcon";
import TransaksiIcon from "../icons/TransaksiIcon";
import KelasIcon from "../icons/KelasIcon";
import VoucherIcon from "../icons/VoucherIcon";
import RoleIcon from "../icons/RoleIcon";
import SiswaIcon from "../icons/SiswaIcon";
import PenilaianIcon from "../icons/PenilaianIcon";
import { redirect, usePathname } from "next/navigation";
import { RootUser } from "./UserTypes";
import { deleteCookie } from "cookies-next";
import { ProfileContext } from "@dsarea/@/lib/ProfileContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Watermark } from "antd/lib";

const { Header, Sider, Content } = Layout;

const queryClient = new QueryClient();

type DashboardLayoutProps = {
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

const itemsAdmin: MenuItem[] = [
  getItem(
    <Link href={"/dashboard"}>Dashboard</Link>,
    "dashboard",
    <DashboardIcon />
  ),
  getItem("Soal", "sub1", <SoalIcon />, [
    getItem(
      <Link className="sub-menu-item" href={"/soal/category"}>
        Kategori
      </Link>,
      "category"
    ),
    getItem(
      <Link className="sub-menu-item" href={"/soal/paket-soal"}>
        Paket Soal
      </Link>,
      "paket-soal"
    ),
    getItem(
      <Link className="sub-menu-item" href={"/soal/product"}>
        Product
      </Link>,
      "product"
    ),
  ]),
  getItem(
    <Link href={"/penilaian"}>Penilaian</Link>,
    "penilaian",
    <PenilaianIcon />
  ),
  getItem(<Link href={"/siswa"}>Siswa</Link>, "siswa", <SiswaIcon />),
  getItem(<Link href={"/voucher"}>Voucher</Link>, "voucher", <VoucherIcon />),
  getItem(<Link href={"/kelas"}>Kelas</Link>, "kelas", <KelasIcon />),
  getItem(<Link href={"/banner"}>Banner</Link>, "banner", <BannerIcon />),
  getItem(
    <Link href={"/transaction"}>Transaksi</Link>,
    "transaction",
    <TransaksiIcon />
  ),
];
const itemsSuperAdmin: MenuItem[] = [
  getItem(
    <Link href={"/dashboard"}>Dashboard</Link>,
    "dashboard",
    <DashboardIcon />
  ),
  getItem("Soal", "sub1", <SoalIcon />, [
    getItem(
      <Link className="sub-menu-item" href={"/soal/category"}>
        Kategori
      </Link>,
      "category"
    ),
    getItem(
      <Link className="sub-menu-item" href={"/soal/paket-soal"}>
        Paket Soal
      </Link>,
      "paket-soal"
    ),
    getItem(
      <Link className="sub-menu-item" href={"/soal/product"}>
        Product
      </Link>,
      "product"
    ),
  ]),
  getItem(
    <Link href={"/penilaian"}>Penilaian</Link>,
    "penilaian",
    <PenilaianIcon />
  ),
  getItem(<Link href={"/siswa"}>Siswa</Link>, "siswa", <SiswaIcon />),
  getItem(<Link href={"/role"}>User Role</Link>, "role", <RoleIcon />),
  getItem(<Link href={"/voucher"}>Voucher</Link>, "voucher", <VoucherIcon />),
  getItem(<Link href={"/kelas"}>Kelas</Link>, "kelas", <KelasIcon />),
  getItem(<Link href={"/banner"}>Banner</Link>, "banner", <BannerIcon />),
  getItem(
    <Link href={"/transaction"}>Transaksi</Link>,
    "transaction",
    <TransaksiIcon />
  ),
];

const { useBreakpoint } = Grid;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  profileData,
}) => {
  // console.log(profileData);
  const screens = useBreakpoint();

  React.useEffect(() => {
    if (profileData.error) {
      deleteCookie("DS-X-Access-Agent-Token");
      deleteCookie("DS-X-Access-Agent-Role");
      redirect("/");
    } else if (profileData.data.role_id != 1 && profileData.data.role_id != 2) {
      deleteCookie("DS-X-Access-Agent-Token");
      deleteCookie("DS-X-Access-Agent-Role");
      redirect("/");
    }
  }, [profileData.error]);

  console.log(profileData?.data?.ds_user_role.id);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();
  const parts = pathname.split("/");
  let key: string;

  if (parts[1] === "soal") {
    key = parts[2].toString();
  } else {
    key = parts[1].toString();
  }

  const [activeKey, setActiveKey] = useState(key);
  const onClick: MenuProps["onClick"] = (e) => {
    setActiveKey(e.key);
  };

  const useMenus = () => {
    if (profileData?.data?.ds_user_role.id == 1) {
      return itemsSuperAdmin;
    } else if (profileData?.data?.ds_user_role.id == 2) {
      return itemsAdmin;
    } else if (profileData?.data?.ds_user_role.id == 3) {
      return [];
    } else {
      return [];
    }
  };

  const DsAreaMenu = useMenus();

  const useOpens = () => {
    if (["category", "paket-soal", "product"].includes(key)) {
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
              // trigger={null}
              // breakpoint="lg"
              // collapsedWidth="0"
              // collapsible
              collapsed={collapsed}
              breakpoint="md"
              collapsedWidth={screens.sm ? "80" : "0"}
              zeroWidthTriggerStyle={{
                display: "none",
              }}
              onCollapse={(collapsed, type) => {
                setCollapsed(collapsed);
              }}
              style={
                !screens.sm
                  ? {
                      display: collapsed ? "none" : undefined,
                      width: 500,
                      zIndex: 80,
                      // position: collapsed ? undefined : "absolute",
                    }
                  : {
                      width: 500,
                      display: isFullscreen ? "none" : undefined,
                      zIndex: 80,
                    }
              }
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
                items={DsAreaMenu}
                defaultOpenKeys={opens}
              />
            </Sider>
            <Layout>
              {/*

        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderBottomWidth: 2,
            borderColor: "#F3F3F3",
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: "space-between",
            paddingRight: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Button
              // type="primary"
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
                marginLeft: -16,
                borderRadius: 12,
              }}
            />
            <Typography.Text strong>{result}</Typography.Text>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
            }}
          >
            <Badge count={100}>
              <Bell />
            </Badge>
            <Avatar
              style={{ backgroundColor: "#D9D9D9", verticalAlign: "middle" }}
              size="large"
              gap={2}
            >
              X
            </Avatar>
            <DropdownLogout />
          </div>

        </Header>
      */}
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
                  marginLeft: !screens.sm ? 5 : -20,
                  marginTop: 14,
                  borderRadius: 12,
                  position: "absolute",
                  backgroundColor: "#EBF5F5",
                  top: screens.sm ? 0 : 65,
                  zIndex: 700,
                }}
              />
              <Content
                style={{
                  // margin: "24px 16px",
                  // padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  position: !collapsed && !screens.sm ? "absolute" : undefined,
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

export default DashboardLayout;
