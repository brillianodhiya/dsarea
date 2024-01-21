"use client";
import { Card, Col, Row, Select, Typography } from "antd";
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
  // const data = [
  //   {
  //     date: "2024-01",
  //     value: 10000,
  //   },
  //   {
  //     date: "2024-02",
  //     value: 9000,
  //   },
  //   {
  //     date: "2024-03",
  //     value: 0,
  //   },
  //   {
  //     date: "2024-04",
  //     value: 0,
  //   },
  //   {
  //     date: "2024-05",
  //     value: 0,
  //   },
  //   {
  //     date: "2024-06",
  //     value: 0,
  //   },
  //   {
  //     date: "2024-07",
  //     value: 0,
  //   },
  //   {
  //     date: "2024-08",
  //     value: 0,
  //   },
  //   {
  //     date: "2024-09",
  //     value: 0,
  //   },
  //   {
  //     date: "2024-10",
  //     value: 0,
  //   },
  //   {
  //     date: "2024-10",
  //     value: 2000,
  //   },
  //   {
  //     date: "2024-11",
  //     value: 0,
  //   },
  //   {
  //     date: "2024-12",
  //     value: 0,
  //   },
  // ];
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
          <div
            style={{
              position: "relative",
              height: "40vh",
              width: "100%",
              margin: "auto",
            }}
          >
            <LineChart data={data?.grafik} />
          </div>
        </Col>
        <Col xl={6} xs={24}>
          <ReportData data={data} loading={isFetching} />
        </Col>
      </Row>
    </Card>
  );
};
