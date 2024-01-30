"use client";
import {
  CheckCircleFilled,
  MinusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Col, Input, Row, Space, Table, Typography } from "antd";
import SkeletonButton from "antd/lib/skeleton/Button";
import SkeletonInput from "antd/lib/skeleton/Input";
import Column from "antd/lib/table/Column";
import { Eye } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const [searchText, setSearchText] = React.useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["Siswa"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/users/list?role_id=3");
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
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Space>
          </Col>
        </Row>

        <Table
          dataSource={searchFromValue(data, searchText)}
          pagination={{
            hideOnSinglePage: true,
          }}
          rowKey={"id"}
          size="middle"
          scroll={{
            x: 1000,
          }}
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
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => a.name.localeCompare(b.name)
            }
          />
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => a.email.localeCompare(b.email)
            }
          />

          <Column
            title="Last Access"
            dataIndex="role"
            key="role"
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <div>
                  {moment(record.last_access).format("DD/MM/YYYY HH:mm")}
                </div>
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) =>
                    moment(a.last_access).unix() - moment(b.last_access).unix()
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
                      {" Active"}
                    </>
                  ) : (
                    <>
                      <MinusCircleFilled className="!text-[#F04438] text-[10px]" />
                      {" Inactive"}
                    </>
                  )}
                </Typography>
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => a.status.localeCompare(b.status)
            }
          />

          <Column
            title="Action"
            dataIndex="action"
            key="action"
            fixed="right"
            width={80}
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonButton active />
              ) : (
                <DropdownMenuAction
                  itemLists={[
                    {
                      label: "View",
                      key: "1",
                      icon: <Eye size={17} />,
                    },
                  ]}
                  onClick={(e) => {
                    const data = JSON.stringify({
                      name: record.name,
                      picture: record.picture,
                      status: record.status,
                      email: record.email,
                    });
                    router.push("/siswa/" + record.id);
                    localStorage.setItem("siswaData", data);
                  }}
                />
              )
            }
          />
        </Table>
      </Card>
    </div>
  );
}
