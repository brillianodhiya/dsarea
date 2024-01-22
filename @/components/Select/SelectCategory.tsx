import React from "react";
import { Select, Tag } from "antd";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import type { SelectProps } from "antd";
import { pickRandomItem } from "@dsarea/@/lib/utils";

type TagRender = SelectProps["tagRender"];
interface SelectCategoryProps {
  onChange?: (values: any, option: any) => void;
  value?: string;
  multiple?: true | false;
  disabled?: false | true;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  onChange,
  value,
  multiple = false,
  disabled = false,
}) => {
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

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={pickRandomItem()}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Select
      loading={isFetching}
      placeholder="Pilih Kategori"
      value={value}
      onChange={onChange}
      mode={multiple ? "multiple" : undefined}
      tagRender={multiple ? tagRender : undefined}
      disabled={disabled}
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
