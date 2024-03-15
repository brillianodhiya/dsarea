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
          <CheckCircleFilled className="!text-[#32D583] text-[10px]" />
          {" " + value}
        </Typography>
      ) : status === "pending" ? (
        <Typography className="capitalize">
          <ExclamationCircleFilled
            style={{
              color: "#FDB022",
            }}
            className="!text-[#FDB022] text-[10px]"
          />
          {" " + value}
        </Typography>
      ) : (
        <Typography className="capitalize">
          <MinusCircleFilled className="!text-[#F04438] text-[10px]" />
          {" " + value}
        </Typography>
      )}
    </>
  );
};
