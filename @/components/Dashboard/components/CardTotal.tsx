"use client";
import { Avatar, Space, Typography } from "antd";
import Image from "next/image";
interface Props {
  title: string;
  icon: string;
  value: number;
  bgColor: string;
}

export const CardTotal: React.FC<Props> = ({ title, icon, value, bgColor }) => {
  return (
    <Space size={12}>
      <Avatar
        size={44}
        style={{
          backgroundColor: bgColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={icon}
          alt="cover image"
          width={18}
          height={18}
          style={{
            width: "18px",
            height: "18px",
          }}
        />
      </Avatar>

      <div>
        <Typography.Text className="!font-bold">{value}</Typography.Text>
        <Typography className="!text-[#7A7A7A]">{title}</Typography>
      </div>
    </Space>
  );
};
