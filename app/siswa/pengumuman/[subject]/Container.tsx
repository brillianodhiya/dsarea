"use client";
import { CalendarOutlined } from "@ant-design/icons";
import { dataType } from "@dsarea/@/components/Dashboard/DashboardOverview";
import DurationIcon from "@dsarea/@/components/icons/DurationIcon";
import NoteIcon from "@dsarea/@/components/icons/NoteIcon";
import SwipeIcon from "@dsarea/@/components/icons/SwipeIcon";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { pickRandomItem } from "@dsarea/@/lib/utils";
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
import React from "react";
const { Column } = Table;

interface DataType {
  data: any;
}

const ContainerDetailPengumuman: React.FC<DataType> = ({
  data: initialData,
}) => {
  const [categoryColor, setCategoryColor] = React.useState<
    {
      name: string;
      color: string;
    }[]
  >([]);

  React.useEffect(() => {
    const arr: React.SetStateAction<{ name: string; color: string }[]> = [];
    initialData.category_name.map((val: any) => {
      const keys = {
        name: val,
        color: pickRandomItem(),
      };
      arr.push(keys);
    });
    setCategoryColor(arr);
  }, [initialData]);

  return (
    <div>
      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap gutter={[24, 24]}>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div className="flex items-center gap-x-2">
              <Typography.Text strong className="!text-xl">
                Penilaian : {initialData.nama_product}
              </Typography.Text>
              {categoryColor.map((item, index) => {
                return (
                  <Tag
                    key={item.name}
                    color={item.color}
                    style={{
                      borderRadius: 100,
                    }}
                  >
                    {item.name}
                  </Tag>
                );
              })}
            </div>
            <div>
              <Typography>
                Expired at :{" "}
                {moment(initialData.expired_at).format("DD/MM/YYYY HH:mm")}
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
                  {initialData.total_duration} min
                </Typography.Text>
              </Space>

              <Space>
                <Badge color="#3A9699" />
                Total Pertanyaan : {initialData.total_soal}
              </Space>
            </div>
          </Col>
          <Col>
            <div className="bg-[#EBF5F5] rounded-md px-2 py-2">
              Total Score
              <Typography.Paragraph strong>
                {initialData.score}
              </Typography.Paragraph>
            </div>
            <div>
              Peringkat : {initialData.rank}/{initialData.participant} siswa
            </div>
          </Col>
        </Row>
        <div className="flex flex-row gap-4 my-4 flex-wrap">
          <Space>
            <NoteIcon />
            <div>Dikerjakan</div>
            <div className="font-semibold">{initialData.total_jawab}</div>
          </Space>
          <Space>
            <SwipeIcon />
            <div>Dilewati</div>
            <div className="font-semibold">{initialData.total_dilewati}</div>
          </Space>
        </div>
        <Table
          dataSource={initialData.sub_category ?? []}
          pagination={{
            hideOnSinglePage: true,
          }}
          size="small"
        >
          <Column title="Test" dataIndex="title" key="title" />
          <Column
            title="Kategori"
            dataIndex="category_name"
            key="category_name"
            render={(text) => (
              <Tag
                color={
                  categoryColor.find((val) => val.name == text)?.color || ""
                }
                style={{
                  borderRadius: 100,
                }}
              >
                {text}
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
            title="Tanggal Pengerjaan"
            dataIndex="tanggal_pengerjaan"
            key="tanggal_pengerjaan"
            render={(text, record: any) => (
              <Typography>
                {moment(text).format("DD-MM-YYYY HH:mm:ss")}
              </Typography>
            )}
          />
          <Column
            align="center"
            dataIndex="status"
            key="status"
            render={(text, record: any) => (
              <Button
                type="link"
                style={{
                  color: "#3A9699",
                }}
              >
                Lihat Detail
              </Button>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default ContainerDetailPengumuman;
