"use client";
import { SearchOutlined } from "@ant-design/icons";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { PengumumanCard } from "@dsarea/@/components/pengumuman/PengumumanCard";
import { Card, Col, Input, Row, Typography } from "antd";
import moment from "moment";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <CustomHeader title="Pengumuman" />
      <div className="p-4">
        <Input
          placeholder="Search anything..."
          suffix={<SearchOutlined />}
          className="!w-[calc(300px)]"
        />

        <Row gutter={[24, 24]} className="mt-4">
          {[...Array(5)].map((e, i) => (
            <Col key={i}>
              <PengumumanCard />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
