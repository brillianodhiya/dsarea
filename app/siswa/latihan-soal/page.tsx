import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import ContainerLatihanSoal from "./Container";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";

const getListData = async () => {
  try {
    const res = await axiosInstance.get(
      "/api/users/siswa/list/product/owned?status=active"
    );

    // console.log(res.data);
    return {
      error: false,
      ...res.data,
    };
  } catch (error) {
    // console.log(error);
    return {
      error: true,
    };
  }
};

export default async function Page() {
  const data = await getListData();

  console.log(data, "data");

  return (
    <>
      <CustomHeader title="Latihan Soal" />

      <ContainerLatihanSoal />
    </>
  );
}
