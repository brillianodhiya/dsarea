"use client";
import { Avatar, Badge, Breadcrumb, Button, Layout, Typography } from "antd";
import { Bell } from "lucide-react";
import DropdownLogout from "../Dropdown/DropdownLogout";
import React, { useContext } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProfileContext } from "@dsarea/@/lib/ProfileContext";

type HeaderProps = {
  title: string;
  isSubMenu?: boolean;
  subMenu?: any;
};

const CustomHeader: React.FC<HeaderProps> = ({
  title,
  isSubMenu = false,
  subMenu,
}) => {
  const { Header } = Layout;
  const router = useRouter();

  const { data } = useContext(ProfileContext);

  return (
    <Header
      style={{
        padding: 0,
        background: "#FFF",
        borderBottom: "1px solid #F3F3F3",
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
            ].concat(subMenu)}
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
          gap: 24,
        }}
      >
        <Badge count={100}>
          <Bell />
        </Badge>
        <Avatar
          style={{ backgroundColor: "#D9D9D9", verticalAlign: "middle" }}
          size="large"
          gap={2}
          src={data?.picture}
          alt={data?.name}
          shape="circle"
        >
          {data?.name}
        </Avatar>
        <DropdownLogout />
      </div>
    </Header>
  );
};

export default CustomHeader;
