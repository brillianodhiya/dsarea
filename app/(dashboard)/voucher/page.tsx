"use client";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import AddVourcherModal from "@dsarea/@/components/Modals/Voucher/AddVoucherModal";
import EditVoucherModal from "@dsarea/@/components/Modals/Voucher/EditVoucherModal";
import ViewVoucherModal from "@dsarea/@/components/Modals/Voucher/ViewVoucherModal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  Col,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import Button from "antd/lib/button";
import SkeletonButton from "antd/lib/skeleton/Button";
import SkeletonInput from "antd/lib/skeleton/Input";
import Column from "antd/lib/table/Column";
import { Eye, PencilLine } from "lucide-react";
import moment from "moment";
import React from "react";

export default function Page() {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState({
    id: 0,
    name: "",
    code: "",
    kuota: "",
    expired_at: moment(),
    diskon: "",
  });
  const [loading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = React.useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["voucher"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/voucher/list");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        name: "",
        code: "",
        kuota: "",
        expired_at: moment(),
        diskon: "",
      },
    ],
  });

  return (
    <div>
      <AddVourcherModal
        open={openAddModal}
        onCreate={async (values) => {
          try {
            setLoading(true);
            const res = await axiosClientInstance.post("/api/voucher/create", {
              name: values.name,
              code: values.code,
              kuota: values.kuota,
              expired_at: values.expired_at?.format("YYYY-MM-DD HH:mm:ss"),
              diskon: values.diskon,
            });
            queryClient.invalidateQueries({
              queryKey: ["voucher"],
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
        onCancel={() => setOpenAddModal(false)}
      />
      <ViewVoucherModal
        onCancel={() => setOpenViewModal(false)}
        onSubmit={() => setOpenViewModal(false)}
        data={dataSelected}
        open={openViewModal}
        loading={loading}
        onEdit={() => setOpenEditModal(true)}
      />
      <EditVoucherModal
        onCancel={() => setOpenEditModal(false)}
        onCreate={async (values) => {
          try {
            setLoading(true);
            const res = await axiosClientInstance.patch(
              "/api/voucher/edit/" + dataSelected.id,
              {
                name: values.name,
                // code: values.code,
                kuota: values.kuota,
                expired_at: values.expired_at?.format("YYYY-MM-DD HH:mm:ss"),
                diskon: values.diskon,
              }
            );
            queryClient.invalidateQueries({
              queryKey: ["voucher"],
            });
            setLoading(false);
            message.success(`${res.data.message}`);
            setOpenEditModal(false);
            setOpenViewModal(false);
          } catch (error) {
            setLoading(false);
            message.error(
              `${(error as any).response.data.message} : ${
                (error as any).response.data.data
              }`
            );
            console.log(error);
          }
        }}
        open={openEditModal}
        loading={loading}
        initialValues={
          {
            name: dataSelected.name,
            code: dataSelected.code,
            kuota: dataSelected.kuota,
            expired_at: moment(dataSelected.expired_at),
            diskon: dataSelected.diskon,
          } as any
        }
      />
      <CustomHeader title="Voucher" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Voucher
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
              <Button
                type="primary"
                onClick={() => setOpenAddModal(true)}
                color="red"
                icon={<PlusOutlined />}
              >
                Buat Voucher
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
            x: 1200,
          }}
        >
          <Column
            title="Nama Voucher"
            dataIndex="name"
            key="name"
            width={"20%"}
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography className="!text-[#3A9699]">{text}</Typography>
              )
            }
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => {
                    return a.name.localeCompare(b.name);
                  }
            }
          />
          <Column
            title="Code Voucher"
            dataIndex="code"
            key="code"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography.Paragraph copyable className="!p-0 !m-0">
                  {text}
                </Typography.Paragraph>
              )
            }
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => {
                    return a.code.localeCompare(b.code);
                  }
            }
          />
          <Column
            title="Quota"
            dataIndex="kuota"
            key="kuota"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
            }
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => {
                    return a.kuota - b.kuota;
                  }
            }
          />
          <Column
            title="Sisa Quota"
            dataIndex="sisa_kuota"
            key="sisa_kuota"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
            }
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => {
                    return a.sisa_kuota - b.sisa_kuota;
                  }
            }
          />
          <Column
            title="Expired at"
            dataIndex="expired_at"
            key="expired_at"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography>
                  {moment(text).format("DD/MM/YYYY HH:mm")}
                </Typography>
              )
            }
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => {
                    return (
                      moment(a.expired_at).unix() - moment(b.expired_at).unix()
                    );
                  }
            }
          />
          <Column
            title="Diskon"
            dataIndex="diskon"
            key="diskon"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <div>{text}%</div>
              )
            }
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => {
                    return a.diskon - b.diskon;
                  }
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
                <>
                  <Tag color={text == "expired" ? "red" : "green"}>{text}</Tag>
                </>
              )
            }
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => {
                    return a.status.localeCompare(b.status);
                  }
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
                  itemLists={
                    record.status == "active"
                      ? [
                          {
                            label: "View",
                            key: "1",
                            icon: <Eye size={17} />,
                          },
                          {
                            label: "Edit",
                            key: "2",
                            icon: <PencilLine size={17} />,
                          },
                        ]
                      : [
                          {
                            label: "View",
                            key: "1",
                            icon: <Eye size={17} />,
                          },
                        ]
                  }
                  onClick={(ev) => {
                    // console.log(ev, "EV");
                    if (ev.key == 1) {
                      setOpenViewModal(true);
                      setDataSelected(record);
                    } else if (ev.key == 2) {
                      setOpenEditModal(true);
                      setDataSelected(record);
                    }
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
