import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import PreviewSoal from "./Container";

async function getData(id: string) {
  if (id != "0") {
    try {
      const res = await axiosInstance.get(
        `/api/soal/sub/category/detail/${id}`
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
  const data = await getData(props.params.id);

  return (
    <div>
      <PreviewSoal dataSoal={data} />
    </div>
  );
}
