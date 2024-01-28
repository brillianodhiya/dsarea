"use client";

import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";
import LoadingNonFullscreen from "@dsarea/@/components/LoadingComponent/LoadingComponentParent";
import SelectCategory from "@dsarea/@/components/Select/SelectCategory";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Upload,
  UploadProps,
  message,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const AddProduct = (props: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const [imageUrl, setImageUrl] = React.useState<string>();
  const [imageLoading, setImageLoading] = React.useState(false);

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const propsUpload: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    customRequest: dummyRequest,

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        setImageLoading(true);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        getBase64(info.file.originFileObj, (url) => {
          setImageUrl(url);
          setImageLoading(false);
        });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  };

  return (
    <div>
      <CustomHeader
        title="Buat Product"
        isSubMenu
        subMenu={[
          {
            title: "Soal",
          },
        ]}
      />
      <LoadingNonFullscreen spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          name="formaddProduct"
          requiredMark={(label: React.ReactNode) => label}
        >
          <Row
            style={{
              marginTop: "3vh",
              width: "100%",
            }}
          >
            <Col
              xxl={{
                offset: 4,
                span: 16,
              }}
              xl={{
                offset: 4,
                span: 16,
              }}
              lg={{
                offset: 4,
                span: 16,
              }}
              md={{
                offset: 1,
                span: 22,
              }}
              sm={{
                offset: 1,
                span: 22,
              }}
              xs={{
                offset: 1,
                span: 22,
              }}
            >
              <Form.Item
                name={"image"}
                rules={[
                  {
                    required: true,
                    message: "Gambar tidak boleh kosong!",
                  },
                ]}
                valuePropName="file"
              >
                <Upload.Dragger {...propsUpload} accept=".png,.jpg">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="banner image"
                      width={20}
                      height={20}
                      style={{
                        width: "100%",
                        height: 100,
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <>
                      {imageLoading ? (
                        <LoadingOutlined />
                      ) : (
                        <>
                          <CloudUploadOutlined
                            style={{
                              fontSize: 44,
                              color: "#667085",
                            }}
                          />
                          <p className="ant-upload-text">Click to upload</p>
                          <p className="ant-upload-hint">png atau jpeg</p>
                        </>
                      )}
                    </>
                  )}
                </Upload.Dragger>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row>
                <Col
                  xxl={{
                    offset: 4,
                    span: 8,
                  }}
                  xl={{
                    offset: 4,
                    span: 8,
                  }}
                  lg={{
                    offset: 4,
                    span: 8,
                  }}
                  md={{
                    offset: 1,
                    span: 11,
                  }}
                  sm={{
                    offset: 1,
                    span: 22,
                  }}
                  xs={{
                    offset: 1,
                    span: 22,
                  }}
                  style={{
                    paddingRight: "12px",
                  }}
                >
                  <Form.Item
                    name="expired_date"
                    //   label="DatePicker"
                    //   noStyle
                    rules={[
                      {
                        type: "array" as const,
                        required: true,
                        message: "Please select time!",
                      },
                    ]}
                  >
                    <DatePicker.RangePicker
                      style={{
                        margin: "8px 0px",
                      }}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  </Form.Item>

                  <Form.Item
                    name="nama_product"
                    label="Nama Produk"
                    rules={[
                      {
                        required: true,
                        message: "Masukkan nama produk!",
                      },
                    ]}
                  >
                    <Input placeholder="Input Nama Produk" />
                  </Form.Item>
                  <Form.Item name="harga" label="Harga" initialValue={0}>
                    <InputNumber
                      addonBefore={
                        <span
                          style={{
                            color: "#3a9699",
                          }}
                        >
                          Rp
                        </span>
                      }
                      style={{ width: "100%" }}
                      placeholder="0,00"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      min={0}
                      parser={(value: any) => value.replace(/\Rp\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                  <Form.Item
                    name="category_id"
                    label="Pilih Category"
                    rules={[
                      {
                        required: true,
                        message: "Pilih kategori yang akan dijadikan produk!",
                        type: "array",
                      },
                    ]}
                  >
                    <SelectCategory multiple={true} />
                  </Form.Item>
                </Col>
                <Col
                  xxl={{
                    span: 8,
                    pull: 1,
                  }}
                  xl={{
                    span: 8,
                    pull: 1,
                  }}
                  lg={{
                    span: 8,
                    pull: 1,
                  }}
                  md={{
                    span: 11,
                    pull: 1,
                  }}
                  sm={{
                    offset: 1,
                    span: 22,
                  }}
                  xs={{
                    offset: 1,
                    span: 22,
                  }}
                  style={{
                    paddingLeft: "12px",
                  }}
                >
                  <Form.Item name="desc" label="Description" initialValue={""}>
                    <Input.TextArea placeholder="Input Description" rows={5} />
                  </Form.Item>
                  <Form.Item name="benefit" label="Benefit" initialValue={""}>
                    <Input.TextArea placeholder="Input Benefit" rows={5} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col
              xxl={{
                offset: 4,
                span: 16,
              }}
              xl={{
                offset: 4,
                span: 16,
              }}
              lg={{
                offset: 4,
                span: 16,
              }}
              md={{
                offset: 1,
                span: 22,
                pull: 1,
              }}
              sm={{
                offset: 1,
                span: 22,
                pull: 1,
              }}
              xs={{
                offset: 1,
                span: 22,
                pull: 1,
              }}
              style={{
                textAlign: "right",
              }}
            >
              <Form.Item>
                <Space>
                  <Button
                    onClick={() => {
                      router.push("/soal/product");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="!bg-green-500 !hover:bg-green-600"
                    onClick={() => {
                      form
                        .validateFields()
                        .then((values) => {
                          console.log(values, "values");
                          const formData = new FormData();
                          formData.append(
                            "image",
                            values.image.file.originFileObj
                          );
                          formData.append("nama_product", values.nama_product);
                          formData.append("desc", values.desc);
                          formData.append("benefit", values.benefit);
                          formData.append("harga", values.harga);
                          values.category_id.map((v: any, idx: number) => {
                            formData.append(`category_id[${idx}]`, v);
                          });
                          formData.append(
                            "having_expired",
                            values.having_expired
                          );
                          formData.append(
                            "expired_date",
                            values.expired_date[1].format("YYYY-MM-DD HH:mm:ss")
                          );
                          formData.append(
                            "start_date",
                            values.expired_date[0].format("YYYY-MM-DD HH:mm:ss")
                          );

                          setLoading(true);
                          axiosClientInstance
                            .post("/api/soal/product/create", formData, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            })
                            .then((ok) => {
                              setLoading(false);
                              message.success(ok.data.message);
                              router.push("/soal/product");
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
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </LoadingNonFullscreen>
    </div>
  );
};

export default AddProduct;
