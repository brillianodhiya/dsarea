"use client";
import { SearchOutlined } from "@ant-design/icons";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { Card, Col, Input, Progress, Row, Table, Typography } from "antd";
import Column from "antd/lib/table/Column";
import { Eye } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const [searchText, setSearchText] = React.useState("");

  const data = [
    {
      id: "1",
      product: "Try Out",
      tanggal: "Brown",
      date: 32,
      siswa: 90,
      status: 70,
      soal: 99,
    },
    {
      id: "2",
      product: "SPSS",
      tanggal: "Python Lengkap",
      date: 32,
      siswa: 90,
      status: 100,
      soal: 99,
    },
    {
      id: "3",
      product: "John",
      tanggal: "Brown",
      date: 32,
      siswa: 90,
      status: 50,
      soal: 99,
    },
    {
      id: "4",
      product: "John",
      tanggal: "Brown",
      date: 32,
      siswa: 90,
      status: 10,
      soal: 99,
    },
  ];
  const router = useRouter();

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
              className="!w-[calc(100%-30px)]"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
        </Row>
        <Table
          dataSource={searchFromValue(data, searchText)}
          pagination={{
            hideOnSinglePage: true,
          }}
          scroll={{
            x: 1000,
          }}
        >
          <Column
            title="Product"
            dataIndex="product"
            key="product"
            render={(text, record: any) => (
              <Typography className="!text-[#3A9699]">{text}</Typography>
            )}
            sorter={(a, b) => {
              return a.product.localeCompare(b.product);
            }}
          />
          <Column
            title="Tanggal"
            dataIndex="tanggal"
            key="tanggal"
            render={(text, record) => (
              <Typography>{moment().format("DD/MM/YYYY HH:mm")}</Typography>
            )}
            sorter={(a: any, b: any) =>
              moment(a.tanggal_transaksi).unix() -
              moment(b.tanggal_transaksi).unix()
            }
          />
          <Column
            title="Jml. Soal"
            dataIndex="soal"
            key="soal"
            sorter={(a: any, b: any) => a.soal - b.soal}
          />
          <Column
            title="Jml. Siswa"
            dataIndex="siswa"
            key="siswa"
            sorter={(a: any, b: any) => a.siswa - b.siswa}
          />
          <Column
            title="Status Penilaian"
            dataIndex="status"
            key="status"
            render={(text, record) => <Progress percent={text} />}
            sorter={(a: any, b: any) => a.status - b.status}
          />
          <Column
            title="Action"
            dataIndex="action"
            key="action"
            render={(text, record: any) => (
              <DropdownMenuAction
                itemLists={[
                  {
                    label: "View",
                    key: "1",
                    icon: <Eye size={17} />,
                  },
                ]}
                onClick={() => {
                  router.push(
                    "/penilaian/" + record.id + "?soal=" + record.product
                  );
                }}
              />
            )}
          />
        </Table>
      </Card>
    </div>
  );
}
