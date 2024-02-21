import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import ContainerDetailLatihanSoal from "./Container";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";

async function getData(id: string) {
  try {
    const res = await axiosInstance.get(
      `/api/users/siswa/detail/product/owned/${id}`
    );
    return res.data.data;
  } catch (error) {
    return [];
  }
}

export default async function Page(props: { params: any }) {
  const data = await getData(props.params.subject);

  return (
    <div>
      <CustomHeader title="Latihan Soal" />
      <ContainerDetailLatihanSoal data={data} />
    </div>
  );
}
