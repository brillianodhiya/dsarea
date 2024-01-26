import { SearchOutlined } from "@ant-design/icons";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { Input } from "antd";

export default function Page() {
  return (
    <>
      <CustomHeader title="Product" />
      <>
        <Input
          placeholder="Search anything..."
          suffix={<SearchOutlined />}
          className="!w-[250px]"
        />
      </>
    </>
  );
}
