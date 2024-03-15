import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Typography } from "antd";

interface BadgeProps {
  value: string;
  status: string;
}

export const CustomBadge: React.FC<BadgeProps> = ({ value, status }) => {
  return (
    <>
      {status === "success" ? (
        <Typography
          style={{
            color: "#32D583",
            fontSize: "10px",
            textTransform: "capitalize",
          }}
        >
          {/* di line ini muncul error ini perbaiki di bawah Type error: Type '{}' is missing the following properties from type 'Pick<AntdIconProps, "prefix" | "media" | "data" | "height" | "width" | "translate" | "rotate" | "content" | "muted" | "headers" | "method" | "size" | "value" | "name" | ... 349 more ... | "twoToneColor">': onPointerEnterCapture, onPointerLeaveCapture */}
          <CheckCircleFilled /> {value}
        </Typography>
      ) : status === "pending" ? (
        <Typography
          style={{
            color: "#FDB022",
            fontSize: "10px",
            textTransform: "capitalize",
          }}
        >
          <ExclamationCircleFilled /> {value}
        </Typography>
      ) : (
        <Typography
          style={{
            color: "#F04438",
            fontSize: "10px",
            textTransform: "capitalize",
          }}
        >
          <MinusCircleFilled /> {value}
        </Typography>
      )}
    </>
  );
};
