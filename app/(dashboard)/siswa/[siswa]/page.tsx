"use client";
import {
  CheckCircleFilled,
  CheckOutlined,
  MinusCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DropdownMenu from "@dsarea/@/components/Dropdown/DropdownMenu";
import AddVourcherModal from "@dsarea/@/components/Modals/AddVoucherModal";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Input,
  Row,
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

export default function Page() {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const isFetching = false;

  // const { data, isFetching } = useQuery({
  //   queryKey: ["category"],
  //   queryFn: async () => {
  //     const res = await axiosClientInstance.get("/api/soal/category/list");
  //     return res.data.data;
  //   },
  //   initialData: [
  //     {
  //       id: 0,
  //       name: "test",
  //       desc: "test",
  //     },
  //   ],
  // });
  const data = [
    {
      id: "0",
      name: "name",
      email: "name@mail.com",
      qouta: 0,
      expired: 9,
      diskon: 10,
      status: "active",
    },
    {
      id: "1",
      name: "name",
      email: "name@mail.com",
      qouta: 0,
      expired: 9,
      diskon: 10,
      status: "inactive",
    },
  ];

  const menu = [
    {
      title: "Siswa",
    },
  ];
  return (
    <div>
      <CustomHeader title="Detail Siswa" isSubMenu={true} subMenu={menu} />

      <Card className="!m-6">
        <Space align="start" size="middle">
          <Avatar size={64} />
          <Space direction="vertical">
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
            <Typography>+62 819 0707 7070 </Typography>
          </Space>
        </Space>
        <div className="border-b w-fit px-4 border-[#3A9699] my-6">
          <Typography className="!text-[#3A9699]">Paket Soal</Typography>
        </div>

        <Row gutter={[24, 24]}>
          {/* {[...Array(5)].map((e, i) => ( */}
          <Col xl={6} lg={8} md={12} sm={12} xs={24}>
            <Card>
              <Typography.Text strong className="!text-xl">
                Try Out
              </Typography.Text>
              <Typography>Expired at : Unlimited</Typography>
              <Space wrap>
                <Space>
                  <TimeIcon />
                  <Typography.Text strong style={{ color: "#FDB022" }}>
                    90 min
                  </Typography.Text>
                </Space>
                <Space>
                  <Badge color="#3A9699" />
                  Total Pertanyaan : 90
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
                <Typography>-</Typography>
              </div>
            </Card>
          </Col>
          {/* ))} */}
        </Row>
      </Card>
    </div>
  );
}
