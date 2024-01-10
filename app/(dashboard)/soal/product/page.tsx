"use client";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DropdownMenu from "@dsarea/@/components/Dropdown/DropdownMenu";
import AddCategoryModal from "@dsarea/@/components/Modals/AddCategoryModal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import {
  Card,
  Col,
  Dropdown,
  DropdownProps,
  Input,
  Layout,
  MenuProps,
  Progress,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import Button from "antd/lib/button";
import Column from "antd/lib/table/Column";
import Link from "next/link";
import React from "react";

export default function Home() {
  const data = [
    {
      key: "1",
      category: "Brown",
      soal: 10,
      duration: 60,
    },
    {
      key: "2",
      category: "Python Lengkap",
      soal: 10,
      duration: 120,
    },
  ];
  return (
    <div>
      <CustomHeader title="Soal" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Product
            </Typography.Text>
          </Col>
          <Col>
            <Space wrap>
              <Input
                placeholder="Search anything..."
                suffix={<SearchOutlined />}
                className="!w-[250px]"
              />
              <Button
                type="primary"
                onClick={() => {}}
                color="red"
                icon={<PlusOutlined />}
              >
                Buat Product
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
