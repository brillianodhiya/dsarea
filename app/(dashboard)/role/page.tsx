"use client";
import {
  CheckCircleFilled,
  MinusCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Col, Input, Row, Space, Table, Typography } from "antd";
import Button from "antd/lib/button";
import SkeletonButton from "antd/lib/skeleton/Button";
import SkeletonInput from "antd/lib/skeleton/Input";
import Column from "antd/lib/table/Column";
import React from "react";

export default function Page() {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const { data, isFetching } = useQuery({
    queryKey: ["Role"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/users/list?role_id=1,2");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        name: "test",
        desc: "test",
      },
    ],
  });

  return (
    <div>
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
            title="Nama Siswa"
            dataIndex="name"
            key="name"
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Space>
                  <Avatar size={"small"} src={record.picture} />
                  <Typography className="!text-[#3A9699]">{text}</Typography>
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
            title="Role"
            dataIndex="role"
            key="role"
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography className="capitalize">
                  {record.ds_user_role.name}
                </Typography>
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
                  {text == true ? (
                    <>
                      <CheckCircleFilled className="!text-[#32D583]" />
                      {" Active"}
                    </>
                  ) : (
                    <>
                      <MinusCircleFilled className="!text-[#F04438]" />
                      {" Inactive"}
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
              isFetching ? (
                <SkeletonButton active />
              ) : (
                <DropdownMenuAction itemLists={[]} />
              )
            }
          />
        </Table>
      </Card>
    </div>
  );
}
