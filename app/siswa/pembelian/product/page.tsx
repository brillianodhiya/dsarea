import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";

import ListProduct from "./ListProduct";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";

async function getData() {
  try {
    const res = await axiosInstance.get("/api/soal/product/list");
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      <CustomHeader title="Pengumuman" />
      <div className="p-4">
        <ListProduct data={data} />
      </div>
    </div>
  );
}
