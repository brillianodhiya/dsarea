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
import { usePathname, useRouter } from "next/navigation";
import screenfull from "screenfull";

interface ModalProps {
  open: boolean;
  onSubmit: () => void;
  data: any;
}

const ViewSubCategoryModal: React.FC<ModalProps> = ({
  open,
  onSubmit,
  data,
}) => {
  const requestFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  };

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: dataModal, isFetching } = useQuery({
    queryKey: ["category", data.product_id],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        "/api/users/pembelian/detail/product/" + data.product_id
      );
      return res.data.data.length > 0 ? res.data.data[0] : {};
    },
    initialData: {
      ...data,
      category_name: [],
    },
  });

  const { data: dataModalSubCategory, isFetching: isFetching2 } = useQuery({
    queryKey: ["sub_category", data.product_id, data.category_id, data.sub_id],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        `/api/users/siswa/detail/sub/product/owned/${data.product_id}/${data.category_id}/${data.sub_id}`
      );
      return res.data.data.length > 0 ? res.data.data[0] : {};
    },
    initialData: {
      ...data,
      category_name: [],
    },
  });

  return (
    <Modal
      open={open}
      title={"Product"}
      okText="Save"
      cancelText="Nanti Saja"
      onCancel={onSubmit}
      onOk={() => {
        onSubmit();
      }}
      footer={
        <>
          <div>
            <Space>
              <Button type="default" onClick={onSubmit}>
                Nanti Saja
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  requestFullscreen();
                  router.push(
                    `${pathname}/preview-soal/${data.category_id}/${data.sub_id}`
                  );
                }}
              >
                Mulai Mengerjakan Soal
              </Button>
            </Space>
          </div>
        </>
      }
    >
      <LoadingNonFullscreen spinning={loading || isFetching || isFetching2}>
        <div>
          <div
            style={{
              marginLeft: "-24px",
              marginRight: "-24px",
            }}
          >
            <Image
              alt={dataModal.nama_product}
              src={dataModal.image ?? "/card-image.svg"}
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
                  {dataModalSubCategory.nama_product}
                </Typography.Text>
                {dataModal.status == "active" ? (
                  <Tag color="#32D583">Active</Tag>
                ) : (
                  <Tag
                    color="#f50"
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {dataModal.status}
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
                  {dataModal.end_date}
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
                <Badge color="#3A9699" />
                <Typography
                  style={{
                    fontSize: 14,
                  }}
                >
                  Total Pertanyaan : {dataModal.total_soal}
                </Typography>
                <Badge color="#3A9699" />
                <Typography
                  style={{
                    fontSize: 14,
                  }}
                >
                  Total Siswa : {dataModalSubCategory.participant}
                </Typography>
              </Space>
              <Space wrap size={"small"}>
                <div
                  style={{
                    border: "1px solid #D0E6E7",
                    padding: "2px 6px",
                    background:
                      "linear-gradient(0deg, #EBF5F5, #EBF5F5), linear-gradient(0deg, #D0E6E7, #D0E6E7)",
                    borderRadius: "6px",
                    color: "#3A9699",
                  }}
                >
                  {dataModalSubCategory.category_name}
                </div>
                <div
                  style={{
                    border: "1px solid #F3F3F3",
                    padding: "2px 6px",
                    background:
                      "linear-gradient(0deg, #F7F7F7, #F7F7F7), linear-gradient(0deg, #F3F3F3, #F3F3F3)",
                    borderRadius: "6px",
                    color: "#525252",
                  }}
                >
                  {dataModalSubCategory.sub_category_name}
                </div>
              </Space>
            </div>
          </div>
          <div>
            <h4
              style={{
                fontWeight: "500",
                fontSize: "14px",
                marginTop: "20px",
              }}
            >
              Tata cara Pengerjaan
            </h4>
            <p
              style={{
                fontSize: "14px",
              }}
            >
              {dataModalSubCategory.rules}
            </p>
          </div>
        </div>
      </LoadingNonFullscreen>
    </Modal>
  );
};
export default ViewSubCategoryModal;
