"use client";

import { ClockCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Popover, Row, Space, Statistic, Typography } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const { Countdown } = Statistic;

export default function AddSoal() {
  const [soal, setSoal] = React.useState([]);
  const [detail, setDetail] = React.useState({
    category_id: 0,
    duration: 0,
  });
  const router = useRouter();

  const { data, isFetching } = useQuery({
    queryKey: ["category", detail.category_id],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        "/api/soal/category/list?id=" + detail.category_id
      );
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        name: "test",
        desc: "test",
      },
    ],
  });

  useEffect(() => {
    const localData = window.localStorage.getItem("preview-soal")
      ? JSON.parse(window.localStorage.getItem("preview-soal") || "")
      : {};
    console.log(localData);
    if (Object.keys(localData).length > 0) {
      console.log(localData);
      setSoal(localData.soal);
      setDetail(localData);
    } else {
      router.push("/soal/paket-soal");
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
          sm={24}
          xs={24}
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
              return (
                <div
                  key={item.no}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    backgroundColor: "#F3F3F3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#333333",
                    fontWeight: 400,
                    border: "1px solid #E0E0E0",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  {item.no}
                </div>
              );
            })}
          </div>
        </Col>
        <Col xxl={18} xl={18} lg={16} md={16} sm={24} xs={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexDirection: "row",
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
                  {data.length > 0 ? data[0].name : ""}
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
                Pertanyaan ke 1 dari 6
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
        </Col>
      </Row>
    </div>
  );
}
