"use client";
import { formatRupiah } from "@dsarea/@/lib/utils";
import { Button, Card, Typography } from "antd";
import moment from "moment";

import { usePathname, useRouter } from "next/navigation";
import { ImageDsArea } from "../Image/ImageDsArea";
import { useState } from "react";
import ViewProductModal from "../Modals/Product/ViewProductModal";

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
  const [openViewModal, setOpenViewModal] = useState(false);

  return (
    <>
      <ViewProductModal
        onSubmit={() => setOpenViewModal(false)}
        data={props}
        open={openViewModal}
        buy={true}
      />
      <Card
        style={{
          boxShadow:
            "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
        }}
      >
        <ImageDsArea src={props.image} width={250} />

        <p className="text-lg font-semibold mt-2" title={props.nama_product}>
          {/* berikan ... ketika karakter melebihi 20 karakter  */}
          {props.nama_product.length > 20
            ? props.nama_product.slice(0, 20) + "..."
            : props.nama_product}
        </p>
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
            onClick={() => setOpenViewModal(true)}
          >
            Lihat Detail
          </Button>

          <Button
            style={{
              width: "100%",
            }}
            type={props.is_buying ? "default" : "primary"}
            disabled={props.is_buying}
            onClick={() => router.push("/siswa/pembelian/product/" + props.id)}
          >
            Beli Sekarang
          </Button>
        </div>
      </Card>
    </>
  );
};
