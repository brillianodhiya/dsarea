import React from "react";
import { Select } from "antd";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Each } from "../GetterServerComponent/Each";

interface SelectCategoryProps {
  onChange?: (values: any, option: any) => void;
  value?: string;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ onChange, value }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/soal/category/list");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        name: "test",
        desc: "test",
      },
    ],
  });

  return (
    <Select
      loading={isFetching}
      placeholder="Pilih Kategori"
      value={value}
      onChange={onChange}
    >
      {data.map((item: any) => {
        return (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};
export default SelectCategory;
