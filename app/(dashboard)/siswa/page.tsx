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
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Col, Input, Row, Space, Table, Typography } from "antd";
import Button from "antd/lib/button";
import SkeletonButton from "antd/lib/skeleton/Button";
import SkeletonInput from "antd/lib/skeleton/Input";
import Column from "antd/lib/table/Column";
import moment from "moment";
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

  return (
    <div>
      <CustomHeader title="Siswa" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Siswa
            </Typography.Text>
          </Col>
          <Col>
            <Space wrap>
              <Input
                placeholder="Search anything..."
                suffix={<SearchOutlined />}
                className="!w-[250px]"
              />
            </Space>
          </Col>
        </Row>

        <Table
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
          }}
          rowKey={"id"}
          size="middle"
        >
          <Column
            title="Nama Siswa"
            dataIndex="name"
            key="name"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Space>
                  <Avatar size={"small"} />
                  {text}
                </Space>
              )
            }
          />
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
            }
          />

          <Column
            title="Last Login"
            dataIndex="role"
            key="role"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <div>{moment().format("DD/MM/YYYY HH:mm")}</div>
              )
            }
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography className="capitalize">
                  {text == "active" ? (
                    <>
                      <CheckCircleFilled className="!text-[#32D583] text-[10px]" />
                      {" " + text}
                    </>
                  ) : (
                    <>
                      <MinusCircleFilled className="!text-[#F04438] text-[10px]" />
                      {" " + text}
                    </>
                  )}
                </Typography>
              )
            }
          />

          <Column
            title="Action"
            dataIndex="action"
            key="action"
            render={(text, record) =>
              isFetching ? <SkeletonButton active /> : <DropdownMenu />
            }
          />
        </Table>
      </Card>
    </div>
  );
}
