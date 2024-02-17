import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import ContainerPengumuman from "./Container";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";

const getListData = async () => {
  try {
    const res = await axiosInstance.get(
      "/api/users/siswa/list/product/owned?status=selesai"
    );
    return res.data.data;
  } catch (error) {
    return [];
  }
};

export default async function Page() {
  const data = await getListData();

  return (
    <div>
      <CustomHeader title="Pengumuman" />
      <ContainerPengumuman data={data} />
    </div>
  );
}
