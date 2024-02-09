"use client";
import { SearchOutlined } from "@ant-design/icons";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { formatRupiah } from "@dsarea/@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Empty, Input, Row, Segmented, Skeleton, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import SkeletonImage from "antd/es/skeleton/Image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  const [activeMenu, setActiveMenu] = React.useState("bootcamp");
  const [page, setPage] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["kelas", page, activeMenu],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        `/api/kelas/${activeMenu}/1/10`
      );
      return res.data.data;
    },
    initialData: [
      {
        id: "id",
        name: "name",
        coverImage: null,
        amount: "0",
      },
    ],
  });

  const filteredData = data.filter((e: any) => e.id !== "id");

  // console.log(process.env.NEXT_PUBLIC_URL_COURSE_MAYAR);
  return (
    <div>
      <CustomHeader title="Kelas" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap gutter={[16, 16]}>
          <Col>
            <Segmented
              onChange={(e: any) => {
                // console.log(e);
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
                // {
                //   label: "Product Digital",
                //   value: "digital-product",
                // },
                // {
                //   label: "Bundling",
                //   value: "bundling",
                // },
              ]}
            />
          </Col>
          <Col>
            <Input
              placeholder="Search anything..."
              suffix={<SearchOutlined />}
              className="!w-[calc(100%-30px)]"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
        </Row>

        <Row
          gutter={[24, 24]}
          justify={
            filteredData.length === 0 && !isFetching ? "center" : "start"
          }
          className="max-h-[86vh] overflow-y-scroll overflow-x-hidden"
        >
          {isFetching ? (
            <Card
              loading={isFetching}
              hoverable
              style={{
                maxWidth: 252,
              }}
              cover={
                <div>
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
                    {activeMenu == "bootcamp"
                      ? "Kelas Cohort/Bootcamp"
                      : activeMenu === "online"
                      ? "Kelas Online"
                      : activeMenu === "digital-product"
                      ? "Product Digital"
                      : "Bundling"}
                  </Tag>
                  {/* <SkeletonImage
                      active
                      style={{
                        // display: "inline-block",
                        // width: 250,
                        width: "auto",
                        overflow: "hidden",
                      }}
                    /> */}

                  <Image
                    alt="cover image"
                    src={"/card-image.svg"}
                    width={250}
                    height={333}
                    className="w-full aspect-square object-contain object-center"
                  />
                </div>
              }
            >
              {/* <Skeleton loading={isFetching} active> */}
              <Meta title={"title"} description={formatRupiah(0)} />
              {/* </Skeleton> */}
            </Card>
          ) : filteredData.length === 0 ? (
            <Col>
              <Empty description="Data not found" />
            </Col>
          ) : (
            searchFromValue(data, searchText)
              .filter((e: any) => e.id !== "id")
              .map((e: any, i: any) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={8} key={i}>
                  <Link href={e.link} target="_blank">
                    <Card
                      loading={isFetching}
                      hoverable
                      style={{
                        maxWidth: 252,
                      }}
                      cover={
                        <div>
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
                            {activeMenu == "bootcamp"
                              ? "Kelas Cohort/Bootcamp"
                              : activeMenu === "online"
                              ? "Kelas Online"
                              : activeMenu === "digital-product"
                              ? "Product Digital"
                              : "Bundling"}
                          </Tag>
                          {/* <SkeletonImage
                      active
                      style={{
                        // display: "inline-block",
                        // width: 250,
                        width: "auto",
                        overflow: "hidden",
                      }}
                    /> */}

                          <Image
                            alt="cover image"
                            src={
                              e.coverImage
                                ? e.coverImage.url
                                : "/card-image.svg"
                            }
                            width={250}
                            height={333}
                            className="w-full aspect-square object-contain object-center"
                          />
                        </div>
                      }
                    >
                      {/* <Skeleton loading={isFetching} active> */}
                      <Meta
                        title={e.name}
                        description={formatRupiah(e.amount)}
                      />
                      {/* </Skeleton> */}
                    </Card>
                  </Link>
                </Col>
              ))
          )}
        </Row>
      </Card>
    </div>
  );
}
