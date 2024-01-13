"use client";
import {
  CheckCircleFilled,
  CheckOutlined,
  MinusCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DropdownMenu from "@dsarea/@/components/Dropdown/DropdownMenu";
import AddCategoryModal from "@dsarea/@/components/Modals/AddCategoryModal";
import AddVourcherModal from "@dsarea/@/components/Modals/AddVoucherModal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Input, Row, Space, Table, Typography } from "antd";
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
      voucher: "name",
      qouta: 0,
      expired: 9,
      diskon: 10,
      status: "active",
    },
    {
      id: "1",
      name: "name",
      voucher: "name",
      qouta: 0,
      expired: 9,
      diskon: 10,
      status: "inactive",
    },
  ];

  return (
    <div>
      {/* <AddVourcherModal
        open={openAddModal}
        onCreate={() => {}}
        onCancel={() => setOpenAddModal(false)}
      /> */}
      <CustomHeader title="User Role" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List User
            </Typography.Text>
          </Col>
          <Col>
            <Space wrap>
              <Input
                placeholder="Search anything..."
                suffix={<SearchOutlined />}
                className="!w-[250px]"
              />
              <Button
                type="primary"
                onClick={() => setOpenAddModal(true)}
                color="red"
                icon={<PlusOutlined />}
              >
                Tambah User Role
              </Button>
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
            title="Name"
            dataIndex="name"
            key="name"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
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
            title="Role"
            dataIndex="role"
            key="role"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <div>{text}</div>
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
                      <CheckCircleFilled className="!text-[#32D583]" />
                      {" " + text}
                    </>
                  ) : (
                    <>
                      <MinusCircleFilled className="!text-[#F04438]" />
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
