"use client";
import { CalendarOutlined } from "@ant-design/icons";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import {
  Badge,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <Row>
        <Col span={18}>Pertanyaan</Col>
        <Col span={6}>Score</Col>
      </Row>
    ),
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
  },
];

export default function Page() {
  const pahtname = usePathname();
  const submenu = [
    {
      title: "Penilaian",
    },
    {
      title: "Sub Menu",
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div>
      <CustomHeader title="Sub Menu" isSubMenu={true} subMenu={submenu} />
      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <div className="flex items-center gap-x-2">
              <Typography.Text strong className="!text-xl">
                Penilaian : Try Outs
              </Typography.Text>
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
              <div>
                <Typography>Nama Siswa : Dianne Russell</Typography>
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
                  <Badge color="#32D583" />
                  Terjawab : 84
                </Space>
                <Space>
                  <Badge color="#F04438" />
                  Dilewati : 6
                </Space>
                <Space>
                  <Badge color="#3A9699" />
                  Total Pertanyaan : 90
                </Space>
              </div>
            </div>
          </Col>
          <Col>
            <Typography>Tanggal Pengerjaan</Typography>
            <Typography>
              <CalendarOutlined
                style={{
                  color: "#FDB022",
                }}
              />
              {moment().format("DD/MM/YYYY HH:mm")}
            </Typography>
            <Typography>Durasi Pengerjaan : 85 min 30 sec</Typography>
          </Col>
          <Col>
            <div className="bg-[#EBF5F5] rounded-md p-2">
              Total Score
              <Typography.Paragraph strong>223</Typography.Paragraph>
            </div>
          </Col>
        </Row>
        <Collapse
          items={items}
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition="right"
        />
      </Card>
    </div>
  );
}
