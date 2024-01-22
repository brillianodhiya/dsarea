"use client";
import { Card, Col, Row, Select, Spin, Typography } from "antd";
import dynamic from "next/dynamic";
import ReportData from "./components/ReportData";
import LineChart from "./components/LineChart";
import React from "react";
interface TransactionType {
  data: any;
  year: string;
  setYear: (val: string) => void;
  isFetching: boolean;
}

export const DashboardTransaction: React.FC<TransactionType> = ({
  data,
  year,
  setYear,
  isFetching,
}) => {
  return (
    <Card>
      <Row
        justify={"space-between"}
        gutter={[24, 24]}
        style={{
          marginBottom: 20,
        }}
      >
        <Col>
          <Typography.Text
            style={{
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Transaction
          </Typography.Text>
        </Col>
        <Col>
          <div>
            <Select
              defaultValue={year}
              style={{
                width: "100%",
                // backgroundColor: "#EBF5F5",
                // color: "#3A9699",
              }}
              onChange={(e) => {
                setYear(e);
              }}
              options={[
                { value: "2024", label: "2024" },
                { value: "2023", label: "2023" },
                { value: "2022", label: "2022" },
              ]}
              size="small"
              // bordered={false}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]} justify={"space-between"}>
        <Col xl={18} xs={24}>
          <Spin spinning={isFetching}>
            <div
              style={{
                position: "relative",
                height: "40vh",
                width: "100%",
                margin: "auto",
              }}
            >
              <LineChart
                data={data?.grafik ? data.grafik : []}
                loading={isFetching}
              />
            </div>
          </Spin>
        </Col>
        <Col xl={6} xs={24}>
          <ReportData data={data} loading={isFetching} />
        </Col>
      </Row>
    </Card>
  );
};
