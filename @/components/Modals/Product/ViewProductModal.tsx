"use client";
import React from "react";
import {
  Badge,
  Button,
  Modal,
  Space,
  Tabs,
  TabsProps,
  Tag,
  Typography,
} from "antd";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { formatRupiah, getStatus, pickRandomItem } from "@dsarea/@/lib/utils";
import { FieldTimeOutlined } from "@ant-design/icons";
import LoadingNonFullscreen from "../../LoadingComponent/LoadingComponentParent";
import { useRouter } from "next/navigation";

interface ModalProps {
  open: boolean;
  onSubmit: () => void;
  data: any;
  buy?: boolean;
}

const ViewProductModal: React.FC<ModalProps> = ({
  open,
  onSubmit,
  data,
  buy = false,
}) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { data: dataModal, isFetching } = useQuery({
    queryKey: ["category", data.id],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        "/api/users/pembelian/detail/product/" + data.id
      );
      return res.data.data.length > 0 ? res.data.data[0] : {};
    },
    initialData: {
      ...data,
      category_name: [],
    },
  });

  const items: TabsProps["items"] = [
    {
      key: "desc",
      label: "Deskripsi",
      children: dataModal.desc,
    },
    {
      key: "benefit",
      label: "Benefit",
      children: dataModal.benefit,
    },
  ];

  return (
    <Modal
      open={open}
      title={"Product"}
      okText="Save"
      cancelText="Cancel"
      onCancel={onSubmit}
      onOk={() => {
        onSubmit();
      }}
      footer={
        <>
          {buy ? (
            <div>
              <Space>
                <Button
                  onClick={onSubmit}
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#3A9699",
                    color: "#3A9699",
                  }}
                  type="link"
                >
                  Close
                </Button>
                <Button
                  type={data.is_buying ? "default" : "primary"}
                  disabled={data.is_buying}
                  onClick={() => {
                    router.push(`/siswa/pembelian/product/${data.id}`);
                  }}
                >
                  Beli Sekarang
                </Button>
              </Space>
            </div>
          ) : (
            <div>
              <Space>
                <Button onClick={onSubmit}>Close</Button>
              </Space>
            </div>
          )}
        </>
      }
    >
      <LoadingNonFullscreen spinning={loading || isFetching}>
        <div>
          <div
            style={{
              marginLeft: "-24px",
              marginRight: "-24px",
            }}
          >
            <Image
              alt={data.nama_product}
              src={data.image ?? "/card-image.svg"}
              width={1000}
              height={1000}
              style={{
                width: "100%",
                height: 200,
                objectFit: "contain",
                background: "#EDF3EF",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Space>
                <Typography.Text
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  {data.nama_product}
                </Typography.Text>
                {dataModal.expired_at == "undefined" ||
                dataModal.expired_at == "unlimeted" ? (
                  <Tag color="#32D583">Active</Tag>
                ) : dataModal.expired_at ? (
                  <Tag
                    color="#32D583"
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {getStatus(dataModal.expired_at)}
                  </Tag>
                ) : (
                  <Tag
                    color="#f50"
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {getStatus(dataModal.expired_at)}
                  </Tag>
                )}
              </Space>
              <Typography.Text
                style={{
                  color: "#333333",
                  fontSize: 14,
                }}
              >
                Expired at :{" "}
                <span
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {dataModal.expired_at}
                </span>
              </Typography.Text>
              <Space style={{}}>
                <Typography
                  style={{
                    color: "#FDB022",
                    fontSize: 14,
                  }}
                >
                  <FieldTimeOutlined /> {dataModal.total_duration} min
                </Typography>
                <Badge status="success" />
                <Typography
                  style={{
                    fontSize: 14,
                  }}
                >
                  Total Pertanyaan : {dataModal.total_soal}
                </Typography>
              </Space>
              <Space wrap size={"small"}>
                {dataModal?.category_name?.map((v: any, idx: number) => {
                  return (
                    <Tag color={pickRandomItem()} key={idx + v}>
                      {v}
                    </Tag>
                  );
                })}
              </Space>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: 14,
                  color: "#7A7A7A",
                }}
              >
                Harga
              </Typography.Text>
              <Typography.Text
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                {formatRupiah(data.harga)}
              </Typography.Text>
              <Typography.Text
                style={{
                  fontSize: 14,
                  color: "#7A7A7A",
                }}
              >
                Jumlah Pembeli : {dataModal.total_pembelian}
              </Typography.Text>
            </div>
          </div>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </LoadingNonFullscreen>
    </Modal>
  );
};
export default ViewProductModal;
