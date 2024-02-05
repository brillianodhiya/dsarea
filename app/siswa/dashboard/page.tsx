"use client";
import ActiveCourse from "@dsarea/@/components/UserDashboard/ActiveCourse";
import { BannerCarousel } from "@dsarea/@/components/UserDashboard/BannerCarousel";
import { EventCalendar } from "@dsarea/@/components/UserDashboard/EventCaledar";
import { LeaderBoard } from "@dsarea/@/components/UserDashboard/LeaderBoard";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Col, Row } from "antd";

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
        "/api/users/siswa/list/product/owned?status=active&limit=3"
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

  return (
    <>
      <CustomHeader title="Dashboard" />
      <Row gutter={[24, 24]} className="p-4">
        <Col xs={24} sm={24} md={24} lg={24} xl={19}>
          <BannerCarousel data={dataCarousel} />
          <ActiveCourse data={dataCourse} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={5}>
          <EventCalendar data={[]} isFetching={false} />
          <LeaderBoard data={[]} isLoading={false} />
        </Col>
      </Row>
    </>
  );
}
