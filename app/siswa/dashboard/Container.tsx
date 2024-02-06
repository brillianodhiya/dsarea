"use client";
import ActiveCourse from "@dsarea/@/components/UserDashboard/ActiveCourse";
import { BannerCarousel } from "@dsarea/@/components/UserDashboard/BannerCarousel";
import { Col, Row } from "antd";
import dynamic from "next/dynamic";

interface dataType {
  dataCarousel: any;
  dataCourse: any;
}

const ContainerDashboard: React.FC<dataType> = ({
  dataCarousel,
  dataCourse,
}) => {
  return (
    <Row gutter={[24, 24]} className="p-4">
      <Col xs={24} sm={24} md={24} lg={24} xl={19}>
        <BannerCarousel data={dataCarousel} />
        <ActiveCourse data={dataCourse} />
      </Col>
      {/* <Col xs={24} sm={24} md={24} lg={24} xl={5}>
      <EventCalendar data={[]} isFetching={false} />
      <LeaderBoard data={[]} isLoading={false} />
    </Col> */}
    </Row>
  );
};
export default ContainerDashboard;
