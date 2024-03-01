"use client";
import React from "react";
import {
  Badge,
  Button,
  Modal,
  Progress,
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
import Link from "next/link";
import dayjs from "dayjs";

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
      if (data.product_id) {
        const res = await axiosClientInstance.get(
          "/api/users/pembelian/detail/product/" + data.product_id
        );
        return res.data.data.length > 0 ? res.data.data[0] : {};
      } else {
        return {};
      }
    },
    initialData: {
      ...data,
      category_name: [],
    },
  });

  const { data: dataModalSubCategory, isFetching: isFetching2 } = useQuery({
    queryKey: ["sub_category", data.product_id, data.category_id, data.sub_id],
    queryFn: async () => {
      if (data.product_id) {
        const res = await axiosClientInstance.get(
          `/api/users/siswa/detail/sub/product/owned/${data.product_id}/${data.category_id}/${data.sub_id}`
        );
        return res.data.data.length > 0 ? res.data.data[0] : {};
      } else {
        return {};
      }
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
            {dataModalSubCategory.status == "active" ? (
              <Space>
                <Button type="default" onClick={onSubmit}>
                  Nanti Saja
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    // requestFullscreen();
                    router.push(
                      `${pathname}/preview-soal/${data.category_id}/${
                        data.sub_id
                      }?end_duration=${dayjs()
                        .add(dataModalSubCategory.duration, "minute")
                        .format("YYYY-MM-DD HH:mm:ss")}`
                    );
                  }}
                >
                  Mulai Mengerjakan Soal
                </Button>
              </Space>
            ) : (
              <Button type="default" onClick={onSubmit}>
                Tutup
              </Button>
            )}
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
                {dataModalSubCategory.status == "active" ? (
                  <Tag color="#32D583">Active</Tag>
                ) : (
                  <Tag
                    color="#f50"
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {dataModalSubCategory.status}
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
                  {dataModalSubCategory.expired_date}
                </span>
              </Typography.Text>
              <Space style={{}}>
                <Typography
                  style={{
                    color: "#FDB022",
                    fontSize: 14,
                  }}
                >
                  <FieldTimeOutlined /> {dataModalSubCategory.duration} min
                </Typography>
                <Badge color="#3A9699" />
                <Typography
                  style={{
                    fontSize: 14,
                  }}
                >
                  Total Pertanyaan : {dataModalSubCategory.total_soal}
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
          {dataModalSubCategory.status == "active" ? (
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
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#7A7A7A",
                  }}
                >
                  {Math.round(
                    (parseFloat(dataModalSubCategory.total_soal_answer) /
                      dataModalSubCategory.total_soal) *
                      100
                  )}
                  %
                </div>
                <Progress
                  percent={
                    (parseFloat(dataModalSubCategory.total_soal_answer) /
                      dataModalSubCategory.total_soal) *
                    100
                  }
                  showInfo={false}
                />
                <div
                  style={{
                    fontWeight: 700,
                    color: "#7A7A7A",
                  }}
                >
                  {dataModalSubCategory.total_soal_answer}/
                  <span style={{ fontWeight: 400 }}>
                    {dataModalSubCategory.total_soal}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexDirection: "column",
                }}
              >
                <h4
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {dataModalSubCategory.sub_category_name}
                </h4>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.3335 8C1.3335 5.17157 1.3335 3.75736 2.21218 2.87868C3.09086 2 4.50507 2 7.3335 2H8.66683C11.4953 2 12.9095 2 13.7881 2.87868C14.6668 3.75736 14.6668 5.17157 14.6668 8C14.6668 10.8284 14.6668 12.2426 13.7881 13.1213C12.9095 14 11.4953 14 8.66683 14H7.3335C4.50507 14 3.09086 14 2.21218 13.1213C1.3335 12.2426 1.3335 10.8284 1.3335 8Z"
                        stroke="#6A6A6A"
                      />
                      <path
                        d="M8.11967 10.2491L8.01512 9.76018H8.01512L8.11967 10.2491ZM7.41766 9.54712L7.90661 9.65167L7.41766 9.54712ZM7.92889 8.06513L7.57534 7.71157H7.57534L7.92889 8.06513ZM11.8813 6.52838L12.3143 6.27838L11.8813 6.52838ZM11.8813 7.4155L12.3143 7.6655L11.8813 7.4155ZM11.1384 5.78548L11.3884 5.35247L11.3884 5.35247L11.1384 5.78548ZM9.85846 6.13555L10.212 6.48911V6.48911L9.85846 6.13555ZM10.2513 5.78548L10.0013 5.35247V5.35247L10.2513 5.78548ZM11.1777 7.45477L9.24811 9.38435L9.95522 10.0915L11.8848 8.16188L11.1777 7.45477ZM8.28244 8.41868L10.212 6.48911L9.50491 5.782L7.57534 7.71157L8.28244 8.41868ZM8.01512 9.76018C7.91253 9.78212 7.83165 9.79937 7.76238 9.81225C7.69238 9.82526 7.64876 9.83097 7.62094 9.83274C7.59216 9.83457 7.60164 9.83056 7.63058 9.83802C7.66784 9.84763 7.71537 9.87051 7.75582 9.91097L7.04871 10.6181C7.25645 10.8258 7.51484 10.8415 7.68441 10.8307C7.84501 10.8205 8.0392 10.7776 8.22421 10.7381L8.01512 9.76018ZM6.92871 9.44257C6.88915 9.62759 6.84628 9.82178 6.83606 9.98238C6.82528 10.1519 6.84098 10.4103 7.04871 10.6181L7.75582 9.91097C7.79627 9.95142 7.81916 9.99895 7.82877 10.0362C7.83623 10.0652 7.83222 10.0746 7.83405 10.0458C7.83582 10.018 7.84152 9.97441 7.85454 9.90441C7.86742 9.83514 7.88467 9.75426 7.90661 9.65167L6.92871 9.44257ZM11.1777 6.48911C11.3949 6.70632 11.4311 6.74861 11.4483 6.77838L12.3143 6.27838C12.2147 6.10586 12.0565 5.95369 11.8848 5.782L11.1777 6.48911ZM11.8848 8.16188C12.0565 7.99019 12.2147 7.83802 12.3143 7.6655L11.4483 7.1655C11.4311 7.19527 11.3949 7.23756 11.1777 7.45477L11.8848 8.16188ZM11.4483 6.77838C11.5175 6.89816 11.5175 7.04573 11.4483 7.1655L12.3143 7.6655C12.5621 7.23633 12.5621 6.70756 12.3143 6.27838L11.4483 6.77838ZM11.8848 5.782C11.7131 5.61031 11.5609 5.45207 11.3884 5.35247L10.8884 6.21849C10.9182 6.23568 10.9605 6.27189 11.1777 6.48911L11.8848 5.782ZM10.212 6.48911C10.4292 6.27189 10.4715 6.23568 10.5013 6.21849L10.0013 5.35247C9.82876 5.45207 9.6766 5.61031 9.50491 5.782L10.212 6.48911ZM11.3884 5.35247C10.9592 5.10468 10.4305 5.10468 10.0013 5.35247L10.5013 6.21849C10.6211 6.14934 10.7686 6.14934 10.8884 6.21849L11.3884 5.35247ZM9.24811 9.38435C9.14529 9.48717 9.00171 9.55713 8.78543 9.61234C8.67705 9.64001 8.56079 9.66156 8.42903 9.68433C8.30318 9.70607 8.15631 9.72999 8.01512 9.76018L8.22421 10.7381C8.34037 10.7132 8.45924 10.6939 8.59928 10.6697C8.73341 10.6466 8.8832 10.6195 9.0328 10.5813C9.33247 10.5048 9.67254 10.3741 9.95522 10.0915L9.24811 9.38435ZM7.90661 9.65167C7.9368 9.51048 7.96071 9.36361 7.98246 9.23776C8.00522 9.106 8.02677 8.98974 8.05444 8.88136C8.10966 8.66508 8.17962 8.5215 8.28244 8.41868L7.57534 7.71157C7.29266 7.99425 7.16203 8.33432 7.08552 8.63399C7.04733 8.78358 7.02023 8.93337 6.99706 9.06751C6.97286 9.20755 6.95355 9.32642 6.92871 9.44257L7.90661 9.65167Z"
                        fill="#6A6A6A"
                      />
                      <path
                        d="M4.3335 2V14"
                        stroke="#6A6A6A"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Dikerjakan
                  </div>
                  <div>{dataModalSubCategory.total_soal_answer}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3333 8.12823H12.8333L12.8333 8.12775L12.3333 8.12823ZM3.04486 11.3195L2.6312 11.6004C2.63847 11.6111 2.64615 11.6215 2.65423 11.6316L3.04486 11.3195ZM4.37501 12.9843L4.76564 12.6722H4.76564L4.37501 12.9843ZM3.3562 6.91652L3.01136 6.55447C3.00242 6.56298 2.99381 6.57182 2.98553 6.58096L3.3562 6.91652ZM4.66329 6.3621C4.86325 6.17165 4.87095 5.85516 4.68051 5.6552C4.49006 5.45524 4.17357 5.44753 3.97361 5.63798L4.66329 6.3621ZM2.00346 9.29152L1.50434 9.32117V9.32117L2.00346 9.29152ZM2.03936 8.78374L1.54937 8.68419L2.03936 8.78374ZM12.1389 11.7787L12.6092 11.9482L12.1389 11.7787ZM3.83333 9.00004C3.83333 9.27618 4.05719 9.50004 4.33333 9.50004C4.60948 9.50004 4.83333 9.27618 4.83333 9.00004H3.83333ZM7.83333 7.33337C7.83333 7.60952 8.05719 7.83337 8.33333 7.83337C8.60948 7.83337 8.83333 7.60952 8.83333 7.33337H7.83333ZM8.33333 6.00004V5.50004C8.05719 5.50004 7.83333 5.7239 7.83333 6.00004H8.33333ZM9.83333 8.00004C9.83333 8.27618 10.0572 8.50004 10.3333 8.50004C10.6095 8.50004 10.8333 8.27618 10.8333 8.00004H9.83333ZM10.3333 6.66671L10.4155 6.17351C10.2706 6.14935 10.1223 6.1902 10.0101 6.2852C9.898 6.3802 9.83333 6.51973 9.83333 6.66671H10.3333ZM11.2192 6.81435L11.3014 6.32115L11.2192 6.81435ZM5.83333 7.33337C5.83333 7.60952 6.05719 7.83337 6.33333 7.83337C6.60948 7.83337 6.83333 7.60952 6.83333 7.33337H5.83333ZM4.16667 14.6667C4.16667 14.9429 4.39052 15.1667 4.66667 15.1667C4.94281 15.1667 5.16667 14.9429 5.16667 14.6667H4.16667ZM11.461 12.8975L11.0926 12.5595H11.0926L11.461 12.8975ZM10.4536 14.6667C10.4536 14.9429 10.6774 15.1667 10.9536 15.1667C11.2297 15.1667 11.4536 14.9429 11.4536 14.6667H10.4536ZM2.65423 11.6316L3.98438 13.2964L4.76564 12.6722L3.43549 11.0074L2.65423 11.6316ZM3.70104 7.27858L4.66329 6.3621L3.97361 5.63798L3.01136 6.55447L3.70104 7.27858ZM3.45852 11.0386C3.11665 10.5351 2.88069 10.1866 2.72277 9.89737C2.56936 9.6164 2.51263 9.43107 2.50258 9.26186L1.50434 9.32117C1.52646 9.69352 1.65403 10.0267 1.84507 10.3766C2.0316 10.7182 2.30025 11.1129 2.6312 11.6004L3.45852 11.0386ZM2.98553 6.58096C2.58911 7.01886 2.26762 7.37319 2.03493 7.68605C1.79668 8.00639 1.62363 8.31871 1.54937 8.68419L2.52935 8.8833C2.56318 8.71679 2.64564 8.54057 2.83733 8.28284C3.03457 8.01763 3.31746 7.70434 3.72687 7.25209L2.98553 6.58096ZM2.50258 9.26186C2.49505 9.1351 2.50404 9.0079 2.52935 8.8833L1.54937 8.68419C1.5068 8.89372 1.49166 9.10779 1.50434 9.32117L2.50258 9.26186ZM11.8333 9.2232C11.8333 10.6101 11.8259 11.1724 11.6685 11.6092L12.6092 11.9482C12.8408 11.3058 12.8333 10.5242 12.8333 9.2232H11.8333ZM4.83333 9.00004V2.33337H3.83333V9.00004H4.83333ZM5.83333 2.33337V5.33337H6.83333V2.33337H5.83333ZM5.33333 1.83337C5.60948 1.83337 5.83333 2.05723 5.83333 2.33337H6.83333C6.83333 1.50495 6.16176 0.833374 5.33333 0.833374V1.83337ZM4.83333 2.33337C4.83333 2.05723 5.05719 1.83337 5.33333 1.83337V0.833374C4.50491 0.833374 3.83333 1.50495 3.83333 2.33337H4.83333ZM6.33333 5.83337H7V4.83337H6.33333V5.83337ZM7.83333 6.66671V7.33337H8.83333V6.66671H7.83333ZM7 5.83337C7.46024 5.83337 7.83333 6.20647 7.83333 6.66671H8.83333C8.83333 5.65419 8.01252 4.83337 7 4.83337V5.83337ZM8.83333 6.66671V6.00004H7.83333V6.66671H8.83333ZM8.33333 6.50004H9V5.50004H8.33333V6.50004ZM9.83333 7.33337V8.00004H10.8333V7.33337H9.83333ZM9 6.50004C9.46024 6.50004 9.83333 6.87314 9.83333 7.33337H10.8333C10.8333 6.32085 10.0125 5.50004 9 5.50004V6.50004ZM10.8333 7.33337V6.66671H9.83333V7.33337H10.8333ZM10.2511 7.1599L11.137 7.30755L11.3014 6.32115L10.4155 6.17351L10.2511 7.1599ZM11.137 7.30755C11.5386 7.37447 11.8329 7.72171 11.8333 8.12872L12.8333 8.12775C12.8325 7.23231 12.1848 6.46839 11.3014 6.32115L11.137 7.30755ZM5.83333 5.33337V7.33337H6.83333V5.33337H5.83333ZM4.16667 13.8166V14.6667H5.16667V13.8166H4.16667ZM11.6685 11.6092C11.5406 11.9639 11.3437 12.2858 11.0926 12.5595L11.8295 13.2355C12.1686 12.8659 12.4356 12.43 12.6092 11.9482L11.6685 11.6092ZM10.4536 14.03V14.6667H11.4536V14.03H10.4536ZM11.0926 12.5595C10.758 12.9242 10.4536 13.4296 10.4536 14.03H11.4536C11.4536 13.7754 11.5861 13.5009 11.8295 13.2355L11.0926 12.5595ZM3.98438 13.2964C4.10239 13.4441 4.16667 13.6275 4.16667 13.8166H5.16667C5.16667 13.4007 5.02525 12.9971 4.76564 12.6722L3.98438 13.2964ZM11.8333 8.12823V9.2232H12.8333V8.12823H11.8333Z"
                        fill="#6A6A6A"
                      />
                      <path
                        d="M10 3.00004L14 3.00004M10 3.00004C10 2.53322 11.3295 1.66106 11.6667 1.33337M10 3.00004C10 3.46686 11.3295 4.33902 11.6667 4.66671"
                        stroke="#6A6A6A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Dilewati
                  </div>
                  <div>{dataModalSubCategory.total_dilewati}</div>
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1523_1007)">
                        <path
                          d="M1.3335 14.6667H8.66683C11.9805 14.6667 14.6668 11.9805 14.6668 8.66675C14.6668 5.35304 11.9805 2.66675 8.66683 2.66675C5.57846 2.66675 2.99846 5.00011 2.66683 8.00008"
                          stroke="#6A6A6A"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12.3337 3.66667L13.0003 3M3.66699 3L4.33366 3.66667"
                          stroke="#6A6A6A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.0002 6L9.0406 7.95956M9.0406 7.95956C8.85964 7.7786 8.60964 7.66667 8.3335 7.66667C7.78121 7.66667 7.3335 8.11438 7.3335 8.66667C7.3335 9.21895 7.78121 9.66667 8.3335 9.66667C8.88578 9.66667 9.3335 9.21895 9.3335 8.66667C9.3335 8.39052 9.22157 8.14052 9.0406 7.95956Z"
                          stroke="#6A6A6A"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8.3335 2.33337V1.33337"
                          stroke="#6A6A6A"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 1.33337H9.66667"
                          stroke="#6A6A6A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.3335 10H3.3335"
                          stroke="#6A6A6A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.3335 12.6667L4.66683 12.6667"
                          stroke="#6A6A6A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1523_1007">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Durasi Pengerjaan
                  </div>
                  <div>{dataModalSubCategory.total_soal_answer}</div>
                </div> */}
                <p>
                  Nilai akan di pulikasi setelah penilaian dari tim kami dan
                  dapat dilihat di Menu{" "}
                  <Link
                    href={"/siswa/pengumuman"}
                    style={{
                      color: "#3a9699",
                    }}
                  >
                    Pengumuman
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </LoadingNonFullscreen>
    </Modal>
  );
};
export default ViewSubCategoryModal;
