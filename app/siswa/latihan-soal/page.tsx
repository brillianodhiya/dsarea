"use client";
import { SearchOutlined } from "@ant-design/icons";
import { ListSoal } from "@dsarea/@/components/LatihanSoal/ListSoal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Input, Tabs, TabsProps } from "antd";
import { useState } from "react";

export default function Page() {
  const [activeTabs, setActiveTabs] = useState("active");

  // const { data, isFetching } = useQuery({
  //   queryKey: ["list-soal", activeTabs],
  //   queryFn: async () => {
  //     const res = await axiosClientInstance.get(
  //       `/api/users/siswa/list/product/owned?status=${activeTabs}`
  //     );
  //     return res.data.data;
  //   },
  //   initialData: [
  //     {
  //       id: 0,
  //     },
  //   ],
  // });

  const onChange = (key: string) => {
    setActiveTabs(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "active",
      label: "Sedang Dikerjakan",
      children: <ListSoal />,
    },
    {
      key: "selesai",
      label: "Selesai",
      children: <ListSoal />,
    },
    {
      key: "expired",
      label: "Expired",
      children: <ListSoal />,
    },
  ];
  return (
    <>
      <CustomHeader title="Latihan Soal" />
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
