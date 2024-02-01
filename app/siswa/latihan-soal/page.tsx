import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import ContainerLatihanSoal from "./Container";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";

const getListData = async () => {
  try {
    const res = await axiosInstance.get(
      "/api/users/siswa/list/product/owned?status=active"
    );

    // console.log(res.data);
    return res.data.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
};

export default async function Page() {
  const data = await getListData();

  console.log(data);

  return (
    <>
      <CustomHeader title="Latihan Soal" />

      <ContainerLatihanSoal data={data} />
    </>
  );
}
