"use client";
import { CalendarOutlined } from "@ant-design/icons";
import LoadingNonFullscreen from "@dsarea/@/components/LoadingComponent/LoadingComponentParent";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  Image,
  Button,
  message,
} from "antd";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

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
  setSoal: React.Dispatch<React.SetStateAction<Question[]>>;
}

const Accordion: React.FC<QuestionGroup> = ({ items, setSoal }) => {
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
    <div className="w-full mx-auto border-[0.5px] rounded-lg mb-[50px]">
      {items.map((item: any, index: any) => (
        <div
          key={index}
          className="border-b-[0.5px] border-gray-200 flex flex-col"
        >
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
              <span className="text-sm text-[#32D583]">
                {item?.jawaban_user?.nilai ?? 0}
              </span>
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
                        <p className="w-[95%]">{item?.jawaban_user?.jawaban}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-[#7A7A7A]">Score</span>
                    <InputNumber
                      min={0}
                      placeholder="Score"
                      onChange={(v) => {
                        setSoal((prev: any) => {
                          const newSoal = [...prev];
                          if (newSoal[index].jawaban_user) {
                            newSoal[index].jawaban_user.nilai = v;
                          } else {
                            newSoal[index].jawaban_user = {
                              nilai: v,
                            };
                          }
                          return newSoal;
                        });
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
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
                                background: item.jawaban_user
                                  ? val.key == item.jawaban_user.key
                                    ? "#32D583"
                                    : "#F3F3F3"
                                  : "#F3F3F3",
                                borderRight: item.jawaban_user
                                  ? val.key == item.jawaban_user.key
                                    ? "1px solid #32D583"
                                    : "1px solid #F3F3F3"
                                  : "1px solid #F3F3F3",
                                color: item.jawaban_user
                                  ? val.key == item.jawaban_user.key
                                    ? "#fff"
                                    : "#333333"
                                  : "#333333",
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
                          <div
                            className={
                              item.jawaban_user
                                ? val.key == item.jawaban_user.key
                                  ? "text-xs text-[#32D583]"
                                  : "text-xs text-[#7A7A7A]"
                                : "text-xs text-[#7A7A7A]"
                            }
                          >
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

export default function Page(props: any) {
  const product_id = props.params.subject ?? "-";
  const sub_id = props.params.user ?? "-";
  const user_id = props.searchParams.user_id ?? "-";
  const category_id = props.searchParams.category_id ?? "-";
  const product_name = props.searchParams.soal ?? "-";
  const [loading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const [soal, setSoal] = useState<any[]>([]);

  const { data, isFetching } = useQuery({
    queryKey: ["penilaian-detail", product_id, sub_id, user_id, category_id],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        `/api/penilaian/list/soal/${product_id}/${category_id}/${sub_id}/${user_id}`
      );
      setSoal(res.data.data.soal);
      return res.data.data;
    },
    initialData: {
      soal: [],
    },
  });

  const handleSendSkor = async () => {
    try {
      setLoading(true);
      const arr: any[] = [];
      soal.map((val) => {
        if (val.jawaban_user) {
          arr.push(val.jawaban_user);
        }
      });

      const res = await axiosClientInstance.post(`/api/penilaian/submit`, arr);
      setLoading(false);
      queryClient.invalidateQueries({
        queryKey: [
          "penilaian-detail",
          product_id,
          sub_id,
          user_id,
          category_id,
        ],
      });
      message.success(res.data.message);
    } catch (error) {
      message.error("Gagal mengirim skor");
    }
  };

  // console.log(data, "data");

  const useSkor = () => {
    let total = 0;
    soal.map((val) => {
      if (val.jawaban_user) {
        total += val.jawaban_user.nilai;
      } else {
        total += 0;
      }
    });
    return total;
  };

  const skor = useSkor();

  const submenu = [
    {
      title: "Penilaian",
    },
    {
      title: "Sub Menu",
    },
  ];

  return (
    <div>
      <LoadingNonFullscreen spinning={isFetching || loading}>
        <CustomHeader title="Sub Menu" isSubMenu={true} subMenu={submenu} />
        <Card className="!m-6">
          <Row className="mb-4" justify={"space-between"} wrap>
            <Col>
              <div className="flex items-center gap-x-2">
                <Typography.Text strong className="!text-xl">
                  Penilaian : {product_name}
                </Typography.Text>
                <Tag>{data.sub_category_name}</Tag>
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
                    {data.category_name}
                  </Typography>
                </Tag>
              </div>
              <div>
                <div>
                  <Typography>Nama Siswa : {data.nama_siswa}</Typography>
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
                      {data.duration} min
                    </Typography.Text>
                  </Space>

                  <Space>
                    <Badge color="#32D583" />
                    Terjawab : {data.terjawab}
                  </Space>
                  <Space>
                    <Badge color="#F04438" />
                    Dilewati : {data.dilewati}
                  </Space>
                  <Space>
                    <Badge color="#3A9699" />
                    Total Pertanyaan : {data.total_pertanyaan}
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
                {moment(data.tanggal_pengerjaan).format("DD/MM/YYYY HH:mm")}
              </Typography>
              <Typography>Rules: {data.rules}</Typography>
            </Col>
            <Col>
              <div className="bg-[#EBF5F5] rounded-md p-2">
                Total Score
                <Typography.Paragraph strong>{skor}</Typography.Paragraph>
              </div>
            </Col>
          </Row>
          {/* <Collapse
          items={items}
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition="right"
        /> */}

          <Accordion items={soal} setSoal={setSoal} />

          {/* button cancel dan save floating rigth dengan fixed div */}
          <div
            className="fixed bottom-0 right-0 p-4 bg-[#F7F7F7] w-full z-0 text-right"
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <Space>
              <Button onClick={() => window.close()}>Close</Button>
              <Button type="primary" onClick={() => handleSendSkor()}>
                Save
              </Button>
            </Space>
          </div>
        </Card>
      </LoadingNonFullscreen>
    </div>
  );
}
