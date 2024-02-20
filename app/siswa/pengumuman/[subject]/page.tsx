import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import ContainerDetailPengumuman from "./Container";

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

  const submenu = [
    {
      title: "Pengumuman",
    },
  ];
  return (
    <div>
      <CustomHeader
        title={data?.nama_product ?? "Belum ada data"}
        isSubMenu={true}
        subMenu={submenu}
      />
      <ContainerDetailPengumuman data={data} />
    </div>
  );
}
