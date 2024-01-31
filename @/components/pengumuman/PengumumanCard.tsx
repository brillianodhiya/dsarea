"use client";
import { formatRupiah } from "@dsarea/@/lib/utils";
import { Card, Progress, Space, Tag, Typography } from "antd";
import moment from "moment";
import Image from "next/image";
import MultiUserIcon from "../icons/MultiUsersIcon";
import DurationIcon from "../icons/DurationIcon";
import ListNumberIcon from "../icons/ListNumberIcon";
import { usePathname, useRouter } from "next/navigation";

interface dataType {}

export const PengumumanCard: React.FC<dataType> = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card
      onClick={() => router.push(`${pathname}/soal`)}
      style={{
        boxShadow:
          "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
      }}
      hoverable
    >
      <Tag
        style={{
          position: "absolute",
          borderRadius: 100,
          textAlign: "center",
          right: 0,
          width: "max-content",
          color: "#7A7A7A",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        Selesai
      </Tag>
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
      <Typography.Text strong> {formatRupiah(75000)}</Typography.Text>
      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Tag
          color="#EBF5F5"
          className="!text-[#3A9699] !border !border-[#D0E6E7] !rounded-md !font-bold"
        >
          Score : 223
        </Tag>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Space>
          <div
            style={{
              fontWeight: 400,
              color: "#7A7A7A",
              fontSize: 12,
            }}
          >
            Peringkat :{" "}
            <span
              style={{
                fontWeight: 700,
                color: "#7A7A7A",
              }}
            >
              30
            </span>
            /40 Siswa
          </div>
        </Space>
      </div>
    </Card>
  );
};
