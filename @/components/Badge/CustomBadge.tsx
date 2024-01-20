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
          <CheckCircleFilled className="!text-[#32D583] text-[10px]" />
          {" " + value}
        </Typography>
      ) : status === "pending" ? (
        <Typography className="capitalize">
          <ExclamationCircleFilled className="!text-[#FDB022] text-[10px]" />
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
