"use client";
import {
  Card,
  Dropdown,
  DropdownProps,
  MenuProps,
  Progress,
  Table,
  Typography,
} from "antd";
import Button from "antd/lib/button";
import Column from "antd/lib/table/Column";
import { Eye, MoreVertical, PencilLine } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log(e);
  };

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "View",
      key: "1",
      icon: <Eye />,
    },
    {
      label: "Edit",
      key: "2",
      icon: <PencilLine />,
    },
  ];

  const data = [
    {
      key: "1",
      product: "John",
      category: "Brown",
      date: 32,
      siswa: 90,
      status: 70,
      soal: 99,
    },
    {
      key: "2",
      product: "John",
      category: "Brown",
      date: 32,
      siswa: 90,
      status: 100,
      soal: 99,
    },
    {
      key: "3",
      product: "John",
      category: "Brown",
      date: 32,
      siswa: 90,
      status: 50,
      soal: 99,
    },
    {
      key: "4",
      product: "John",
      category: "Brown",
      date: 32,
      siswa: 90,
      status: 10,
      soal: 99,
    },
  ];
  return (
    <main className="px-4 py-16">
      <Card>
        <Table
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
          }}
        >
          <Column
            title="Product"
            dataIndex="product"
            key="product"
            render={(text, record) => (
              <Typography className="!text-[#3A9699]">{text}</Typography>
            )}
          />
          <Column
            title="Kategori"
            dataIndex="category"
            key="category"
            render={(text, record) => (
              <Typography className="!text-[#3A9699]">{text}</Typography>
            )}
          />
          <Column title="Tanggal" dataIndex="date" key="date" />
          <Column title="Jml. Soal" dataIndex="soal" key="soal" />
          <Column title="Jml. Siswa" dataIndex="siswa" key="siswa" />
          <Column
            title="Status Penilaian"
            dataIndex="status"
            key="status"
            render={(text, record) => <Progress percent={text} />}
          />
          <Column
            title="Action"
            dataIndex="action"
            key="action"
            render={(text, record) => (
              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                onOpenChange={handleOpenChange}
                open={open}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <MoreVertical color="#000" />
                </a>
              </Dropdown>
            )}
          />
        </Table>
      </Card>
    </main>
  );
}
