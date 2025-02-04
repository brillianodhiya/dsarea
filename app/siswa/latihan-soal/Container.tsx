"use client";
import { SearchOutlined } from "@ant-design/icons";
import { ListSoal } from "@dsarea/@/components/LatihanSoal/ListSoal";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { useQuery } from "@tanstack/react-query";
import { Input, Tabs, TabsProps } from "antd";
import { useState } from "react";

type HeaderProps = {
  data: {
    id: number;
    having_expired: boolean;
    status: string;
    start_date: string;
    end_date: string;
    nama_product: string;
    harga: number;
    desc: string;
    benefit: string;
    image: string;
    is_publish: boolean;
    publish_date: any;
    createdAt: string;
    updatedAt: string;
    total_soal: number;
    total_pembelian: number;
    is_buying: boolean;
    category: {
      id: number;
      product_id: number;
      name: string;
      desc: string;
      createdAt: string;
      updatedAt: string;
    }[];
  }[];
};

const ContainerLatihanSoal: React.FC<HeaderProps> = ({ data: dataInitial }) => {
  const [activeTabs, setActiveTabs] = useState("active");
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["product", "siswa", activeTabs],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        `/api/users/siswa/list/product/owned?status=` + activeTabs
      );
      return res.data.data;
    },
    initialData: dataInitial,
  });
  // const data = [
  //   {
  //     id: 1,
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     status: "selesai",
  //   },
  //   {
  //     id: 3,
  //     status: "expired",
  //   },
  // ];

  const onChange = (key: string) => {
    setActiveTabs(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "active",
      label: "Sedang Dikerjakan",
      children: (
        <ListSoal
          data={searchFromValue(data, searchText)}
          isFetching={isLoading}
        />
      ),
    },
    {
      key: "selesai",
      label: "Selesai",
      children: (
        <ListSoal
          data={searchFromValue(data, searchText)}
          isFetching={isLoading}
        />
      ),
    },
    {
      key: "expired",
      label: "Expired",
      children: (
        <ListSoal
          data={searchFromValue(data, searchText)}
          isFetching={isLoading}
        />
      ),
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
                className="!w-[calc(100%-20px)]"
                onChange={(e) => setSearchText(e.target.value)}
              />
            ),
          }}
        />
      </div>
    </>
  );
};

export default ContainerLatihanSoal;
