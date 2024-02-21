"use client";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
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
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
interface DataType {
  key: React.Key;
  name: string;
  score: string;
  status: string;
  category: any[];
}

interface ExpandedDataType {
  id: React.Key;
  name: string;
  score: string;
  status: string;
  category: any[];
}

export default function Page(props: any) {
  const pahtname = usePathname();
  const subject = props.searchParams.soal ?? "-";
  const submenu = [
    {
      title: subject,
    },
  ];
  const { data, isFetching } = useQuery({
    queryKey: ["penilaian"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        `/api/penilaian/detail/${props.params.subject}`
      );
      return res.data.data;
    },
    initialData: [],
  });

  const [isComplete, setIsComplete] = React.useState(false);

  // cari apakah persentase_penilaian sudah tidak ada yang di bawah 100
  React.useEffect(() => {
    if (data.length > 0) {
      const isComplete = data.every((e: any) => e.presentase_penilaian == 100);
      setIsComplete(isComplete);
    }
  }, [data]);

  const expandedRowRender = (record: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: subject,
        dataIndex: "category_title",
        key: "category_title",
        width: "31%",
      },
      {
        title: "Score",
        dataIndex: "category_score",
        key: "category_score",
        width: "41%",
      },
      {
        title: "Status",
        key: "category_presentase_penilaian",
        dataIndex: "category_presentase_penilaian",
        render: (text, record2: any) => (
          <div className="flex items-center">
            <Progress percent={Math.round(parseFloat(text))} />

            <Tag
              color="#EBF5F5"
              style={{
                borderRadius: 100,
              }}
            >
              <Link
                href={`${pahtname}/${record2.sub_id}?soal=${subject}&sub_category_id=${record2.sub_id}&user_id=${record2.user_id}&category_id=${record2.category_id}`}
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

    // const data = [];
    // for (let i = 0; i < 3; ++i) {
    //   data.push({
    //     id: i.toString(),
    //     name: "This is production name",
    //     status: "90",
    //     score: "80",
    //   });
    // }
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={record.category}
        pagination={false}
      />
    );
  };

  const columns: TableColumnsType<DataType> = [
    { title: "name", dataIndex: "name", key: "name", width: "30%" },
    { title: "Total Score", dataIndex: "score", key: "score", width: "40%" },
    {
      title: "status",
      dataIndex: "presentase_penilaian",
      key: "presentase_penilaian",
      render: (text, record) => (
        <Progress percent={Math.round(parseFloat(text))} />
      ),
    },
  ];

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
              {/* <Tag
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
              </Tag> */}
            </Space>
          </Col>
          <Col>
            <Typography>
              Expired at :{" "}
              {data.length > 0
                ? dayjs(data[0].expired_date).format("DD/MM/YYYY HH:mm:ss")
                : ""}
            </Typography>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {/* <Space>
                <TimeIcon />
                <Typography.Text strong style={{ color: "#FDB022" }}>
                  90 min
                </Typography.Text>
              </Space> */}
              <Space>
                <CalendarIcon size={16} />
                {data.length > 0
                  ? moment(data[0].start_date).format("DD/MM/YYYY")
                  : ""}
              </Space>
              <Space>
                <Badge color="#3A9699" />
                Total Pertanyaan : {data.length > 0 ? data[0].total_soal : 0}
              </Space>
            </div>
          </Col>
          <Col>
            {isComplete ? (
              <Button type="primary" style={{ borderWidth: 0 }}>
                Publish Hasil Penilaian
              </Button>
            ) : (
              <Button disabled style={{ borderWidth: 0 }}>
                Publish Hasil Penilaian
              </Button>
            )}

            <Typography>
              {data.length > 0 ? data[0].jumlah_penilaian : 0}i
            </Typography>
          </Col>
        </Row>
        <Table
          size="middle"
          columns={columns}
          expandable={{
            expandedRowRender,
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <DownOutlined
                  onClick={(e) => {
                    onExpand(record, e);
                  }}
                />
              ) : (
                <RightOutlined
                  onClick={(e) => {
                    console.log(record, "record");
                    onExpand(record, e);
                  }}
                />
              ),
          }}
          dataSource={data}
          scroll={{
            x: 1000,
          }}
          loading={isFetching}
        />
      </Card>
    </div>
  );
}
