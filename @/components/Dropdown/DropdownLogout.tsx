"use client";
import React, { useContext } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Grid, Space, Typography } from "antd";
import LogOutIcon from "../icons/LogOutIcon";
import { ProfileContext } from "@dsarea/@/lib/ProfileContext";
import { deleteCookie } from "cookies-next";
const { useBreakpoint } = Grid;

const DropdownLogout: React.FC = () => {
  const { data } = useContext(ProfileContext);
  const screens = useBreakpoint();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Logout",
      icon: <LogOutIcon />,
      onClick: () => {
        deleteCookie("DS-X-Access-Agent-Token");
        deleteCookie("DS-X-Access-Agent-Role");
        window.location.href = "/";
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click", "hover"]}>
      <Space
        style={{
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {screens.lg ? (
          <div>
            <Typography
              style={{
                fontWeight: 600,
              }}
            >
              {data?.email}
            </Typography>
            <Typography
              style={{
                color: "#7A7A7A",
                textTransform: "capitalize",
              }}
            >
              {data?.ds_user_role?.name}
            </Typography>
          </div>
        ) : null}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

export default DropdownLogout;
