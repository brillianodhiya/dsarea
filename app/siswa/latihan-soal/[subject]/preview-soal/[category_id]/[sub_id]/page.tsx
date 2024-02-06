import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import PreviewSoal from "./Container";

async function getData(
  sub_id: string,
  product_id: string,
  category_id: string
) {
  if (sub_id != "0") {
    try {
      const res = await axiosInstance.get(
        `/api/users/siswa/soal/sub/product/owned/${product_id}/${category_id}/${sub_id}`
      );
      return res.data.data;
    } catch (error) {
      console.log(error);
      return {
        data: [],
      };
    }
  } else {
    return {
      data: [],
    };
  }
}

export default async function Page(props: { params: any }) {
  const data = await getData(
    props.params.sub_id,
    props.params.subject,
    props.params.category_id
  );

  return (
    <div>
      {" "}
      <PreviewSoal dataSoal={data} />{" "}
    </div>
  );
}
