"use client";

import { Card, Col, Row, Skeleton, Typography } from "antd";
import { CardTotal } from "./components/CardTotal";

export interface dataType {
  total_kategori: number;
  total_sub_kategori: number;
  total_siswa: number;
  total_siswa_active: number;
  total_siswa_inactive: number;
}

interface OverviewProps {
  data: dataType;
  isFetching: boolean;
}

export const DashboardOverview: React.FC<OverviewProps> = ({
  data,
  isFetching,
}) => {
  return (
    <Card>
      <Row justify={"space-between"} gutter={[24, 24]} className="mb-4">
        <Col>
          <Typography.Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Overview
          </Typography.Text>
        </Col>
        <Col>
          <Typography
            style={{
              color: "#7A7A7A",
            }}
            className="!text-xs"
          >
            Updated 10 min ago
          </Typography>
        </Col>
      </Row>
      <Row gutter={[24, 24]} wrap justify={"space-between"}>
        <Col>
          <CardTotal
            value={data.total_kategori}
            title="Total Category"
            icon="/list-view.svg"
            bgColor="#ECEFFF"
          />
        </Col>
        <Col>
          <CardTotal
            value={data.total_sub_kategori}
            title="Total Sub Category"
            icon="/list-number.svg"
            bgColor="#F9EFFE"
          />
        </Col>
        <Col>
          <CardTotal
            value={data.total_siswa}
            title="Total Siswa"
            icon="/user-multiple.svg"
            bgColor="#E8F4FF"
          />
        </Col>
        <Col>
          <CardTotal
            value={data.total_siswa_active}
            title="Siswa Aktif"
            icon="/siswa.svg"
            bgColor="#EFFBF8"
          />
        </Col>
        <Col>
          <CardTotal
            value={data.total_siswa_inactive}
            title="Siswa InActive"
            icon="/user-remove.svg"
            bgColor="#FDEAF5"
          />
        </Col>
      </Row>
    </Card>
  );
};
