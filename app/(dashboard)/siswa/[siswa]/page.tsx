"use client";
import {
  CheckCircleFilled,
  CheckOutlined,
  MinusCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DropdownMenu from "@dsarea/@/components/Dropdown/DropdownMenu";
import AddVourcherModal from "@dsarea/@/components/Modals/Voucher/AddVoucherModal";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Empty,
  Input,
  Row,
  Skeleton,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import Button from "antd/lib/button";
import SkeletonButton from "antd/lib/skeleton/Button";
import SkeletonInput from "antd/lib/skeleton/Input";
import Column from "antd/lib/table/Column";
import moment from "moment";
import Link from "next/link";
import React from "react";

export default function Page(props: any) {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const userId = props.params.siswa;

  const { data, isFetching } = useQuery({
    queryKey: ["detail_siswa"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        "/api/users/siswa/list/product/" + userId
      );
      return res.data.data;
    },
    initialData: [
      {
        id: "id",
        name: "test",
        desc: "test",
      },
    ],
  });

  const menu = [
    {
      title: "Siswa",
    },
  ];
  const filteredData = data.filter((e: any) => e.id !== "id");
  return (
    <div>
      <CustomHeader title="Detail Siswa" isSubMenu={true} subMenu={menu} />

      <Card className="!m-6">
        <Space size="middle">
          <Avatar size={64} />
          <div>
            <Space>
              <Typography.Text strong>Dianne Russel</Typography.Text>
              <Tag
                color="#EBF5F5"
                style={{
                  color: "#3A9699",
                  borderRadius: 100,
                }}
              >
                Active
              </Tag>
            </Space>
            <Typography>Russell.tienlapspktnd@gmail.com</Typography>
          </div>
        </Space>
        <div className="border-b w-fit px-4 border-[#3A9699] my-6">
          <Typography className="!text-[#3A9699]">Paket Soal</Typography>
        </div>

        <Row gutter={[24, 24]}>
          {isFetching ? (
            <Col span={6}>
              <Skeleton active />
            </Col>
          ) : filteredData.length == 0 ? (
            <Col span={24}>
              <Empty description="Belum ada paket soal yang dipilih" />
            </Col>
          ) : (
            data.map((e: any, i: any) => (
              <Col xl={6} lg={8} md={12} sm={12} xs={24} key={i}>
                <Card loading={isFetching}>
                  <Typography.Text strong className="!text-xl">
                    {e.nama_product}
                  </Typography.Text>
                  <Typography>
                    Expired at :{" "}
                    {moment(e.expired_at).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                  <Space wrap>
                    <Space>
                      <TimeIcon />
                      <Typography.Text strong style={{ color: "#FDB022" }}>
                        {e.total_duration} min
                      </Typography.Text>
                    </Space>
                    <Space>
                      <Badge color="#3A9699" />
                      Total Pertanyaan : {e.total_soal}
                    </Space>
                  </Space>
                  <div>
                    <Tag
                      color="#EBF5F5"
                      className="!text-[#3A9699] !border !border-[#D0E6E7] !rounded-md !font-bold"
                    >
                      TKP SKD CPNS
                    </Tag>
                  </div>
                  <div>
                    <Typography className="!text-xs !text-[#7A7A71]">
                      Score
                    </Typography>
                    <Typography>{e.score != 0 ? e.score : "-"}</Typography>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Card>
    </div>
  );
}
