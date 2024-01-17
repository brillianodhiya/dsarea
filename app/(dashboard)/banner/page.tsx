"use client";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import AddBannerModal from "@dsarea/@/components/Modals/Banner/AddBannerModal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Col, Input, Row, Space, Tag, Typography, message } from "antd";
import Meta from "antd/es/card/Meta";
import Button from "antd/lib/button";
import Image from "next/image";
import React from "react";

export default function Page() {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [countFetch, setCountFetch] = React.useState(0);
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["Banner"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/banner/list");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        name: "test",
        desc: "test",
        image: "/card-image.svg",
      },
    ],
  });

  console.log(data);

  return (
    <div>
      <AddBannerModal
        open={openAddModal}
        onCreate={async (values) => {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("desc", values.description);
          formData.append("image", values.image);
          try {
            setLoading(true);
            const res = await axiosClientInstance.post(
              "/api/banner/create",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            queryClient.invalidateQueries({
              queryKey: ["Banner"],
            });
            setLoading(false);
            message.success(`${res.data.message}`);
            setOpenAddModal(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
            message.error(
              `${(error as any).response.data.message} : ${
                (error as any).response.data
              }`
            );
          }
          console.log(values);
        }}
        onCancel={() => {
          setOpenAddModal(false);
        }}
        loading={false}
      />
      <CustomHeader title="Banner" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Banner
            </Typography.Text>
          </Col>
          <Col>
            <Space wrap>
              <Input
                placeholder="Search anything..."
                suffix={<SearchOutlined />}
                className="!w-[250px]"
              />
              <Button
                type="primary"
                onClick={() => setOpenAddModal(true)}
                color="red"
                icon={<PlusOutlined />}
              >
                Unggah Banner
              </Button>
            </Space>
          </Col>
        </Row>

        {data.map((e: any, i: any) => (
          <Card
            style={{
              marginTop: 20,
            }}
            loading={isFetching}
            key={i}
            bodyStyle={{
              padding: 0,
              margin: 0,
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Image
              alt="example"
              // src={"/card-image.svg"}
              src={e.image}
              width={240}
              height={100}
            />

            <div className="flex-row p-4 ">
              {/* <Typography.Text strong>{e.title}</Typography.Text>
              <Typography.Paragraph>{e.desc}</Typography.Paragraph> */}
              <Meta title={e.title} description={e.desc} />
            </div>

            <Tag
              style={{
                position: "absolute",
                zIndex: 1,
                right: "10px",
                borderRadius: "10px",
              }}
              color={e.status ? "#32D583" : "#F04438"}
            >
              {e.status ? "Active" : "Inactive"}
            </Tag>
          </Card>
        ))}
      </Card>
    </div>
  );
}
