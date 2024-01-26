"use client";
import { CalendarOutlined } from "@ant-design/icons";
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

export default function Page() {
  const submenu = [
    {
      title: "Penilaian",
    },
    {
      title: "Sub Menu",
    },
  ];

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
    <div>
      <CustomHeader title="Sub Menu" isSubMenu={true} subMenu={submenu} />
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
    </div>
  );
}
