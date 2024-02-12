"use client";
import { CalendarOutlined } from "@ant-design/icons";
import ViewProductModal from "@dsarea/@/components/Modals/Product/ViewProductModal";
import ViewSubCategoryModal from "@dsarea/@/components/Modals/Product/ViewSubCategoryModal";
import DurationIcon from "@dsarea/@/components/icons/DurationIcon";
import NoteIcon from "@dsarea/@/components/icons/NoteIcon";
import SwipeIcon from "@dsarea/@/components/icons/SwipeIcon";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import { pickRandomItem } from "@dsarea/@/lib/utils";
import {
  Badge,
  Button,
  Card,
  Col,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
const { Column } = Table;

type HeaderProps = {
  data: {
    participant: string;
    rank: string;
    total_dilewati: string;
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
  console.log(dataInitial, "datainitial");
  const [categoryColor, setCategoryColor] = React.useState<
    {
      name: string;
      color: string;
    }[]
  >([]);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [selected, setSelected] = React.useState({});

  React.useEffect(() => {
    const arr: React.SetStateAction<{ name: string; color: string }[]> = [];
    dataInitial.category_name.map((val) => {
      const keys = {
        name: val,
        color: pickRandomItem(),
      };
      arr.push(keys);
    });
    setCategoryColor(arr);
  }, [dataInitial]);

  return (
    <>
      <ViewSubCategoryModal
        onSubmit={() => setOpenViewModal(false)}
        data={selected}
        open={openViewModal}
      />
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
              {dataInitial.nama_product}
            </Typography.Text>
            <div className="flex items-center gap-x-2">
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
                {moment(dataInitial.expired_at).format("DD/MM/YYYY HH:mm")}
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
                  {dataInitial.total_duration} min
                </Typography.Text>
              </Space>
              <Space>
                <CalendarOutlined />
                {moment().format("DD/MM/YYYY")}
              </Space>

              <Space>
                <Badge color="#3A9699" />
                Total Pertanyaan : {dataInitial.total_soal}
              </Space>
            </div>
          </Col>
          {/* <Col>
            <Typography>Tanggal Pengerjaan</Typography>
            <Space>
              <CalendarOutlined
                style={{
                  color: "#FDB022",
                }}
              />
              {moment().format("DD/MM/YYYY HH:mm")}
            </Space>
          </Col> */}
          <Col>
            <div className="bg-[#EBF5F5] rounded-md px-2 py-2">
              <span>Total Score</span>
              <Typography.Paragraph
                strong
                style={{
                  fontSize: 24,
                  margin: 0,
                  padding: 0,
                }}
              >
                {dataInitial.score}
              </Typography.Paragraph>
            </div>
            {dataInitial.rank ? (
              <div>
                Peringkat : {dataInitial.rank}/{dataInitial.participant} siswa
              </div>
            ) : (
              <div>Partisipasi : {dataInitial.participant} siswa</div>
            )}
          </Col>
        </Row>
        <div className="flex flex-row gap-4 my-4 flex-wrap">
          <Space>
            <NoteIcon />
            <div>Dikerjakan</div>
            <div className="font-semibold">{dataInitial.total_jawab}</div>
          </Space>
          <Space>
            <SwipeIcon />
            <div>Dilewati</div>
            <div className="font-semibold">{dataInitial.total_dilewati}</div>
          </Space>
          <Space>
            <DurationIcon />
            <div>Total Durasi Pengerjaan</div>
            <div className="font-semibold">
              {dataInitial.total_duration} min
            </div>
          </Space>
        </div>
        <Table
          dataSource={dataInitial.sub_category}
          pagination={{
            hideOnSinglePage: true,
          }}
          size="small"
          rowKey={"sub_id"}
          scroll={{
            x: 1000,
          }}
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
          />
          <Column
            align="center"
            dataIndex="status"
            key="status"
            render={(text, record: any) =>
              record.status == "expired" ? (
                <Button
                  type="text"
                  onClick={() => {
                    // requestFullscreen();
                    setOpenViewModal(true);
                    setSelected(record);
                  }}
                >
                  Expired
                </Button>
              ) : record.status == "done" ? (
                <Button
                  type="text"
                  onClick={() => {
                    // requestFullscreen();
                    setOpenViewModal(true);
                    setSelected(record);
                  }}
                >
                  Selesai
                </Button>
              ) : record.status == "active" ? (
                <Button
                  style={{
                    color: "#3A9699",
                    borderColor: "#3A9699",
                    borderWidth: 1,
                  }}
                  onClick={() => {
                    // requestFullscreen();
                    setOpenViewModal(true);
                    setSelected(record);
                  }}
                >
                  Mulai Mengerjakan Soal
                </Button>
              ) : null
            }
          />
        </Table>
      </Card>
    </>
  );
};

export default ContainerDetailLatihanSoal;
