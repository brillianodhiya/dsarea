"use client";
import ActiveCourse from "@dsarea/@/components/UserDashboard/ActiveCourse";
import { BannerCarousel } from "@dsarea/@/components/UserDashboard/BannerCarousel";
import { EventCalendar } from "@dsarea/@/components/UserDashboard/EventCaledar";
import { LeaderBoard } from "@dsarea/@/components/UserDashboard/LeaderBoard";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Col, Row } from "antd";
import React from "react";

export default function Page() {
  const { data: dataCarousel, isFetching: loadingCarousel } = useQuery({
    queryKey: ["list-carousel"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/banner/list?status=1");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        name: "test",
        title: "test",
        desc: "test",
        image: "/card-image.svg",
      },
    ],
  });
  const { data: dataCourse, isFetching: loadingCourse } = useQuery({
    queryKey: ["list-course"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        "/api/users/siswa/list/product/owned?status=active&limit=6"
      );
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        name: "test",
        title: "test",
        desc: "test",
        image: "/card-image.svg",
      },
    ],
  });

  const { data: dataProduct, isFetching: loadingProduct } = useQuery({
    queryKey: ["type-pemenang"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/dashboard/list/product");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
      },
    ],
  });

  const [productId, setProductId] = React.useState(dataProduct[0]?.id);

  const { data: dataPemenang, isFetching: loadingPemenang } = useQuery({
    queryKey: ["list-pemenang", productId],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        "/api/dashboard/list/pemenang/" + productId
      );
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
      },
    ],
  });

  React.useEffect(() => {
    if (dataProduct) {
      setProductId(dataProduct[0]?.id);
    }
  }, [dataProduct]);

  return (
    <>
      <CustomHeader title="Dashboard" />
      <Row
        gutter={[24, 24]}
        className="w-full p-4 max-h-[90vh] overflow-y-scroll overflow-x-hidden"
      >
        <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
          <BannerCarousel data={dataCarousel} />
          <ActiveCourse data={dataCourse} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={8} xxl={6}>
          <EventCalendar
            event={[
              {
                id: 1,
                title: "PowerPoint (E-learning)",
                start: "2024-02-01",
                end: "2024-02-05",
              },
              {
                id: 2,
                title: "Excel for Advance",
                start: "2024-02-02",
                end: "2024-02-05",
              },
              {
                id: 3,
                title: "Event 3",
                start: "2024-02-03",
                end: "2024-02-05",
              },
            ]}
          />
          <LeaderBoard
            data={dataPemenang}
            dataProduct={dataProduct}
            isLoading={loadingPemenang}
            setProductId={setProductId}
            productId={productId}
          />
        </Col>
      </Row>
    </>
  );
}
