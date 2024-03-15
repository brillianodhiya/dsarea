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
          className="capitalize"
          style={{
            color: "#32D583",
            fontSize: "10px",
          }}
        >
          {/* Type error: Type '{ className: string; }' is missing the following properties from type 'Pick<AntdIconProps, "prefix" | "media" | "data" | "height" | "width" | "translate" | "rotate" | "content" | "muted" | "headers" | "method" | "size" | "value" | "name" | ... 349 more ... | "twoToneColor">': onPointerEnterCapture, onPointerLeaveCapture */}
          <CheckCircleFilled />
          {" " + value}
        </Typography>
      ) : status === "pending" ? (
        <Typography
          className="capitalize"
          style={{
            color: "#FDB022",
            fontSize: "10px",
          }}
        >
          <ExclamationCircleFilled />
          {" " + value}
        </Typography>
      ) : (
        <Typography
          className="capitalize"
          style={{
            color: "#F04438",
            fontSize: "10px",
          }}
        >
          <MinusCircleFilled />
          {" " + value}
        </Typography>
      )}
    </>
  );
};
