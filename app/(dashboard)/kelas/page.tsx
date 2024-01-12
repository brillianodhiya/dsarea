"use client";
import { SearchOutlined } from "@ant-design/icons";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import { Card, Col, Input, Row, Segmented, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

export default function Page() {
  const [activeMenu, setActiveMenu] = React.useState("bootcamp");
  const [dataKelas, setDataKelas] = React.useState([]);

  return (
    <div>
      <CustomHeader title="Kelas" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap gutter={[16, 16]}>
          <Col>
            <Segmented
              onChange={(e: any) => {
                console.log(e);
                setActiveMenu(e);
              }}
              options={[
                {
                  label: "Kelas Cohort/Bootcamp",
                  value: "bootcamp",
                },
                {
                  label: "Kelas Online",
                  value: "online",
                },
                {
                  label: "Product Digital",
                  value: "digital-product",
                },
                {
                  label: "Bundling",
                  value: "bundling",
                },
              ]}
            />
          </Col>
          <Col>
            <Input
              placeholder="Search anything..."
              suffix={<SearchOutlined />}
              className="!w-[250px]"
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          {[...Array(20)].map((e, i) => (
            <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4} key={i}>
              {/* <Tag
                style={{
                  position: "absolute",
                  // right: 0,
                  zIndex: 1,
                }}
              >
                Kelas Online
              </Tag> */}
              <Card
                hoverable
                style={{
                  maxWidth: 300,
                }}
                cover={
                  <>
                    <Tag
                      style={{
                        position: "absolute",
                        margin: 10,
                        borderRadius: 100,
                        // maxWidth: 200,
                        textAlign: "center",
                        right: 0,
                        width: "max-content",
                      }}
                      color="#AFCF5B"
                    >
                      Kelas Online
                    </Tag>
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      style={{
                        height: 250,
                        width: 333,
                      }}
                    />
                  </>
                }
              >
                <Meta
                  title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nisi ratione temporibus? Deleniti itaque consequatur explicabo odio commodi quas molestias, quam quibusdam. A sapiente repellendus, placeat dicta error vitae eius!"
                  description="Rp 29.000"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
}
