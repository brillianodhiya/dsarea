"use client";
import { CalendarOutlined } from "@ant-design/icons";
import DurationIcon from "@dsarea/@/components/icons/DurationIcon";
import NoteIcon from "@dsarea/@/components/icons/NoteIcon";
import SwipeIcon from "@dsarea/@/components/icons/SwipeIcon";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import {
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
const { Column } = Table;

type HeaderProps = {
  data: {
    id: number;
    expired_at: string;
    nama_product: string;
    harga: number;
    category_name: string[];
    total_duration: string;
    score: number;
    benefit: string;
    desc: string;
    total_soal: number;
    total_jawab: number;
    sub_category: {
      category_id: number;
      product_id: number;
      sub_id: number;
      title: string;
      category_name: string;
      duration: string;
      score: number;
      status: string;
    }[];
  };
};

const ContainerDetailLatihanSoal: React.FC<HeaderProps> = ({
  data: dataInitial,
}) => {
  const data = [
    {
      id: 0,
      title: "Test",
      kategori: "TKP",
      duration: 30,
      score: 30,
      status: "expired",
    },
    {
      id: 0,
      title: "Test",
      kategori: "TKP",
      duration: 30,
      score: 30,
      status: "active",
    },
  ];
  return (
    <>
      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap gutter={[24, 24]}>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Typography.Text strong className="!text-xl">
              Penilaian : Try Outs
            </Typography.Text>
            <div className="flex items-center gap-x-2">
              <Tag>Matematika</Tag>
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
            </div>
            <div>
              <Typography>
                Expired at : {moment().format("DD/MM/YYYY HH:mm")}
              </Typography>
            </div>
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
                <CalendarOutlined />
                {moment().format("DD/MM/YYYY")}
              </Space>

              <Space>
                <Badge color="#3A9699" />
                Total Pertanyaan : 90
              </Space>
            </div>
          </Col>
          <Col>
            <Typography>Tanggal Pengerjaan</Typography>
            <Space>
              <CalendarOutlined
                style={{
                  color: "#FDB022",
                }}
              />
              {moment().format("DD/MM/YYYY HH:mm")}
            </Space>
          </Col>
          <Col>
            <div className="bg-[#EBF5F5] rounded-md p-2">
              Total Score
              <Typography.Paragraph strong>223</Typography.Paragraph>
            </div>
            <div>Peringkat : 30/40 siswa</div>
          </Col>
        </Row>
        <div className="flex flex-row gap-4 my-4 flex-wrap">
          <Space>
            <NoteIcon />
            <div>Dikerjakan</div>
            <div className="font-semibold">90</div>
          </Space>
          <Space>
            <SwipeIcon />
            <div>Dikerjakan</div>
            <div className="font-semibold">90</div>
          </Space>
          <Space>
            <DurationIcon />
            <div>Durasi Pengerjaan</div>
            <div className="font-semibold">85 min</div>
          </Space>
        </div>
        <Table
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
          }}
          size="small"
        >
          <Column title="Test" dataIndex="title" key="title" />
          <Column
            title="Kategori"
            dataIndex="kategori"
            key="kategori"
            render={(text) => (
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
            )}
          />
          <Column
            title="Duration"
            dataIndex="duration"
            key="duration"
            render={(text, record: any) => (
              <Typography>{`${text} Min`}</Typography>
            )}
          />
          <Column title="Score" dataIndex="score" key="score" />
          <Column
            align="center"
            dataIndex="status"
            key="status"
            render={(text, record: any) =>
              record.status == "expired" ? (
                <Button type="text" disabled>
                  Selesai
                </Button>
              ) : (
                <Button
                  style={{
                    color: "#3A9699",
                    borderColor: "#3A9699",
                    borderWidth: 1,
                  }}
                >
                  Mulai Mengerjakan Soal
                </Button>
              )
            }
          />
        </Table>
      </Card>
    </>
  );
};

export default ContainerDetailLatihanSoal;
