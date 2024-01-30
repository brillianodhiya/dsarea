"use client";
import { ActiveCourse } from "@dsarea/@/components/UserDashboard/ActiveCourse";
import { BannerCarousel } from "@dsarea/@/components/UserDashboard/BannerCarousel";
import { EventCalendar } from "@dsarea/@/components/UserDashboard/EventCaledar";
import { LeaderBoard } from "@dsarea/@/components/UserDashboard/LeaderBoard";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Col, Row } from "antd";

export default function Page() {
  const { data: dataCarousel, isFetching: loadingCarousel } = useQuery({
    queryKey: ["carousel"],
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

  console.log(dataCarousel, "data");

  return (
    <>
      <CustomHeader title="Dashboard" />
      <Row gutter={[24, 24]} className="p-4">
        <Col span={19}>
          <BannerCarousel data={dataCarousel} loading={loadingCarousel} />
          <ActiveCourse />
        </Col>
        <Col span={5}>
          <EventCalendar data={[]} isFetching={false} />
          <LeaderBoard data={[]} isLoading={false} />
        </Col>
      </Row>
    </>
  );
}
