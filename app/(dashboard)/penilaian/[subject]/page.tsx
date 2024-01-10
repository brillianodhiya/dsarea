"use client";
import { SearchOutlined } from "@ant-design/icons";
import DropdownMenu from "@dsarea/@/components/Dropdown/DropdownMenu";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import {
  Badge,
  Card,
  Col,
  Input,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import Column from "antd/es/table/Column";
import Button from "antd/lib/button";
import { CalendarIcon, Link } from "lucide-react";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const pahtname = usePathname();
  console.log(pahtname);
  const router = useRouter();
  const submenu = [
    {
      title: "Home",
    },
    {
      title: "Sub Menu",
      // href: "",
    },
  ];
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
      <CustomHeader title="Sub Menu" isSubMenu={true} subMenu={submenu} />
      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col span={24}>
            <Space>
              <Typography.Text strong className="!text-xl">
                Result : Try Out
              </Typography.Text>
              <Tag
                color="#EBF5F5"
                style={{
                  borderRadius: 100,
                }}
              >
                <Typography
                  style={{
                    color: "#3A9699",
                  }}
                >
                  TKP SKD CPNS
                </Typography>
              </Tag>
            </Space>
          </Col>
          <Col>
            <Typography>Expired at : Unlimited</Typography>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Space>
                <TimeIcon />
                <Typography.Text strong style={{ color: "#FDB022" }}>
                  90 min
                </Typography.Text>
              </Space>
              <Space>
                <CalendarIcon size={16} />
                {moment().format("DD/MM/YYYY")}
              </Space>
              <Space>
                <Badge color="#3A9699" />
                Total Pertanyaan : 90
              </Space>
            </div>
          </Col>
          <Col>
            <Button type="primary" disabled style={{ borderWidth: 0 }}>
              Publish Hasil Penilaian
            </Button>
            <Typography>9 dari 79 siswa telah di nilai</Typography>
          </Col>
        </Row>
        <Table
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
          }}
        >
          <Column
            title="Nama Siswa"
            dataIndex="category"
            key="category"
            render={(text, record: any) => (
              <Button
                type="link"
                onClick={() => router.push(`${pahtname}/user`)}
              >
                {text}
              </Button>
            )}
          />
          <Column title="Total Score" dataIndex="score" key="score" />
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
