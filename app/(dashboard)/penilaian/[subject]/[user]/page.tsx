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
  InputNumber,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface Question {
  id: number;
  sub_id: number;
  no: number;
  soal: string;
  type: string;
  image: string | null;
  audio: string | null;
  createdAt: string;
  updatedAt: string;
  jawaban: any[]; // Anda mungkin ingin menyesuaikan tipe data jawaban sesuai kebutuhan
}

interface QuestionGroup {
  items: Question[];
}

const Accordion: React.FC<QuestionGroup> = ({ items }) => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const handleClick = (index: number) => {
    const currentIndex = activeIndices.indexOf(index);
    if (currentIndex === -1) {
      setActiveIndices([...activeIndices, index]); // Add to activeIndices array
    } else {
      const newIndices = [...activeIndices];
      newIndices.splice(currentIndex, 1); // Remove from activeIndices array
      setActiveIndices(newIndices);
    }
  };

  return (
    <div className="w-full mx-auto border-[0.5px] rounded-lg">
      {items.map((item: any, index: any) => (
        <div key={index} className="border-b-[0.5px] border-gray-200">
          <div
            className={`flex justify-between items-start p-3 cursor-pointer ${
              activeIndices.includes(index) ? "bg-gray-100" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <div className="flex items-end w-full">
              <div className="flex items-start w-[68%]">
                <span className="text-sm text-gray-500 mr-4">{index + 1}</span>
                <span className="overflow-hidden overflow-ellipsis mr-2">
                  {activeIndices.includes(index)
                    ? item.soal
                    : item.soal.length > 80
                    ? item.soal.slice(0, 80) + "..."
                    : item.soal}
                </span>
              </div>
              <span className="text-sm text-[#32D583]">{80}</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${
                activeIndices.includes(index) ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {activeIndices.includes(index) && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "flex-start",
              }}
              className="pl-8 pb-3 bg-[#F3F3F3]"
            >
              {item.image != undefined ? (
                <Image
                  alt={item.image + "Image Soal"}
                  src={
                    item.image
                      ? item.image.includes("http")
                        ? item.image
                        : process.env.NEXT_PUBLIC_URL_BE +
                          "/api/attach/" +
                          item.image
                      : ""
                  }
                  width={200}
                  style={{
                    position: "relative",
                  }}
                  height={1000}

                  // className="w-[200px] object-contain aspect-auto"
                />
              ) : null}

              {item.audio != undefined ? (
                <audio id="audio" controls>
                  <source
                    id="source"
                    src={
                      item.audio
                        ? item.audio.includes("http")
                          ? item.audio
                          : process.env.NEXT_PUBLIC_URL_BE +
                            "/api/attach/" +
                            item.audio
                        : ""
                    }
                    type="audio/mp3"
                  />
                  <source
                    id="source"
                    src={
                      item.audio
                        ? item.audio.includes("http")
                          ? item.audio
                          : process.env.NEXT_PUBLIC_URL_BE +
                            "/api/attach/" +
                            item.audio
                        : ""
                    }
                    type="audio/ogg"
                  />
                  <source
                    id="source"
                    src={
                      item.audio
                        ? item.audio.includes("http")
                          ? item.audio
                          : process.env.NEXT_PUBLIC_URL_BE +
                            "/api/attach/" +
                            item.audio
                        : ""
                    }
                    type="audio/wav"
                  />
                  Your browser does not support the audio element.
                </audio>
              ) : null}
            </div>
          )}
          {activeIndices.includes(index) && (
            <div className="pl-8 pb-3 bg-[#F3F3F3]">
              {item.type == "essay" ? (
                <div className=" flex w-full flex-wrap gap-4">
                  <div className="w-[65%] flex flex-col gap-2">
                    <span className="text-xs text-[#7A7A7A]">Jawaban</span>
                    <div>
                      <div className="rounded border border-[#32D583] bg-white p-2">
                        <p className="w-[95%]">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Qui, perspiciatis optio in magnam quis,
                          repellendus assumenda vel rem nisi commodi minus,
                          repellat voluptate esse. Eum quaerat eaque repudiandae
                          recusandae asperiores. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Qui, perspiciatis optio
                          in magnam quis, repellendus assumenda vel rem nisi
                          commodi minus, repellat voluptate esse. Eum quaerat
                          eaque repudiandae recusandae asperiores. Lorem ipsum
                          dolor sit amet consectetur adipisicing elit. Qui,
                          perspiciatis optio in magnam quis, repellendus
                          assumenda vel rem nisi commodi minus, repellat
                          voluptate esse. Eum quaerat eaque repudiandae
                          recusandae asperiores.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-[#7A7A7A]">Score</span>
                    <InputNumber min={0} placeholder="Score" />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex w-full flex-wrap gap-4 mb-2">
                    <div className="w-[65%] flex flex-col gap-2">
                      <span className="text-xs text-[#7A7A7A]">Jawaban</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-[#7A7A7A]">Score</span>
                    </div>
                  </div>

                  {item.jawaban.map((val: any, idx: any) => {
                    return (
                      <div
                        key={val.key}
                        className="flex w-full flex-wrap gap-4"
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "65%",
                            // cursor: "pointer",
                          }}
                          // onClick={() => {
                          //   setSelectedKey(val.key);
                          // }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 10,
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                background: "#F3F3F3",
                                borderRight: "1px solid #F3F3F3",
                                color: "#333333",
                                // padding: "2px 8px",
                                borderRadius: "4px",
                                width: "26px",
                                height: "26px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                            >
                              {val.key}
                            </div>
                            <div>{val.jawaban}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                              alignItems: "flex-start",
                            }}
                          >
                            {val.image != undefined ? (
                              <Image
                                alt={val.image + "Image Soal"}
                                src={
                                  val.image
                                    ? val.image.includes("http")
                                      ? val.image
                                      : process.env.NEXT_PUBLIC_URL_BE +
                                        "/api/attach/" +
                                        val.image
                                    : ""
                                }
                                width={200}
                                style={{
                                  position: "relative",
                                }}
                                height={1000}

                                // className="w-[200px] object-contain aspect-auto"
                              />
                            ) : null}

                            {val.audio != undefined ? (
                              <audio id="audio" controls>
                                <source
                                  id="source"
                                  src={
                                    val.audio
                                      ? val.audio.includes("http")
                                        ? val.audio
                                        : process.env.NEXT_PUBLIC_URL_BE +
                                          "/api/attach/" +
                                          val.audio
                                      : ""
                                  }
                                  type="audio/mp3"
                                />
                                <source
                                  id="source"
                                  src={
                                    val.audio
                                      ? val.audio.includes("http")
                                        ? val.audio
                                        : process.env.NEXT_PUBLIC_URL_BE +
                                          "/api/attach/" +
                                          val.audio
                                      : ""
                                  }
                                  type="audio/ogg"
                                />
                                <source
                                  id="source"
                                  src={
                                    val.audio
                                      ? val.audio.includes("http")
                                        ? val.audio
                                        : process.env.NEXT_PUBLIC_URL_BE +
                                          "/api/attach/" +
                                          val.audio
                                      : ""
                                  }
                                  type="audio/wav"
                                />
                                Your browser does not support the audio element.
                              </audio>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-xs text-[#7A7A7A]">
                            {val.nilai}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

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

  const items2: Question[] = [
    {
      id: 36,
      sub_id: 18,
      no: 2,
      soal: "essay",
      type: "essay",
      image: null,
      audio: null,
      createdAt: "2024-01-30T07:55:50.000Z",
      updatedAt: "2024-01-30T07:55:50.000Z",
      jawaban: [],
    },
    {
      id: 35,
      sub_id: 18,
      no: 1,
      soal: "tanap soal",
      type: "pilihan",
      image: null,
      audio: null,
      createdAt: "2024-01-30T07:55:50.000Z",
      updatedAt: "2024-01-30T07:55:50.000Z",
      jawaban: [
        {
          id: 50,
          sub_id: 18,
          soal_id: 35,
          key: "A",
          jawaban: "1",
          nilai: 1,
          image: null,
          audio: null,
          createdAt: "2024-01-30T07:55:50.000Z",
          updatedAt: "2024-01-30T07:55:50.000Z",
        },
        {
          id: 51,
          sub_id: 18,
          soal_id: 35,
          key: "B",
          jawaban: "1",
          nilai: 1,
          image: null,
          audio: null,
          createdAt: "2024-01-30T07:55:50.000Z",
          updatedAt: "2024-01-30T07:55:50.000Z",
        },
        {
          id: 52,
          sub_id: 18,
          soal_id: 35,
          key: "C",
          jawaban: "1",
          nilai: 1,
          image: null,
          audio: null,
          createdAt: "2024-01-30T07:55:50.000Z",
          updatedAt: "2024-01-30T07:55:50.000Z",
        },
        {
          id: 53,
          sub_id: 18,
          soal_id: 35,
          key: "D",
          jawaban: "1",
          nilai: 1,
          image: null,
          audio: null,
          createdAt: "2024-01-30T07:55:50.000Z",
          updatedAt: "2024-01-30T07:55:50.000Z",
        },
        {
          id: 54,
          sub_id: 18,
          soal_id: 35,
          key: "E",
          jawaban: "1",
          nilai: 1,
          image: null,
          audio: null,
          createdAt: "2024-01-30T07:55:50.000Z",
          updatedAt: "2024-01-30T07:55:50.000Z",
        },
      ],
    },
    {
      id: 45,
      sub_id: 33,
      no: 1,
      soal: "soal 1",
      type: "pilihan",
      image:
        "MTcwODM0NDM2MjE3NzE3MDU2MTgwMDc1NTMxLlBORy4tc3BsYXNoLS5pbWFnZS9wbmcuLXNwbGFzaC0udXBsb2FkXzIwMjQtMDI",
      audio:
        "MTcwODIzMjM2MDI1MVdoaXNudSBTYW50aWthLCBoYnJwLCBLZWVibyAtIENhcnRlbC5tcDMuLXNwbGFzaC0uYXVkaW8vbXBlZy4tc3BsYXNoLS51cGxvYWRfMjAyNC0wMg",
      createdAt: "2024-02-08T12:48:09.000Z",
      updatedAt: "2024-02-08T12:48:09.000Z",
      jawaban: [
        {
          id: 68,
          sub_id: 33,
          soal_id: 45,
          key: "A",
          jawaban: "1",
          nilai: 1,
          image:
            "MTcwNzkyMzgzNzQ1MjE3MDU2MTgwMDc1NTMxLlBORy4tc3BsYXNoLS5pbWFnZS9wbmcuLXNwbGFzaC0udXBsb2FkXzIwMjQtMDI",
          audio: null,
          createdAt: "2024-02-08T12:48:09.000Z",
          updatedAt: "2024-02-08T12:48:09.000Z",
        },
      ],
    },
  ];

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
        {/* <Collapse
          items={items}
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition="right"
        /> */}

        <Accordion items={items2} />
      </Card>
    </div>
  );
}
