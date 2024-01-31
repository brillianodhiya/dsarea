"use client";
import { formatRupiah } from "@dsarea/@/lib/utils";
import { Button, Card, Typography } from "antd";
import moment from "moment";

import { usePathname, useRouter } from "next/navigation";
import { ImageDsArea } from "../Image/ImageDsArea";

interface dataType {
  id: number;
  having_expired: boolean;
  status: string;
  start_date: string;
  end_date: string;
  nama_product: string;
  harga: number;
  desc: string;
  benefit: string;
  image: string;
  is_publish: boolean;
  publish_date: any;
  createdAt: string;
  updatedAt: string;
  total_soal: number;
  total_pembelian: number;
  is_buying: boolean;
  category: {
    id: number;
    product_id: number;
    name: string;
    desc: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export const ProductCard: React.FC<dataType> = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card
      style={{
        boxShadow:
          "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
      }}
    >
      <ImageDsArea src={props.image} />

      <div className="text-lg font-semibold mt-2">{props.nama_product}</div>
      <Typography
        style={{
          fontSize: 12,
        }}
      >
        Expired at : {moment(props.end_date).format("DD/MM/YYYY HH:mm")}
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
        {formatRupiah(props.harga)}
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
