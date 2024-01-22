"use client";

import { Col, Divider, Flex, Row, Typography } from "antd";
import React from "react";
import ReportCard from "./ReportCard";

const ReportData = ({ data, loading }: { data: any; loading: boolean }) => {
  return (
    <>
      <Row gutter={[24, 24]} justify={"space-between"}>
        <Col span={24}>
          <Typography
            style={{
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Report
          </Typography>
        </Col>
        <Col span={12}>
          <ReportCard
            data={data.total_gross}
            loading={loading}
            title={"Total Gross"}
            percent={data.total_gross_persen}
          />
        </Col>
        <Col span={12}>
          <ReportCard
            data={data.total_net}
            loading={loading}
            title={"Total Nett"}
            percent={data.total_net_persen}
          />
        </Col>
        <Col span={12}>
          <ReportCard
            data={data.total_pending}
            loading={loading}
            title={"Transaksi Pending"}
            percent={data.total_pending_persen}
          />
        </Col>
        <Col span={12}>
          <ReportCard
            data={data.total_failed}
            loading={loading}
            title={"Transaksi Gagal"}
            percent={data.total_failed_persen}
          />
        </Col>
      </Row>
    </>
  );
};

export default ReportData;
