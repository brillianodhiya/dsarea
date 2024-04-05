"use client";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import ContainerDetailLatihanSoal from "./Container";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import React from "react";

// async function getData(id: string) {
//   try {
//     const res = await axiosInstance.get(
//       `/api/users/siswa/detail/product/owned/${id}`
//     );
//     return res.data.data;
//   } catch (error) {
//     return [];
//   }
// }

export default function Page(props: { params: any; searchParams: any }) {
  // console.log(props.searchParams.w, "props");
  // const data = await getData(props.params.subject);
  const [data, setData] = React.useState({
    participant: "",
    rank: "",
    total_dilewati: "",
    id: 0,
    expired_at: "",
    nama_product: "",
    harga: 0,
    category_name: [],
    total_duration: "",
    score: 0,
    benefit: "",
    desc: "",
    total_soal: 0,
    total_jawab: 0,
    sub_category: [
      {
        category_id: 0,
        product_id: 0,
        sub_id: 0,
        title: "",
        category_name: "",
        duration: "",
        score: 0,
        status: "",
      },
    ],
  });
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

  React.useEffect(() => {
    getData(props.params.subject).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <CustomHeader title="Latihan Soal" />
      <ContainerDetailLatihanSoal data={data} />
    </div>
  );
}
