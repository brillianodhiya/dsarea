"use client";
import { SearchOutlined } from "@ant-design/icons";
import DropdownMenu from "@dsarea/@/components/Dropdown/DropdownMenu";
import ExportIcon from "@dsarea/@/components/icons/ExportIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { Card, Col, Input, Row, Space, Table, Typography } from "antd";
import Button from "antd/lib/button";
import Column from "antd/lib/table/Column";
import React from "react";

export default function Page() {
  const data = [
    {
      key: "1",
      transaction: "INV189273981273",
      name: "dian",
      product: "Try Out",
      voucher: "",
      pembayaran: 75000,
      status: "success",
    },
    {
      key: "2",
      transaction: "INV189273981273",
      name: "dian",
      product: "Try Out",
      voucher: "",
      pembayaran: 75000,
      status: "pending",
    },
    {
      key: "3",
      transaction: "INV189273981273",
      name: "dian",
      product: "Try Out",
      voucher: "",
      pembayaran: 75000,
      status: "failed",
    },
  ];
  return (
    <div>
      <CustomHeader title="Transaction" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Transaction
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
                icon={<ExportIcon />}
              >
                Export
              </Button>
            </Space>
          </Col>
        </Row>
        <Table
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
          }}
        >
          <Column
            title="No. Transaction"
            dataIndex="transaction"
            key="transaction"
          />
          <Column
            title="Nama Siswa"
            dataIndex="name"
            key="name"
            width={"20%"}
            render={(text, record) => (
              <Typography className="!text-[#3A9699]">{text}</Typography>
            )}
          />
          <Column title="Product" dataIndex="product" key="product" />
          <Column
            title="Voucher"
            dataIndex="voucher"
            key="voucher"
            render={(text, record) => (text.length > 0 ? <>{text}</> : <>-</>)}
          />
          <Column
            title="Total Pembayaran"
            dataIndex="pembayaran"
            key="pembayaran"
          />
          <Column title="Status" dataIndex="status" key="status" />

          <Column
            title="Action"
            dataIndex="action"
            key="action"
            render={(text, record) => <DropdownMenu />}
          />
        </Table>
      </Card>
    </div>
  );
}
