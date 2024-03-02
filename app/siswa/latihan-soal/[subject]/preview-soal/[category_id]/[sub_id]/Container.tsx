"use client";

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import LoadingNonFullscreen from "@dsarea/@/components/LoadingComponent/LoadingComponentParent";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import {
  Button,
  Col,
  Image,
  Input,
  Modal,
  Popover,
  Row,
  Space,
  Statistic,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import screenfull from "screenfull";

const { confirm } = Modal;

const { Countdown } = Statistic;

type HeaderProps = {
  dataSoal: {
    jumlah_akses: number;
    end_duration: string;
    title: string;
    category_id: number;
    duration: number;
    rules: string;
    soal: {
      product_id: number;
      soal_id: number;
      sub_id: number;
      no: number;
      type: "pilihan" | "essay";
      jawaban_user?: {
        key?: string;
        jawaban?: string;
      };
      soal: string;
      jawaban: {
        key: string;
        jawaban: string;
        nilai: string;
        selected?: boolean;
      }[];
    }[];
  };
  detailSoal: {
    sub_id?: any;
    product_id?: any;
    category_id?: any;
    category_name?: string;
    sub_category_name?: string;
  };
  end_duration: string;
};

const PreviewSoal: React.FC<HeaderProps> = ({
  dataSoal,
  detailSoal,
  end_duration,
}) => {
  function countdownTimer(endDate: string): string {
    // Parse the input end_date
    const endDateTime = new Date(endDate);
    const now = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = endDateTime.getTime() - now.getTime();

    // Convert milliseconds to seconds
    const secondsRemaining = Math.floor(timeDifference / 1000);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;

    // Format the countdown timer
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedTime;
  }
  const [soal, setSoal] = React.useState<
    {
      product_id: number;
      soal_id: number;
      sub_id: number;
      no: number;
      type: "pilihan" | "essay";
      soal: string;
      jawaban_user?: {
        key?: string;
        jawaban?: string;
      };
      answered?: boolean;
      skipped?: boolean;
      jawaban: {
        key: string;
        jawaban: string;
        nilai: string;
        image?: string;
        audio?: string;
        selected?: boolean;
        jawaban_id?: number;
      }[];
    }[]
  >([]);

  const [detail, setDetail] = React.useState<{
    title: string;
    end_duration?: string;
    category_id: number;
    duration: number;
    rules: string;
    soal: {
      product_id: number;
      soal_id: number;
      sub_id: number;
      jawaban_user?: {
        key?: string;
        jawaban?: string;
      };
      answered?: boolean;
      skipped?: boolean;
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
        jawaban_id?: number;
      }[];
    }[];
  }>({
    title: "",
    category_id: 0,
    duration: 0,
    rules: "",
    soal: [],
    end_duration: "",
  });

  const [no, setNo] = useState(0);
  const [soalNow, setSoalNow] = useState<{
    product_id: number;
    soal_id: number;
    sub_id: number;
    image?: string;
    audio?: string;
    no: number;
    type: "pilihan" | "essay";
    soal: string;
    jawaban_user?: {
      key?: string;
      jawaban?: string;
    };
    answered?: boolean;
    skipped?: boolean;
    jawaban: {
      key: string;
      jawaban: string;
      nilai: string;
      image?: string;
      audio?: string;
      selected?: boolean;
      jawaban_id?: number;
    }[];
  }>({
    no: 0,
    type: "pilihan",
    soal: "",
    jawaban: [],
    product_id: 0,
    soal_id: 0,
    sub_id: 0,
  });
  const [selectedKey, setSelectedKey] = React.useState("");
  const [essayAnswer, setEssayAnswer] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isFullScreen, setIsFullscreen] = React.useState(false);

  // karena setIsFullscreen di trigger beberapa kali useEffect di bawah jadi trigger 2x benarkan
  // maka gunakan useCallback untuk menghemat proses yang
  // tidak perlu di trigger berkali-kali
  const handleSetIsFullscreen = React.useCallback(() => {
    setIsFullscreen(screenfull.isFullscreen);
  }, [screenfull.isFullscreen]);

  React.useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", handleSetIsFullscreen);
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", handleSetIsFullscreen);
      }
    };
  }, [screenfull.isEnabled, handleSetIsFullscreen]);

  React.useEffect(() => {
    if (!isFullScreen) {
      Modal.warning({
        title: "Perhatian!",
        content:
          "Pengerjaan ujian wajib menggunakan mode fullscreen, selesaikan ujian terlebih dahulu sebelum keluar dari mode fullscreen!",
        onOk: () => {
          Modal.destroyAll();
          screenfull.request();
        },
        onCancel: () => {
          Modal.destroyAll();
          screenfull.request();
        },
      });
    }
  }, [isFullScreen]);

  // console.log(isFullScreen, "isfullscreen");
  const handleSendToServer = (body: any, type: string, callback: () => any) => {
    setLoading(true);
    axiosClientInstance
      .post("/api/users/siswa/jawab/soal/" + type, body)
      .then((res) => {
        setLoading(false);
        callback();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.message) {
          message.error(err.response.data.message);
        } else {
          message.error(err.message);
        }
        // console.log(err);
      });
  };

  // console.log(soalNow, "soalnow");

  const sendCompleteTest = (callback: () => void) => {
    let jawaban_id = soalNow.jawaban.filter(
      (val: any) => val.key == selectedKey
    );

    return axiosClientInstance
      .post("/api/users/siswa/jawab/soal/" + soalNow.type, {
        jawaban_id:
          soalNow.type == "pilihan" ? jawaban_id[0].jawaban_id : undefined,
        product_id: soalNow.product_id,
        sub_id: soalNow.sub_id,
        soal_id: soalNow.soal_id,
        jawaban: soalNow.type == "essay" ? essayAnswer : undefined,
      })
      .then((res) => {
        return axiosClientInstance
          .post("/api/users/siswa/jawaban/done", {
            product_id: soalNow.product_id,
            sub_id: soalNow.sub_id,
            category_id: detailSoal.category_id,
          })
          .then((res) => {
            setLoading(false);
            screenfull.exit();
            window.location.replace(
              "/siswa/latihan-soal/" + detailSoal.product_id
            );
          })
          .catch((err) => {
            setLoading(false);
            callback();
            // console.log(err);
            if (err.response.data.message) {
              message.error(err.response.data.message);
            } else {
              message.error(err.message);
            }
          });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.message) {
          message.error(err.response.data.message);
        } else {
          message.error(err.message);
        }
        // console.log(err);
      });
  };

  const handleCompleteTest = () => {
    confirm({
      title: "Apakah kamu ingin menyelesaikan test ini?",
      icon: <ExclamationCircleFilled />,
      content:
        "Test yang telah selesai tidak dapat di ulangi, silahkan cek kembali jawaban anda!",
      onOk() {
        return sendCompleteTest(() => console.log("ok"));
      },
      onCancel() {},
    });
  };

  const handleExpiredTest = () => {
    Modal.warning({
      title: "Waktu Test Sudah Habis!",
      content: "Anda tidak lagi dapat melanjutkan test ini",
      onOk: () => {
        return sendCompleteTest(handleExpiredTest);
      },
    });
  };

  const handleExecutionNextNumber = (
    _next: any,
    _now: any,
    next_no: number
  ) => {
    if (_now.type == "pilihan") {
      if (selectedKey == "") {
        _now.skipped = true;
        _now.answered = false;
        if (_now.jawaban_user) {
          _now.jawaban_user.key = "";
        } else {
          _now.jawaban_user = {
            key: "",
          };
        }
      } else {
        if (_now.jawaban_user) {
          _now.jawaban_user.key = selectedKey;
        } else {
          _now.jawaban_user = {
            key: selectedKey,
          };
        }
        _now.answered = true;
        _now.skipped = false;
      }
    } else {
      if (essayAnswer.length > 0) {
        if (_now.jawaban_user) {
          _now.jawaban_user.jawaban = essayAnswer;
        } else {
          _now.jawaban_user = {
            jawaban: essayAnswer,
          };
        }
        _now.answered = true;
        _now.skipped = false;
      } else {
        if (_now.jawaban_user) {
          _now.jawaban_user.jawaban = "";
        } else {
          _now.jawaban_user = {
            jawaban: "",
          };
        }
        _now.answered = false;
        _now.skipped = true;
      }
    }

    // console.log(_now, "jawaban user");

    if (_next.type == "pilihan") {
      setSelectedKey(_next?.jawaban_user?.key || "");
      setEssayAnswer("");
    } else {
      setEssayAnswer(_next?.jawaban_user?.jawaban || "");
      setSelectedKey("");
    }
    setSoalNow(_next);
    setNo(next_no);
    setSoal(
      soal.map((val) => {
        if (val.no == no) {
          return _now;
        }
        return val;
      })
    );
  };

  const handleNextQuestion = () => {
    if (no < soal.length) {
      const _next = soal[no - 1 + 1];
      const _now = soalNow;

      let jawaban_id = _now.jawaban.filter((val) => val.key == selectedKey);

      if (jawaban_id.length > 0 && _now.type == "pilihan") {
        handleSendToServer(
          {
            jawaban_id: jawaban_id[0].jawaban_id,
            product_id: soalNow.product_id,
            sub_id: soalNow.sub_id,
            soal_id: soalNow.soal_id,
          },
          _now.type,
          () => {
            handleExecutionNextNumber(_next, _now, no + 1);
          }
        );
      } else if (essayAnswer.length > 0 && _now.type == "essay") {
        handleSendToServer(
          {
            jawaban: essayAnswer,
            product_id: soalNow.product_id,
            sub_id: soalNow.sub_id,
            soal_id: soalNow.soal_id,
          },
          _now.type,
          () => {
            handleExecutionNextNumber(_next, _now, no + 1);
          }
        );
      } else {
        handleExecutionNextNumber(_next, _now, no + 1);
      }
    }
  };

  const handlePreviouseQuestion = () => {
    if (no > 0) {
      const _next = soal[no - 1 - 1];
      const _now = soalNow;
      let jawaban_id = _now.jawaban.filter((val) => val.key == selectedKey);

      if (jawaban_id.length > 0 && _now.type == "pilihan") {
        handleSendToServer(
          {
            jawaban_id: jawaban_id[0].jawaban_id,
            product_id: soalNow.product_id,
            sub_id: soalNow.sub_id,
            soal_id: soalNow.soal_id,
          },
          _now.type,
          () => {
            handleExecutionNextNumber(_next, _now, no - 1);
          }
        );
      } else if (essayAnswer.length > 0 && _now.type == "essay") {
        handleSendToServer(
          {
            jawaban: essayAnswer,
            product_id: soalNow.product_id,
            sub_id: soalNow.sub_id,
            soal_id: soalNow.soal_id,
          },
          _now.type,
          () => {
            handleExecutionNextNumber(_next, _now, no - 1);
          }
        );
      } else {
        handleExecutionNextNumber(_next, _now, no - 1);
      }
    }
  };

  const handleChangeNumber = (item: any) => {
    const _next = item;
    const _now = soalNow;

    let jawaban_id = _now.jawaban.filter((val) => val.key == selectedKey);

    if (jawaban_id.length > 0 && _now.type == "pilihan") {
      handleSendToServer(
        {
          jawaban_id: jawaban_id[0].jawaban_id,
          product_id: soalNow.product_id,
          sub_id: soalNow.sub_id,
          soal_id: soalNow.soal_id,
        },
        _now.type,
        () => {
          handleExecutionNextNumber(_next, _now, item.no);
        }
      );
    } else if (essayAnswer.length > 0 && _now.type == "essay") {
      handleSendToServer(
        {
          jawaban: essayAnswer,
          product_id: soalNow.product_id,
          sub_id: soalNow.sub_id,
          soal_id: soalNow.soal_id,
        },
        _now.type,
        () => {
          handleExecutionNextNumber(_next, _now, item.no);
        }
      );
    } else {
      handleExecutionNextNumber(_next, _now, item.no);
    }
  };

  const router = useRouter();

  // console.log(soal, "datasoal");

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
    setDetail(dataSoal);

    if (dataSoal.soal.length > 0) {
      if (dataSoal.jumlah_akses > 5) {
        Modal.warning({
          title:
            "Batas akses anda adalah 5 kali! anda telah merefresh sebanyak " +
            dataSoal.jumlah_akses +
            " kali!",
          content:
            "Anda tidak diperbolehkan untuk merefresh halaman ini, demi kenyamanan.",
          onOk: () => {
            window.location.replace(
              "/siswa/latihan-soal/" + detailSoal.product_id
            );
          },
          closable: false,
          onCancel: () => {
            window.location.replace(
              "/siswa/latihan-soal/" + detailSoal.product_id
            );
          },
        });
      } else if (dataSoal.jumlah_akses > 0) {
        Modal.warning({
          title:
            "Batas akses anda adalah 5 kali! anda telah merefresh sebanyak " +
            dataSoal.jumlah_akses +
            " kali!",
          content: "Dilarang untuk merefresh halaman ini, demi kenyamanan.",
          onOk: () => {},
          closable: false,
        });
      } else {
        Modal.warning({
          title: "Perhatian!",
          content:
            "Anda tidak diperbolehkan untuk merefresh halaman ini, demi kenyamanan.",
          onOk: () => {},
          closable: false,
        });
      }
      // sorting soal berdasarkan no nya
      // console.log(dataSoal, "dataSoal");
      // console.log(detailSoal, "detailsoal");
      dataSoal.soal.sort((a: any, b: any) => a.no - b.no);
      // if (dataSoal.jumlah_akses <= 5) {
      setSoal([...dataSoal.soal]);
      // setSoal(dataSoal.soal);
      setNo(dataSoal.soal[0].no);
      setSoalNow(dataSoal.soal[0]);

      if (dataSoal.soal[0].type == "pilihan") {
        setSelectedKey(dataSoal.soal[0]?.jawaban_user?.key || "");
        setEssayAnswer("");
      } else {
        setEssayAnswer(dataSoal.soal[0]?.jawaban_user?.jawaban || "");
        setSelectedKey("");
      }
      // }
    } else {
      // const localData = window.localStorage.getItem("preview-soal")
      //   ? JSON.parse(window.localStorage.getItem("preview-soal") || "")
      //   : {};
      // // console.log(localData);
      // if (Object.keys(localData).length > 0) {
      //   setSoal(localData.soal);
      //   if (localData.soal.length > 0) {
      //     setNo(localData.soal[0].no);
      //     setSoalNow(localData.soal[0]);
      //   }
      //   setDetail(localData);
      // } else {
      //   router.push("/soal/paket-soal");
      // }
    }
  }, [dataSoal]);

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

  // console.log(soalNow, "soalnow");

  return (
    <div>
      {/* <CustomHeader
        title="Mengerjakan Soal"
        isSubMenu
        subMenu={[
          {
            title: "Mengerjakan Soal",
          },
        ]}
      /> */}
      <LoadingNonFullscreen spinning={loading}>
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
              {soal.map((item, index: number) => {
                let color = "#F3F3F3";
                let fontColor = "#333333";
                if (item.jawaban_user?.jawaban || item.jawaban_user?.key) {
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
                      handleChangeNumber(item);
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
                      borderColor:
                        fontColor == "#333333" ? undefined : fontColor,
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
                {/* <Typography
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
              </Typography> */}
                <Space wrap size={"small"}>
                  <div
                    style={{
                      border: "1px solid #D0E6E7",
                      padding: "2px 6px",
                      background:
                        "linear-gradient(0deg, #EBF5F5, #EBF5F5), linear-gradient(0deg, #D0E6E7, #D0E6E7)",
                      borderRadius: "6px",
                      color: "#3A9699",
                    }}
                  >
                    {detailSoal.category_name}
                  </div>
                  <div
                    style={{
                      border: "1px solid #F3F3F3",
                      padding: "2px 6px",
                      background:
                        "linear-gradient(0deg, #F7F7F7, #F7F7F7), linear-gradient(0deg, #F3F3F3, #F3F3F3)",
                      borderRadius: "6px",
                      color: "#525252",
                    }}
                  >
                    {detailSoal.sub_category_name}
                  </div>
                </Space>
                <Typography
                  style={{
                    fontSize: 20,
                    color: "#333333",
                    fontWeight: "600",
                    margin: 0,
                  }}
                >
                  {detail.title}
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
                      value={end_duration}
                      valueStyle={{
                        fontSize: 14,
                        fontWeight: 600,
                        margin: 0,
                        color: "#7A7A7A",
                      }}
                      onFinish={() => {
                        // console.log("TEST");
                        handleExpiredTest();
                      }}
                    />
                    {/* <Typography
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        margin: 0,
                        color: "#7A7A7A",
                      }}
                    >
                      {countdownTimer(end_duration)}
                    </Typography> */}
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

              {soalNow.type == "essay" ? (
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <Input.TextArea
                    rows={4}
                    value={essayAnswer}
                    onChange={(e) => {
                      setEssayAnswer(e.target.value);
                    }}
                  />
                </div>
              ) : (
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
                              color:
                                val.key == selectedKey ? "#fff" : "#333333",
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
              )}
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
                  // if (no > 0) {
                  //   setSoalNow(soal[no - 1 - 1]);
                  //   setNo(no - 1);
                  //   setSelectedKey("");
                  // }
                  handlePreviouseQuestion();
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
                    // exit fullscreen tanpa trigger state

                    handleCompleteTest();
                  }}
                >
                  Selesaikan
                  <ArrowRightOutlined />
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </LoadingNonFullscreen>
    </div>
  );
};

export default PreviewSoal;
