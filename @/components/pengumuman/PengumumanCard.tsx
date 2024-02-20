"use client";
import { formatRupiah } from "@dsarea/@/lib/utils";
import { Card, Progress, Space, Tag, Typography } from "antd";
import moment from "moment";
import Image from "next/image";
import MultiUserIcon from "../icons/MultiUsersIcon";
import DurationIcon from "../icons/DurationIcon";
import ListNumberIcon from "../icons/ListNumberIcon";
import { usePathname, useRouter } from "next/navigation";
import { ImageDsArea } from "../Image/ImageDsArea";

interface dataType {
  data: any;
}

export const PengumumanCard: React.FC<dataType> = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card
      onClick={() => router.push(`${pathname}/${data.id}`)}
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
          right: 25,
          top: 30,
          width: "max-content",
          color: "#7A7A7A",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        Selesai
      </Tag>
      <ImageDsArea src={data.image} />
      <div className="text-lg font-semibold mt-2">{data.nama_product}</div>
      <Typography
        style={{
          fontSize: 12,
        }}
      >
        Expired at : {moment(data.expired_at).format("DD/MM/YYYY HH:mm")}
      </Typography>
      <Typography
        style={{
          fontWeight: 400,
          color: "#7A7A7A",
        }}
      >
        Harga
      </Typography>
      <Typography.Text strong> {formatRupiah(data.harga)}</Typography.Text>
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
          Score : {data.score}
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
              {data.rank}
            </span>
            /{data.total_peserta} Siswa
          </div>
        </Space>
      </div>
    </Card>
  );
};
