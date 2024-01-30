"use client";
import { SearchOutlined } from "@ant-design/icons";
import { ListSoal } from "@dsarea/@/components/LatihanSoal/ListSoal";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Input, Tabs, TabsProps } from "antd";
import { useState } from "react";

export default function ContainerLatihanSoal() {
  const [activeTabs, setActiveTabs] = useState("active");

  const data = [
    {
      id: 1,
      status: "active",
    },
    {
      id: 2,
      status: "selesai",
    },
    {
      id: 3,
      status: "expired",
    },
  ];
  const isFetching = false;

  const onChange = (key: string) => {
    setActiveTabs(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "active",
      label: "Sedang Dikerjakan",
      children: <ListSoal data={data} isFetching={isFetching} />,
    },
    {
      key: "selesai",
      label: "Selesai",
      children: <ListSoal data={data} isFetching={isFetching} />,
    },
    {
      key: "expired",
      label: "Expired",
      children: <ListSoal data={data} isFetching={isFetching} />,
    },
  ];
  return (
    <>
      <div className="p-6">
        <Tabs
          defaultActiveKey={activeTabs}
          items={items}
          onChange={onChange}
          tabBarExtraContent={{
            right: (
              <Input
                placeholder="Search anything..."
                suffix={<SearchOutlined />}
                className="!w-[250px]"
              />
            ),
          }}
        />
      </div>
    </>
  );
}
