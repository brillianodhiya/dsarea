"use client";
import { ClockCircleOutlined, UpOutlined } from "@ant-design/icons";
import { Card } from "@dsarea/@/components/DragnDrop/Card";
import DynamicFormAddSoal from "@dsarea/@/components/Form/DynamicForm";
import LoadingNonFullscreen from "@dsarea/@/components/LoadingComponent/LoadingComponentParent";
import SelectCategory from "@dsarea/@/components/Select/SelectCategory";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import {
  Affix,
  Button,
  Col,
  Collapse,
  Drawer,
  Form,
  Grid,
  Input,
  InputNumber,
  Row,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface KonfigurasiProps {
  FooterAction?: any;
  title?: string;
  form: any;
}

// Membuat tipe data untuk object soal
type Soal = {
  no: number;
  type: string;
  soal: string;
  image?: string; // key image bersifat opsional
  audio?: string; // key audio bersifat opsional
  jawaban: Array<{
    key: string;
    image?: string; // key image bersifat opsional
    audio?: string; // key audio bersifat opsional
    jawaban: string;
  }>;
};

const { useBreakpoint } = Grid;

// Membuat fungsi untuk mengembalikan array dari value image dan audio
function getImageAndAudio(obj: { soal: Soal[] }): string[] {
  // Membuat array kosong untuk menyimpan hasil
  let result: string[] = [];

  // Melakukan iterasi untuk setiap elemen di obj.soal
  for (let elem of obj.soal) {
    // Menambahkan value image dan audio dari elem ke result jika ada
    if (elem.image) result.push(elem.image);
    if (elem.audio) result.push(elem.audio);

    // Melakukan iterasi untuk setiap elemen di elem.jawaban
    for (let subElem of elem.jawaban) {
      // Menambahkan value image dan audio dari subElem ke result jika ada
      if (subElem.image) result.push(subElem.image);
      if (subElem.audio) result.push(subElem.audio);
    }
  }

  // Mengembalikan array result
  return result;
}

const KonfigurasiSoal = ({ FooterAction, title, form }: KonfigurasiProps) => {
  const screens = useBreakpoint();

  return (
    <div className="w-full relative">
      <div
        className={
          screens.md
            ? "bg-[#F3F3F3] border border-solid border-[#F3F3F3] h-[93vh] flex flex-col overflow-y-scroll fixed"
            : "bg-[#F3F3F3] border border-solid border-[#F3F3F3] h-[93vh] flex flex-col overflow-y-scroll fixed"
        }
      >
        <Collapse
          bordered={false}
          defaultActiveKey={["Konfigurasi Soal", "List Soal"]}
          expandIcon={({ isActive }) => (
            <UpOutlined rotate={isActive ? 0 : 180} />
          )}
          expandIconPosition="end"
          style={{
            background: "#fff",
            borderRadius: 0,
            width: screens.md ? "21vw" : "100%",
            position: "relative",
          }}
          //   style={{ background: token.colorBgContainer }}
          items={[
            {
              key: "Konfigurasi Soal",
              label: "Konfigurasi Soal",
              children: (
                <>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Kategori tidak boleh kosong!",
                      },
                    ]}
                    name="category_id"
                    label="Nama Kategori"
                  >
                    <SelectCategory />
                  </Form.Item>
                  <Form.Item
                    name="duration"
                    label="Batas Waktu"
                    rules={[
                      {
                        required: true,
                        message: "Batas Waktu tidak boleh kosong!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Batas Waktu"
                      suffix={
                        <Tooltip title="Batas waktu dalam menit">
                          <ClockCircleOutlined style={{ color: "#3A9699" }} />
                        </Tooltip>
                      }
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="rules"
                    label="Tata Cara Pengerjaan Soal"
                    rules={[
                      {
                        required: true,
                        message: "Tata cara tidak boleh kosong!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Tata Cara Pengerjaan Soal"
                    />
                  </Form.Item>
                </>
              ),
            },
            {
              key: "List Soal",
              label: "List Soal",
              children: (
                <>
                  <Form.Item shouldUpdate noStyle>
                    {() => {
                      return (
                        <Typography
                          style={{
                            fontWeight: 500,
                            marginTop: "8px",
                            paddingBottom: "8px",
                          }}
                        >
                          {title}
                        </Typography>
                      );
                    }}
                  </Form.Item>
                  <div
                    className="-ml-4 w-[108%] h-[33vh] overflow-y-scroll"
                    style={{
                      borderTop: "1px solid #F3F3F3",
                    }}
                  >
                    {/* <Container /> */}
                    <Form.Item noStyle shouldUpdate>
                      {() => (
                        <Form.List name="soal">
                          {(fields, { move }) => (
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              {fields.map((field, index) => (
                                <Card
                                  key={field.key}
                                  index={index}
                                  id={index + 1}
                                  text={
                                    form.getFieldValue("soal")?.[index]?.no +
                                    ". " +
                                    form.getFieldValue("soal")?.[index]?.soal
                                  }
                                  moveCard={move}
                                  form={form}
                                />
                              ))}
                            </div>
                          )}
                        </Form.List>
                      )}
                    </Form.Item>
                  </div>
                </>
              ),
            },
          ]}
        />
        {FooterAction}
      </div>
    </div>
  );
};

const JudulForm = ({ onChange, value }: { onChange?: any; value?: any }) => {
  return (
    <Typography.Title
      editable={{
        text: value,
        onChange: onChange,
      }}
      level={4}
      style={{ margin: 0 }}
    >
      {value}
    </Typography.Title>
  );
};

export default function AddSoal() {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [titleSoal, setTitleSoal] = React.useState("Judul Soal...");
  const router = useRouter();
  const screens = useBreakpoint();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <CustomHeader
        title="Buat Soal"
        isSubMenu
        subMenu={[
          {
            title: "Tambah Paket Soal (Sub Kategori)",
          },
        ]}
      />
      <LoadingNonFullscreen spinning={loading}>
        <DndProvider backend={HTML5Backend}>
          <Form form={form} layout="vertical" name="formaddSoal">
            <div
              style={{
                height: "93vh",
                overflowY: "scroll",
              }}
            >
              <Row>
                <Col
                  xxl={18}
                  xl={18}
                  lg={16}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{
                    padding: screens.md ? "3em 6em" : "3em 1em",
                  }}
                >
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Judul soal tidak boleh kosong!",
                      },
                    ]}
                    name="title"
                    initialValue={"Judul Soal..."}
                    valuePropName="value"
                    style={{
                      marginBottom: "34px",
                    }}
                  >
                    <JudulForm value={titleSoal} onChange={setTitleSoal} />
                  </Form.Item>
                  <DynamicFormAddSoal form={form} />
                </Col>
                <Col xxl={6} xl={6} lg={8} md={0} sm={0} xs={0} style={{}}>
                  <KonfigurasiSoal
                    FooterAction={
                      <div className="w-full text-center flex flex-row justify-center gap-3 my-4">
                        <Button
                          style={{
                            width: "40%",
                          }}
                          onClick={() => {
                            form
                              .validateFields()
                              .then((values) => {
                                const _data = getImageAndAudio(values);
                                setLoading(true);
                                axiosClientInstance
                                  .post("/api/soal/sub/category/create", {
                                    ...values,
                                    bulk_file: _data,
                                  })
                                  .then((ok) => {
                                    setLoading(false);
                                    message.success(ok.data.message);
                                    router.push("/soal/paket-soal");
                                  })
                                  .catch((err) => {
                                    setLoading(false);
                                    message.error(err.response.data.message);
                                  });
                              })
                              .catch((info) => {
                                // console.log("Validate Failed:", info);
                              });
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          type="primary"
                          style={{
                            width: "40%",
                          }}
                          onClick={() => {
                            form
                              .validateFields()
                              .then((values) => {
                                const _data = getImageAndAudio(values);
                                // console.log(values, "values");
                                window.localStorage.setItem(
                                  "preview-soal",
                                  JSON.stringify({
                                    ...values,
                                    bulk_file: _data,
                                  })
                                );
                                window.open(
                                  "/soal/paket-soal/preview-soal/0",
                                  "_blank"
                                );
                              })
                              .catch((info) => {
                                // console.log("Validate Failed:", info);
                              });
                          }}
                        >
                          Preview
                        </Button>
                      </div>
                    }
                    title={titleSoal}
                    form={form}
                  />
                </Col>
              </Row>
              <Affix
                offsetBottom={40}
                style={{
                  display: screens.md ? "none" : "block",
                  zIndex: 1000,
                }}
              >
                <Button
                  type="primary"
                  onClick={() => setOpen(!open)}
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  Soal Setting
                </Button>
              </Affix>
              <Drawer
                title="Setting Soal"
                onClose={() => setOpen(!open)}
                open={open}
                styles={{
                  body: {
                    padding: 0,
                  },
                }}
              >
                <KonfigurasiSoal
                  FooterAction={
                    <div className="w-full text-center flex flex-row justify-center gap-3 mt-4 mb-10">
                      <Button
                        style={{
                          width: "40%",
                        }}
                        onClick={() => {
                          form
                            .validateFields()
                            .then((values) => {
                              const _data = getImageAndAudio(values);
                              setLoading(true);
                              axiosClientInstance
                                .post("/api/soal/sub/category/create", {
                                  ...values,
                                  bulk_file: _data,
                                })
                                .then((ok) => {
                                  setLoading(false);
                                  message.success(ok.data.message);
                                  router.push("/soal/paket-soal");
                                })
                                .catch((err) => {
                                  setLoading(false);
                                  message.error(err.response.data.message);
                                });
                            })
                            .catch((info) => {
                              // console.log("Validate Failed:", info);
                            });
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        type="primary"
                        style={{
                          width: "40%",
                        }}
                        onClick={() => {
                          form
                            .validateFields()
                            .then((values) => {
                              const _data = getImageAndAudio(values);
                              // console.log(values, "values");
                              window.localStorage.setItem(
                                "preview-soal",
                                JSON.stringify({
                                  ...values,
                                  bulk_file: _data,
                                })
                              );
                              window.open(
                                "/soal/paket-soal/preview-soal/0",
                                "_blank"
                              );
                            })
                            .catch((info) => {
                              // console.log("Validate Failed:", info);
                            });
                        }}
                      >
                        Preview
                      </Button>
                    </div>
                  }
                  title={titleSoal}
                  form={form}
                />
              </Drawer>
            </div>
          </Form>
        </DndProvider>
      </LoadingNonFullscreen>
    </div>
  );
}
