"use client";

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Image, Popover, Row, Statistic, Typography } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Countdown } = Statistic;

export default function AddSoal(props: any) {
  console.log(props);
  const [soal, setSoal] = React.useState<
    {
      no: number;
      type: "pilihan" | "essay";
      soal: string;
      jawaban: {
        key: string;
        jawaban: string;
        nilai: string;
        selected?: boolean;
      }[];
    }[]
  >([]);
  const [detail, setDetail] = React.useState<{
    category_id: number;
    duration: number;
    rules: string;
    soal: {
      no: number;
      type: "pilihan" | "essay";
      soal: string;
      jawaban: {
        key: string;
        jawaban: string;
        nilai: string;
        selected?: boolean;
      }[];
    }[];
  }>({
    category_id: 0,
    duration: 0,
    rules: "",
    soal: [],
  });
  const [no, setNo] = useState(0);
  const [soalNow, setSoalNow] = useState<{
    image?: string;
    audio?: string;
    no: number;
    type: "pilihan" | "essay";
    soal: string;
    jawaban: {
      key: string;
      jawaban: string;
      nilai: string;
      image?: string;
      audio?: string;
      selected?: boolean;
    }[];
  }>({
    no: 0,
    type: "pilihan",
    soal: "",
    jawaban: [],
  });
  const [selectedKey, setSelectedKey] = React.useState("");

  const handleNextQuestion = () => {
    if (no < soal.length) {
      setSoalNow(soal[no - 1 + 1]);
      setNo(no + 1);
      setSelectedKey("");
    }
  };

  const router = useRouter();

  // const { data, isFetching } = useQuery({
  //   queryKey: ["category", detail.category_id],
  //   queryFn: async () => {
  //     const res = await axiosClientInstance.get(
  //       "/api/soal/category/list?id=" + detail.category_id
  //     );
  //     return res.data.data;
  //   },
  //   initialData: [
  //     {
  //       id: 0,
  //       name: "test",
  //       desc: "test",
  //     },
  //   ],
  // });

  useEffect(() => {
    const localData = window.localStorage.getItem("preview-soal")
      ? JSON.parse(window.localStorage.getItem("preview-soal") || "")
      : {};
    console.log(localData);
    if (Object.keys(localData).length > 0) {
      setSoal(localData.soal);
      if (localData.soal.length > 0) {
        setNo(localData.soal[0].no);
        setSoalNow(localData.soal[0]);
      }
      setDetail(localData);
    } else {
      // router.push("/soal/paket-soal");
    }
  }, []);

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 5,
            backgroundColor: "#E0E0E0",
            marginRight: 8,
          }}
        />{" "}
        Belum Diisi
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 5,
            backgroundColor: "#32D583",
            marginRight: 8,
          }}
        />{" "}
        Terjawab
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 5,
            backgroundColor: "#F04438",
            marginRight: 8,
          }}
        />{" "}
        Dilewati
      </div>
    </div>
  );

  return (
    <div>
      <CustomHeader
        title="Preview Soal"
        isSubMenu
        subMenu={[
          {
            title: "Preview Soal (Sub Kategori)",
          },
        ]}
      />

      <Row>
        <Col
          xxl={6}
          xl={6}
          lg={8}
          md={8}
          sm={0}
          xs={0}
          style={{
            borderRight: "1px solid #F3F3F3",
            height: "calc(100vh - 64px)",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "4px 1.2vw",
              marginBottom: 16,
              borderBottom: "1px solid #F3F3F3",
            }}
          >
            <Typography
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#000",
              }}
            >
              List Soal
            </Typography>
            <Popover content={content} trigger="hover">
              <Button
                type="text"
                shape="circle"
                icon={<QuestionCircleOutlined />}
              />
            </Popover>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "18px",
              margin: "0px 1.2vw",
            }}
          >
            {soal.map((item: any, index: number) => {
              let color = "#F3F3F3";
              let fontColor = "#333333";
              if (item.answered) {
                color = "#A7EDCA";
                fontColor = "#32D583";
              } else if (item.skipped) {
                color = "#F9AFA9";
                fontColor = "#F04438";
              }

              if (item.no == no) {
                color = "#3A9699";
                fontColor = "#FFFFFF";
              }
              return (
                <div
                  key={item.no}
                  onClick={() => {
                    setNo(item.no);
                    setSoalNow(item);
                    setSelectedKey("");
                  }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    backgroundColor: color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: fontColor,
                    fontWeight: 400,
                    border: "1px solid #E0E0E0",
                    cursor: "pointer",
                    fontSize: "14px",
                    borderColor: fontColor == "#333333" ? undefined : fontColor,
                  }}
                >
                  {item.no}
                </div>
              );
            })}
          </div>
        </Col>
        <Col
          xxl={18}
          xl={18}
          lg={16}
          md={16}
          sm={24}
          xs={24}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
            overflowY: "scroll",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "12px 18px",
              }}
            >
              <Typography
                style={{
                  fontSize: 14,
                  color: "#7A7A7A",
                  margin: 0,
                }}
              >
                Kategori:{" "}
                <span
                  style={{
                    color: "#7A7A7A",
                    fontWeight: "500",
                  }}
                >
                  {/* {data.length > 0 ? data[0].name : ""} */} www
                </span>
              </Typography>
              <Typography
                style={{
                  fontSize: 20,
                  color: "#333333",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                Matematika
              </Typography>
              <Typography
                style={{
                  color: "#32D583",
                  fontSize: 14,
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                Pertanyaan ke {no} dari {soal.length}
              </Typography>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "12px 18px",
                }}
              >
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    margin: 0,
                    color: "#7A7A7A",
                  }}
                >
                  Waktu Tersisa
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 4,
                  }}
                >
                  <ClockCircleOutlined
                    style={{
                      color: "#FDB022",
                    }}
                  />
                  {/* <Typography
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      margin: 0,
                      color: "#7A7A7A",
                    }}
                  > */}
                  <Countdown
                    value={moment(
                      moment().add(detail.duration, "minutes")
                    ).format()}
                    valueStyle={{
                      fontSize: 14,
                      fontWeight: 600,
                      margin: 0,
                      color: "#7A7A7A",
                    }}
                    // onFinish={onFinish}
                  />
                  {/* </Typography> */}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: "8px",
              border: "1px solid #F3F3F3",
              width: "94%",
              padding: "1% 2%",
              position: "relative",
            }}
          >
            <Typography
              style={{
                color: "#7A7A7A",
              }}
            >
              Pertanyaan
            </Typography>
            <Typography
              style={{
                color: "#333333",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {soalNow.soal}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "flex-start",
              }}
            >
              {soalNow.image != undefined ? (
                <Image
                  alt={soalNow.image + "Image Soal" + no}
                  src={
                    soalNow.image
                      ? soalNow.image.includes("http")
                        ? soalNow.image
                        : process.env.NEXT_PUBLIC_URL_BE +
                          "/api/attach/" +
                          soalNow.image
                      : ""
                  }
                  width={200}
                  style={{
                    position: "relative",
                  }}

                  // className="w-[200px] object-contain aspect-auto"
                />
              ) : null}

              {soalNow.audio != undefined ? (
                <audio id="audio" controls>
                  <source
                    id="source"
                    src={
                      soalNow.audio
                        ? soalNow.audio.includes("http")
                          ? soalNow.audio
                          : process.env.NEXT_PUBLIC_URL_BE +
                            "/api/attach/" +
                            soalNow.audio
                        : ""
                    }
                    type="audio/mp3"
                  />
                  <source
                    id="source"
                    src={
                      soalNow.audio
                        ? soalNow.audio.includes("http")
                          ? soalNow.audio
                          : process.env.NEXT_PUBLIC_URL_BE +
                            "/api/attach/" +
                            soalNow.audio
                        : ""
                    }
                    type="audio/ogg"
                  />
                  <source
                    id="source"
                    src={
                      soalNow.audio
                        ? soalNow.audio.includes("http")
                          ? soalNow.audio
                          : process.env.NEXT_PUBLIC_URL_BE +
                            "/api/attach/" +
                            soalNow.audio
                        : ""
                    }
                    type="audio/wav"
                  />
                  Your browser does not support the audio element.
                </audio>
              ) : null}
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {soalNow.jawaban.map((val, idx) => {
                return (
                  <div
                    key={val.key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
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
                      onClick={() => {
                        setSelectedKey(val.key);
                      }}
                    >
                      <div
                        style={{
                          background:
                            val.key == selectedKey ? "#3A9699" : "#F3F3F3",
                          borderRight:
                            val.key == selectedKey
                              ? "1px solid #3A9699"
                              : "1px solid #F3F3F3",
                          color: val.key == selectedKey ? "#fff" : "#333333",
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
                        onClick={() => {
                          setSelectedKey(val.key);
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
                          alt={val.image + "Image Soal" + no}
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
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: "2% 3%",
            }}
          >
            <Button
              size="large"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              disabled={no == 1}
              onClick={() => {
                if (no > 0) {
                  setSoalNow(soal[no - 1 - 1]);
                  setNo(no - 1);
                  setSelectedKey("");
                }
              }}
            >
              <ArrowLeftOutlined /> Sebelumnya
            </Button>
            {no < soal.length ? (
              <Button
                size="large"
                type="primary"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onClick={handleNextQuestion}
              >
                Selanjutnya
                <ArrowRightOutlined />
              </Button>
            ) : (
              <Button
                size="large"
                type="primary"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onClick={() => {
                  router.back();
                }}
              >
                Selesaikan
                <ArrowRightOutlined />
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
