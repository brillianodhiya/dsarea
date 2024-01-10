"use client";
import { Avatar, Badge, Breadcrumb, Button, Layout, Typography } from "antd";
import { Bell } from "lucide-react";
import DropdownLogout from "../Dropdown/DropdownLogout";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

type HeaderProps = {
  title: string;
  isSubMenu?: boolean;
  subMenu?: any;
};

const CustomHeader: React.FC<HeaderProps> = ({ title, isSubMenu = false }) => {
  const { Header } = Layout;
  const router = useRouter();
  return (
    <Header
      style={{
        padding: 0,
        background: "#FFF",
        borderBottomWidth: 2,
        borderColor: "#F3F3F3",
        display: "flex",
        alignItems: "center",
        gap: 10,
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 24,
      }}
    >
      {isSubMenu ? (
        <div>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: "Home",
              },
              {
                title: "Application Center",
                // href: "",
              },
            ]}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          >
            <ArrowLeftOutlined />
            <Typography.Text strong className="!text-xl">
              {title}
            </Typography.Text>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Typography.Text strong className="!text-xl">
            {title}
          </Typography.Text>
        </div>
      )}
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
  );
};

export default CustomHeader;
