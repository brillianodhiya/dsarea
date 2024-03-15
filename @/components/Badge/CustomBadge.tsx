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
        <Typography className="capitalize">
          {/* Type error: Type '{ className: string; }' is missing the following properties from type 'Pick<AntdIconProps, "prefix" | "media" | "data" | "height" | "width" | "translate" | "rotate" | "content" | "muted" | "headers" | "method" | "size" | "value" | "name" | ... 349 more ... | "twoToneColor">': onPointerEnterCapture, onPointerLeaveCapture */}
          <CheckCircleFilled
            style={{
              color: "#32D583",
              fontSize: "10px",
            }}
          />
          {" " + value}
        </Typography>
      ) : status === "pending" ? (
        <Typography className="capitalize">
          <ExclamationCircleFilled
            style={{
              color: "#FDB022",
              fontSize: "10px",
            }}
          />
          {" " + value}
        </Typography>
      ) : (
        <Typography className="capitalize">
          <MinusCircleFilled
            style={{
              color: "#F04438",
              fontSize: "10px",
            }}
          />
          {" " + value}
        </Typography>
      )}
    </>
  );
};
