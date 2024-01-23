"use client";

import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { Col, Row } from "antd";
import React, { useEffect } from "react";

export default function AddSoal() {
  return (
    <div>
      <CustomHeader
        title="Preview Soal"
        isSubMenu
        subMenu={[
          {
            title: "Preview Soal (Sub Kategori)",
          },
        ]}
      />

      <Row>
        <Col xxl={6} xl={6} lg={8} md={8} sm={24} xs={24}>
          KIRI
        </Col>
        <Col xxl={18} xl={18} lg={16} md={16} sm={24} xs={24}>
          KANAN
        </Col>
      </Row>
    </div>
  );
}
