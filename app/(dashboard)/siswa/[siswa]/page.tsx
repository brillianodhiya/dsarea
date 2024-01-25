"use client";
import TimeIcon from "@dsarea/@/components/icons/TimeIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Empty,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function Page(props: any) {
  const userId = props.params.siswa;
  const [profileData, setProfileData] = useState<any>({});

  useEffect(() => {
    const items = localStorage.getItem("siswaData");
    if (items) {
      setProfileData(JSON.parse(items));
    }
  }, []);

  const { data, isFetching } = useQuery({
    queryKey: ["detail_siswa"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        "/api/users/siswa/list/product/" + userId
      );
      return res.data.data;
    },
    initialData: [
      {
        id: "id",
        name: "test",
        desc: "test",
      },
    ],
  });

  const menu = [
    {
      title: "Siswa",
    },
  ];
  const filteredData = data.filter((e: any) => e.id !== "id");
  return (
    <div>
      <CustomHeader title="Detail Siswa" isSubMenu={true} subMenu={menu} />

      <Card className="!m-6">
        <Space size="middle">
          <Avatar size={64} src={profileData?.picture} />
          <div>
            <Space>
              <Typography.Text strong>{profileData?.name}</Typography.Text>
              <Tag
                color={profileData?.status == "active" ? "#EBF5F5" : "#F7F7F7"}
                style={{
                  color:
                    profileData?.status == "active" ? "#3A9699" : "#7A7A7A",
                  borderRadius: 100,
                  textTransform: "capitalize",
                }}
              >
                {profileData?.status}
              </Tag>
            </Space>
            <Typography>{profileData?.email}</Typography>
          </div>
        </Space>
        <div className="border-b w-fit px-4 border-[#3A9699] my-6">
          <Typography className="!text-[#3A9699]">Paket Soal</Typography>
        </div>

        <Row gutter={[24, 24]}>
          {isFetching ? (
            <Col span={6}>
              <Skeleton active />
            </Col>
          ) : filteredData.length == 0 ? (
            <Col span={24}>
              <Empty description="Belum ada paket soal yang dipilih" />
            </Col>
          ) : (
            data.map((e: any, i: any) => (
              <Col xl={6} lg={8} md={12} sm={12} xs={24} key={i}>
                <Card loading={isFetching}>
                  <Space align="center">
                    <Typography.Text strong className="!text-xl">
                      {e.nama_product}
                    </Typography.Text>
                    <Tag
                      style={{
                        borderRadius: 20,
                        color: e.status == "selesai" ? "#7A7A7A" : "#FFF",
                      }}
                      color={
                        e.status == "active"
                          ? "#32D583"
                          : e.status == "expired"
                          ? "#F04438"
                          : "#F7F7F7"
                      }
                    >
                      {e.status == "active" ? "Active" : "Inactive"}
                    </Tag>
                  </Space>
                  <Typography>
                    Expired at :{" "}
                    {moment(e.expired_at).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                  <Space wrap>
                    <Space>
                      <TimeIcon />
                      <Typography.Text strong style={{ color: "#FDB022" }}>
                        {e.total_duration} min
                      </Typography.Text>
                    </Space>
                    <Space>
                      <Badge color="#3A9699" />
                      Total Pertanyaan : {e.total_soal}
                    </Space>
                  </Space>
                  <div>
                    {e.category_name.map((val: any) => (
                      <Tag
                        key={val}
                        color="#EBF5F5"
                        className="!text-[#3A9699] !border !border-[#D0E6E7] !rounded-md !font-bold"
                      >
                        {val}
                      </Tag>
                    ))}
                  </div>
                  <div>
                    <Typography className="!text-xs !text-[#7A7A71]">
                      Score
                    </Typography>
                    <Typography>{e.score != 0 ? e.score : "-"}</Typography>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Card>
    </div>
  );
}
