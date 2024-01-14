"use client";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import AddCategoryModal from "@dsarea/@/components/Modals/Category/AddCategoryModal";
import EditCategoryModal from "@dsarea/@/components/Modals/Category/EditCategoryModal";
import ViewCategoryModal from "@dsarea/@/components/Modals/Category/ViewCategoryModal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Input, Row, Space, Table, Typography, message } from "antd";
import Button from "antd/lib/button";
import SkeletonButton from "antd/lib/skeleton/Button";
import SkeletonInput from "antd/lib/skeleton/Input";
import Column from "antd/lib/table/Column";
import React from "react";

export default function Category() {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState({
    id: 0,
    name: "",
    desc: "",
  });
  const [countFetch, setCountFetch] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ["category", countFetch],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/soal/category/list");
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
      <AddCategoryModal
        onCancel={() => setOpenAddModal(false)}
        onCreate={async (values) => {
          try {
            setLoading(true);
            const res = await axiosClientInstance.post(
              "/api/soal/category/create",
              {
                name: values.title,
                desc: values.description,
              }
            );
            setCountFetch(countFetch + 1);
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
        open={openAddModal}
        loading={loading}
      />
      <EditCategoryModal
        onCancel={() => setOpenEditModal(false)}
        onCreate={async (values) => {
          try {
            setLoading(true);
            const res = await axiosClientInstance.patch(
              "/api/soal/category/change/status/" + dataSelected.id,
              {
                name: values.title,
                desc: values.description,
              }
            );
            setCountFetch(countFetch + 1);
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
            title: dataSelected.name,
            description: dataSelected.desc,
          } as any
        }
      />
      <ViewCategoryModal
        onCancel={() => setOpenViewModal(false)}
        onSubmit={() => setOpenViewModal(false)}
        data={dataSelected}
        open={openViewModal}
        loading={loading}
        onEdit={() => setOpenEditModal(true)}
      />
      <CustomHeader title="Soal" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              Kategori
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
                Add Kategori
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
        >
          <Column
            title="Kategori"
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
          />
          <Column
            title="Deskripsi"
            dataIndex="desc"
            key="desc"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
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
                <DropdownMenuAction
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
