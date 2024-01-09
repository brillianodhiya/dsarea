import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";
import LogOutIcon from "../icons/LogoutIcon";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Logout",
    icon: <LogOutIcon />,
  },
];

const DropdownLogout: React.FC = () => (
  <Dropdown menu={{ items }}>
    <Space>
      <div>
        <Typography
          style={{
            fontWeight: 600,
          }}
        >
          user@use.com
        </Typography>
        <Typography
          style={{
            color: "#7A7A7A",
          }}
        >
          Super Admin
        </Typography>
      </div>
      <DownOutlined />
    </Space>
  </Dropdown>
);

export default DropdownLogout;
