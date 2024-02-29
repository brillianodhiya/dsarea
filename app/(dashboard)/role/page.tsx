"use client";
import {
  CheckCircleFilled,
  ExclamationCircleOutlined,
  MinusCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import AddRoleModal from "@dsarea/@/components/Modals/Role/AddRoleModal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import Button from "antd/lib/button";
import SkeletonButton from "antd/lib/skeleton/Button";
import SkeletonInput from "antd/lib/skeleton/Input";
import Column from "antd/lib/table/Column";
import React from "react";

export default function Page() {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = React.useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["list-user-role"],
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

  const handleChangeSiswa = (id: any) => {
    Modal.confirm({
      title: "Perhatian!!",
      icon: <ExclamationCircleOutlined />,
      content: "Apakah anda yakin ingin mengembalikan akun ini menjadi siswa?",
      onOk: async () => {
        try {
          setLoading(true);
          const res = await axiosClientInstance.put("/api/users/change/role", {
            id: id,
            role_id: 3,
          });
          queryClient.invalidateQueries({
            queryKey: ["list-user-role"],
          });
          setLoading(false);
          message.success(`${res.data.message}`);
          setOpenAddModal(false);
        } catch (error) {
          setLoading(false);
          message.error(
            `${(error as any).response.data.message} : ${
              (error as any).response.data.data
            }`
          );
        }
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <AddRoleModal
        open={openAddModal}
        onCancel={() => {
          setOpenAddModal(false);
        }}
        onCreate={async (value: any) => {
          try {
            setLoading(true);
            const res = await axiosClientInstance.put(
              "/api/users/change/role",
              value
            );
            queryClient.invalidateQueries({
              queryKey: ["Role"],
            });
            setLoading(false);
            message.success(`${res.data.message}`);
            setOpenAddModal(false);
          } catch (error) {
            setLoading(false);
            message.error(
              `${(error as any).response.data.message} : ${
                (error as any).response.data.data
              }`
            );
          }
        }}
        loading={loading}
      />
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
                className="!w-[calc(100%-30px)]"
                onChange={(e) => setSearchText(e.target.value)}
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
                ? false
                : (a: any, b: any) => a.name.length - b.name.length
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
                ? false
                : (a: any, b: any) => a.email.length - b.email.length
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
                  {record?.ds_user_role?.name}
                </Typography>
              )
            }
            sorter={
              isFetching
                ? false
                : (a: any, b: any) =>
                    a.ds_user_role.name.length - b.ds_user_role.name.length
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
                ? false
                : (a: any, b: any) => a.status.length - b.status.length
            }
          />

          <Column
            title="Action"
            dataIndex="action"
            key="action"
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonButton active />
              ) : (
                <Button onClick={() => handleChangeSiswa(record.id)}>
                  Transfer Ke Siswa
                </Button>
              )
            }
            // fixed="right"
            // width={80}
          />
        </Table>
      </Card>
    </div>
  );
}
