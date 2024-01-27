"use client";
import { formatRupiah } from "@dsarea/@/lib/utils";
import { Button, Card, Progress, Space, Tag, Typography } from "antd";
import moment from "moment";
import Image from "next/image";
import MultiUserIcon from "../icons/MultiUsersIcon";
import DurationIcon from "../icons/DurationIcon";
import ListNumberIcon from "../icons/ListNumberIcon";
import { usePathname, useRouter } from "next/navigation";

interface dataType {}

export const ProductCard: React.FC<dataType> = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card
      style={{
        boxShadow:
          "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
      }}
    >
      <Image
        alt={"alt"}
        src={"/card-image.svg"}
        width={500}
        height={140}
        className="w-full h-[100px] object-contain object-center"
      />
      <div className="text-lg font-semibold mt-2">Excel For Advance</div>
      <Typography
        style={{
          fontSize: 12,
        }}
      >
        Expired at : {moment().format("DD/MM/YYYY HH:mm")}
      </Typography>
      <Typography
        style={{
          fontWeight: 400,
          color: "#7A7A7A",
        }}
      >
        Harga
      </Typography>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        {formatRupiah(75000)}
      </div>
      <div className="flex flex-row justify-between gap-2 mt-4">
        <Button
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#3A9699",
            color: "#3A9699",
          }}
          type="link"
        >
          Lihat Detail
        </Button>

        <Button
          style={{
            width: "100%",
          }}
          type="primary"
        >
          Beli Sekarang
        </Button>
      </div>
    </Card>
  );
};
