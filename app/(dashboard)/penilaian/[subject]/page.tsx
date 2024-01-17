"use client";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import {
  Badge,
  Card,
  Col,
  Progress,
  Row,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import Button from "antd/lib/button";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface DataType {
  key: React.Key;
  name: string;
  score: string;
  status: string;
}

interface ExpandedDataType {
  id: React.Key;
  name: string;
  score: string;
  status: string;
}

export default function Page(props: any) {
  const pahtname = usePathname();
  console.log(pahtname);
  const subject = props.searchParams.soal ?? "-";
  const submenu = [
    {
      title: subject,
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     product: "Try Out",
  //     category: "Brown",
  //     date: 32,
  //     siswa: 90,
  //     status: 70,
  //     soal: 99,
  //   },
  //   {
  //     key: "2",
  //     product: "SPSS",
  //     category: "Python Lengkap",
  //     date: 32,
  //     siswa: 90,
  //     status: 100,
  //     soal: 99,
  //   },
  //   {
  //     key: "3",
  //     product: "John",
  //     category: "Brown",
  //     date: 32,
  //     siswa: 90,
  //     status: 50,
  //     soal: 99,
  //   },
  //   {
  //     key: "4",
  //     product: "John",
  //     category: "Brown",
  //     date: 32,
  //     siswa: 90,
  //     status: 10,
  //     soal: 99,
  //   },
  // ];

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: subject, dataIndex: "name", key: "name", width: "31%" },
      { title: "Score", dataIndex: "score", key: "score", width: "41%" },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
        render: (text, record) => (
          <div className="flex items-center">
            <Progress percent={text} />
            <Tag
              color="#EBF5F5"
              style={{
                borderRadius: 100,
              }}
            >
              <Link
                href={`${pahtname}/${record.id}?soal=${subject}&sub_category_id=${record.id}`}
                style={{
                  color: "#3A9699",
                }}
              >
                Beri Nilai
              </Link>
            </Tag>
          </div>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        id: i.toString(),
        name: "This is production name",
        status: "90",
        score: "80",
      });
    }
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns: TableColumnsType<DataType> = [
    { title: "name", dataIndex: "name", key: "name", width: "30%" },
    { title: "Total Score", dataIndex: "score", key: "score", width: "40%" },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => <Progress percent={text} />,
    },
  ];

  const data2: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data2.push({
      key: i.toString(),
      name: "Screen",
      score: "80",
      status: "100",
    });
  }
  console.log(props.searchParams.soal);

  return (
    <div>
      <CustomHeader title={subject} isSubMenu={true} subMenu={submenu} />
      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col span={24}>
            <Space>
              <Typography.Text strong className="!text-xl">
                Penilaian : {subject}
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
        {/* <Table
          size="middle"
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
        </Table> */}
        <Table
          size="middle"
          columns={columns}
          expandable={{
            expandedRowRender,
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <DownOutlined onClick={(e) => onExpand(record, e)} />
              ) : (
                <RightOutlined onClick={(e) => onExpand(record, e)} />
              ),
          }}
          dataSource={data2}
        />
      </Card>
    </div>
  );
}
