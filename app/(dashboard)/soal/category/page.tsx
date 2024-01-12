"use client";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DropdownMenu from "@dsarea/@/components/Dropdown/DropdownMenu";
import AddCategoryModal from "@dsarea/@/components/Modals/AddCategoryModal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Input, Row, Space, Table, Typography } from "antd";
import Button from "antd/lib/button";
import Column from "antd/lib/table/Column";
import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React from "react";

export default function Category() {
  const [openAddModal, setOpenAddModal] = React.useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/soal/category/list");
      return res.data.data;
    },
    initialData: [],
  });

  console.log(isLoading);

  return (
    <div>
      <AddCategoryModal
        onCancel={() => setOpenAddModal(false)}
        onCreate={() => {}}
        open={openAddModal}
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
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
          }}
          loading={isLoading}
          rowKey={"id"}
        >
          <Column
            title="Kategori"
            dataIndex="name"
            key="name"
            width={"20%"}
            render={(text, record) => (
              <Typography className="!text-[#3A9699]">{text}</Typography>
            )}
          />
          <Column title="Deskripsi" dataIndex="desc" key="desc" />

          <Column
            title="Action"
            dataIndex="action"
            key="action"
            render={(text, record) => <DropdownMenu />}
          />
        </Table>
      </Card>
    </div>
  );
}
