"use client";
import { SearchOutlined } from "@ant-design/icons";
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
      product: "Try Out",
      category: "Brown",
      date: 32,
      siswa: 90,
      status: 70,
      soal: 99,
    },
    {
      key: "2",
      product: "SPSS",
      category: "Python Lengkap",
      date: 32,
      siswa: 90,
      status: 100,
      soal: 99,
    },
    {
      key: "3",
      product: "John",
      category: "Brown",
      date: 32,
      siswa: 90,
      status: 50,
      soal: 99,
    },
    {
      key: "4",
      product: "John",
      category: "Brown",
      date: 32,
      siswa: 90,
      status: 10,
      soal: 99,
    },
  ];
  return (
    <div>
      <CustomHeader title="Penilaian" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Kategori Soal
            </Typography.Text>
          </Col>
          <Col>
            <Input
              placeholder="Search anything..."
              suffix={<SearchOutlined />}
              className="!w-[250px]"
            />
          </Col>
        </Row>
        <Table
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
          }}
        >
          <Column
            title="Product"
            dataIndex="product"
            key="product"
            render={(text, record: any) => (
              <Link
                href={"/penilaian/" + record.product}
                className="!text-[#3A9699]"
              >
                {text}
              </Link>
            )}
          />
          <Column
            title="Kategori"
            dataIndex="category"
            key="category"
            render={(text, record) => (
              <Typography className="!text-[#3A9699]">{text}</Typography>
            )}
          />
          <Column title="Tanggal" dataIndex="date" key="date" />
          <Column title="Jml. Soal" dataIndex="soal" key="soal" />
          <Column title="Jml. Siswa" dataIndex="siswa" key="siswa" />
          <Column
            title="Status Penilaian"
            dataIndex="status"
            key="status"
            render={(text, record) => <Progress percent={text} />}
          />
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
