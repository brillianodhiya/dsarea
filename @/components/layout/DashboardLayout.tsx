"use client";
import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  theme,
  Typography,
  Space,
  MenuProps,
  Badge,
  Avatar,
  Dropdown,
} from "antd";
import Image from "next/image";
import { Bell, BellIcon, ChevronLeft, ChevronRight } from "lucide-react";
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
import { DownOutlined } from "@ant-design/icons";
import DropdownLogout from "../Dropdown/DropdownLogout";
import { RootUser } from "./UserTypes";
import { deleteCookie } from "cookies-next";
import { ProfileContext } from "@dsarea/@/lib/ProfileContext";

const { Header, Sider, Content } = Layout;

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

const itemsSuperAdmin: MenuItem[] = [
  getItem(<Link href={"/dashboard"}>Dashboard</Link>, "1", <DashboardIcon />),
  getItem("Soal", "sub1", <SoalIcon />, [
    getItem(
      <Link className="sub-menu-item" href={"/soal/category"}>
        Kategori
      </Link>,
      "2"
    ),
    getItem(
      <Link className="sub-menu-item" href={"/soal/paket-soal"}>
        Paket Soal
      </Link>,
      "3"
    ),
    getItem(
      <Link className="sub-menu-item" href={"/soal/product"}>
        Product
      </Link>,
      "4"
    ),
  ]),
  getItem(<Link href={"/penilaian"}>Penilaian</Link>, "5", <PenilaianIcon />),
  getItem(<Link href={"/siswa"}>Siswa</Link>, "6", <SiswaIcon />),
  getItem(<Link href={"/role"}>User Role</Link>, "7", <RoleIcon />),
  getItem(<Link href={"/voucher"}>Voucher</Link>, "8", <VoucherIcon />),
  getItem(<Link href={"/kelas"}>Kelas</Link>, "9", <KelasIcon />),
  getItem(<Link href={"/banner"}>Banner</Link>, "10", <BannerIcon />),
  getItem(
    <Link href={"/transaction"}>Transaksi</Link>,
    "11",
    <TransaksiIcon />
  ),
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  profileData,
}) => {
  // console.log(profileData);
  React.useEffect(() => {
    if (profileData.error) {
      deleteCookie("DS-X-Access-Agent-Token");
      redirect("/");
    }
  }, [profileData.error]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [activeKey, setActiveKey] = useState("1");

  const pathname = usePathname();
  let result =
    pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2);

  const onClick: MenuProps["onClick"] = (e) => {
    setActiveKey(e.key);
  };

  const useMenus = () => {
    if (profileData?.data?.ds_user_role.id == 1) {
      return itemsSuperAdmin;
    } else if (profileData?.data?.ds_user_role.id == 2) {
      return [];
    } else if (profileData?.data?.ds_user_role.id == 3) {
      return [];
    } else {
      return [];
    }
  };

  const DsAreaMenu = useMenus();

  return (
    <ProfileContext.Provider value={profileData}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          // trigger={null}
          // breakpoint="lg"
          // collapsedWidth="0"
          // collapsible
          collapsed={collapsed}
          breakpoint="md"
          collapsedWidth="80"
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);
          }}
          style={{
            width: 500,
          }}
        >
          <Space
            style={{
              borderColor: "#AAD2D3",
              borderBottomWidth: 2,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 13,
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
            defaultSelectedKeys={["1"]}
            items={DsAreaMenu}
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
              marginLeft: -20,
              marginTop: 14,
              borderRadius: 12,
              position: "absolute",
              backgroundColor: "#EBF5F5",
            }}
          />
          <Content
            style={{
              // margin: "24px 16px",
              // padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ProfileContext.Provider>
  );
};

export default DashboardLayout;
