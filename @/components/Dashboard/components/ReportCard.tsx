"use client";
import { formatAngka } from "@dsarea/@/lib/utils";
import { Space, Typography } from "antd";
import {
  MoveDownLeft,
  MoveDownRight,
  MoveHorizontal,
  MoveUpRight,
} from "lucide-react";
interface dataType {
  data: any;
  loading: boolean;
  title: string;
  percent: string;
}

const ReportCard = ({ data, loading, percent, title }: dataType) => {
  const getStatusIcon = (percent: string) => {
    const cleanPercent = percent?.replace(/[+-]/g, "");
    if (percent?.includes("+")) {
      return (
        <Space>
          <MoveUpRight size={12} color="#32D583" strokeWidth={3} />
          <Typography
            style={{
              color: "#32D583",
            }}
          >
            {cleanPercent}
          </Typography>
        </Space>
      );
    } else if (percent?.includes("-")) {
      return (
        <Space>
          <MoveDownLeft size={12} color="#F04438" strokeWidth={3} />
          <Typography
            style={{
              color: "#F04438",
            }}
          >
            {cleanPercent}
          </Typography>
        </Space>
      );
    } else {
      return (
        <Space>
          <MoveHorizontal size={12} color="#7A7A7A" strokeWidth={3} />
          <Typography
            style={{
              color: "#7A7A7A",
            }}
          >
            {cleanPercent}
          </Typography>
        </Space>
      );
    }
  };
  return (
    <div>
      <Typography
        style={{
          color: "#7A7A7A",
        }}
      >
        {title}
      </Typography>
      <Typography
        style={{
          fontSize: 24,
          fontWeight: 500,
        }}
      >
        {formatAngka(loading ? 0 : data)}
      </Typography>
      <Typography
        style={{
          fontSize: 12,
        }}
      >
        {getStatusIcon(loading ? "0%" : percent)}
      </Typography>
    </div>
  );
};

export default ReportCard;
