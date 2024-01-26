import { Col, Row } from "antd";
import { SoalCard } from "./SoalCard";

export const ListSoal = () => {
  return (
    <Row gutter={[24, 24]}>
      {[...Array(5)].map((e, i) => (
        <Col key={i}>
          <SoalCard />
        </Col>
      ))}
    </Row>
  );
};
