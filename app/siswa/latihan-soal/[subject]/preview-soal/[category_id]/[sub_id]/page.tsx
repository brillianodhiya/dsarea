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

async function getDataDetailSoal(
  sub_id: string,
  product_id: string,
  category_id: string
) {
  if (sub_id != "0") {
    try {
      const res = await axiosInstance.get(
        `/api/users/siswa/detail/sub/product/owned/${product_id}/${category_id}/${sub_id}`
      );

      return res.data.data.length > 0
        ? res.data.data[0]
        : {
            category_name: "",
            sub_category_name: "",
          };
    } catch (error) {
      return {
        data: {
          category_name: "",
          sub_category_name: "",
        },
      };
    }
  } else {
    return {
      data: {
        category_name: "",
        sub_category_name: "",
      },
    };
  }
}

export default async function Page(props: { params: any }) {
  const data = await getData(
    props.params.sub_id,
    props.params.subject,
    props.params.category_id
  );

  const detail = await getDataDetailSoal(
    props.params.sub_id,
    props.params.subject,
    props.params.category_id
  );

  return (
    <div>
      {" "}
      <PreviewSoal dataSoal={data} detailSoal={detail} />{" "}
    </div>
  );
}
