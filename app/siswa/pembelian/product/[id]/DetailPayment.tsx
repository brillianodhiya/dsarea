"use client";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { ProfileContext } from "@dsarea/@/lib/ProfileContext";
import { formatRupiah } from "@dsarea/@/lib/utils";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useContext } from "react";

const { useBreakpoint } = Grid;

export default function ContainerLatihanSoal({ dataProudct }: any) {
  const { data } = useContext(ProfileContext);
  const [form] = Form.useForm();
  const [loadingData, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [discountId, setDiscountId] = useState(null);
  const router = useRouter();
  const screens = useBreakpoint();

  console.log(dataProudct.data[0].image);

  const onFinish = async (values: any) => {
    const body = {
      voucher_id: discountId,
      product_id: dataProudct.data[0].id,
      no_kontak: values.no_kontak,
    };
    try {
      const res = await axiosClientInstance.post(
        "/api/users/pembelian/product",
        body
      );
      // open external link
      router.replace(res?.data?.data?.mayar_link);
      // console.log(res.data.data.mayar_link, "res");
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
    // console.log(body, "body");
    // router.replace("https://aiti-70874.mayar.shop/pl/wp0th6b381");
  };

  const checkCodeVoucher = async (code: string) => {
    try {
      setLoading(true);
      const res = await axiosClientInstance.get(
        `/api/voucher/user/check/${code}`
      );
      setLoading(false);
      console.log(res.data.data, "data");
      if (res.data.data) {
        setDiscount(res.data.data.diskon);
        setDiscountId(res.data.data.id);
      }
      message.success(`${res.data.message}`);
    } catch (error: any) {
      setLoading(false);
      setDiscount(0);
      setDiscountId(null);

      message.error(error.response.data.message);
    }
  };

  return (
    <Form form={form} name="payment" onFinish={onFinish}>
      <Row className="p-6" gutter={[24, 24]}>
        <Col
          xl={{
            span: 16,
          }}
          xs={24}
        >
          <Card title="Product">
            <div className="flex justify-between flex-wrap gap-4">
              <div className="flex gap-4 flex-wrap">
                <Image
                  alt="product-image"
                  src={dataProudct.data[0].image ?? "/card-image.svg"}
                  width={500}
                  height={500}
                  style={{
                    width: 122,
                    height: 74,
                    objectFit: "contain",
                    borderRadius: 8,
                    backgroundColor: "#3a9699",
                  }}
                />

                <div>
                  <div
                    style={{
                      color: "#7A7A7A",
                    }}
                  >
                    Nama
                  </div>
                  <div className="font-semibold">
                    {dataProudct.data[0].nama_product}
                  </div>
                  <div
                    style={{
                      color: "#7A7A7A",
                    }}
                  >
                    Expired at : {moment().format("DD/MM/YYYY HH:mm")}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-4  item-start sm:items-center">
                  <div
                    style={{
                      color: "#7A7A7A",
                    }}
                  >
                    Harga
                  </div>
                  <div className="font-semibold">
                    {formatRupiah(dataProudct.data[0].harga)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card
            style={{
              marginTop: 20,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>Input Voucher</div>
              </Col>
              <Col xl={16} lg={16} md={16} sm={16} xs={24}>
                <Form.Item name={"code"}>
                  <div className="flex">
                    <Input
                      placeholder="Code Voucher"
                      style={{
                        marginRight: 10,
                      }}
                    />
                    <Button
                      type="primary"
                      loading={loadingData}
                      onClick={() =>
                        form.getFieldValue("code")?.length > 0 &&
                        checkCodeVoucher(form.getFieldValue("code"))
                      }
                    >
                      Check
                    </Button>
                  </div>
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>Email</div>
              </Col>
              <Col xl={16} lg={16} md={16} sm={16} xs={24}>
                <Form.Item
                  name={"email"}
                  initialValue={data.email}
                  rules={[
                    { required: true, message: "Please input Email!" },
                    {
                      type: "email",
                      message: "Please input valid email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>Nomor Kontak</div>
              </Col>
              <Col xl={16} lg={16} md={16} sm={16} xs={24}>
                <Form.Item
                  name={"no_kontak"}
                  rules={[
                    { required: true, message: "Please input Nomor Kontak!" },
                    {
                      pattern: /^(\+62|62|0)8[1-9][0-9]{6,13}$/g,
                      message: "Nomor Kontak not valid!",
                    },
                  ]}
                >
                  <Input placeholder="Kontak" />
                </Form.Item>
              </Col>
            </Row>
            {/* <div>
              <Form.Item name={"voucher_id"}>
                <Input placeholder="Voucher" />
              </Form.Item>
            </div>
            <Form.Item name={"email"} initialValue={data.email}>
              <Input
                placeholder="Email"
                type="email"
                defaultValue={data.email}
              />
            </Form.Item>
            <Form.Item
              name={"no_kontak"}
              rules={[
                { required: true, message: "Please input Nomor Kontak!" },
                {
                  pattern: /^(\+62|62|0)8[1-9][0-9]{6,13}$/g,
                  message: "Nomor Kontak not valid!",
                },
              ]}
            >
              <Input placeholder="Kontak" />
            </Form.Item> */}
          </Card>
        </Col>
        <Col
          xl={{
            span: 8,
          }}
          xs={24}
        >
          <Card
            title={
              <div className="py-6">
                <div className="flex justify-between">
                  <div className="font-normal">Harga</div>
                  <div className="font-normal">
                    {formatRupiah(dataProudct.data[0].harga)}
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="font-normal">Discount</div>
                  <div className="font-normal">{discount} %</div>
                </div>
              </div>
            }
          >
            <div className="flex justify-between">
              <div>Total Harga</div>
              <div>
                {formatRupiah(
                  dataProudct.data[0].harga -
                    (dataProudct.data[0].harga * discount) / 100
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Form.Item
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",

          justifyContent: "flex-end",
          marginRight: 24,
          marginLeft: 24,
        }}
      >
        <Button
          style={{
            borderWidth: 1,
            borderColor: "#3A9699",
            color: "#3A9699",
            marginRight: 10,
            marginTop: 10,
          }}
          type="link"
          onClick={() => {
            Modal.confirm({
              title: "Batalkan Pembayaran?",
              icon: <ExclamationCircleOutlined />,
              content: "Apakah anda yakin ingin membatalkan pembayaran?",
              onOk() {
                router.back();
              },
              onCancel() {},
            });
          }}
        >
          Batalkan
        </Button>
        <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
          Lanjutkan Pembayaran
        </Button>
      </Form.Item>
    </Form>
  );
}
