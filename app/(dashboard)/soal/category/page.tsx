"use client";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DropdownMenu from "@dsarea/@/components/Dropdown/DropdownMenu";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import {
  Card,
  Col,
  Dropdown,
  DropdownProps,
  Input,
  Layout,
  MenuProps,
  Progress,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import Button from "antd/lib/button";
import Column from "antd/lib/table/Column";
import Link from "next/link";

export default function Home() {
  const data = [
    {
      key: "1",
      category: "Brown",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nemo, corrupti ab dolor excepturi aspernatur vero iste sequi eaque, tempore vel rem architecto nihil, aliquam hic voluptate tempora. Provident, laboriosam?",
    },
    {
      key: "2",
      category: "Python Lengkap",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nemo, corrupti ab dolor excepturi aspernatur vero iste sequi eaque, tempore vel rem architecto nihil, aliquam hic voluptate tempora. Provident, laboriosam?",
    },
  ];
  return (
    <div>
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
              <Button type="primary" color="red" icon={<PlusOutlined />}>
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
        >
          <Column
            title="Kategori"
            dataIndex="category"
            key="category"
            width={"20%"}
            render={(text, record) => (
              <Typography className="!text-[#3A9699]">{text}</Typography>
            )}
          />
          <Column title="Deskripsi" dataIndex="description" key="description" />

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
