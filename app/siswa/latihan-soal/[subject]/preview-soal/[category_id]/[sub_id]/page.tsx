"use client";

import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import PreviewSoal from "./Container";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";

// async function getData(
//   sub_id: string,
//   product_id: string,
//   category_id: string
// ) {
//   if (sub_id != "0") {
//     try {
//       const res = await axiosInstance.get(
//         `/api/users/siswa/soal/sub/product/owned/${product_id}/${category_id}/${sub_id}`
//       );

//       // res.data.data.end_duration = dayjs(res.data.data.end_duration).format()

//       return res.data.data;
//     } catch (error) {
//       console.log(error);
//       return {
//         data: [],
//       };
//     }
//   } else {
//     return {
//       data: [],
//     };
//   }
// }

// async function getDataDetailSoal(
//   sub_id: string,
//   product_id: string,
//   category_id: string
// ) {
//   if (sub_id != "0") {
//     try {
//       const res = await axiosInstance.get(
//         `/api/users/siswa/detail/sub/product/owned/${product_id}/${category_id}/${sub_id}`
//       );

//       return res.data.data.length > 0
//         ? res.data.data[0]
//         : {
//             category_name: "",
//             sub_category_name: "",
//           };
//     } catch (error) {
//       return {
//         data: {
//           category_name: "",
//           sub_category_name: "",
//         },
//       };
//     }
//   } else {
//     return {
//       data: {
//         category_name: "",
//         sub_category_name: "",
//       },
//     };
//   }
// }

export default function Page(props: { params: any; searchParams: any }) {
  // const data = await getData(
  //   props.params.sub_id,
  //   props.params.subject,
  //   props.params.category_id
  // );
  const { data, isFetching } = useQuery({
    queryKey: ["list-carousel"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        `/api/users/siswa/soal/sub/product/owned/${props.params.subject}/${props.params.category_id}/${props.params.sub_id}`
      );

      res.data.data.soal.map((va: any, idx: number) => {
        res.data.data.soal[idx].no = idx + 1;
        // return va;
      });
      // console.log(res.data.data);
      return res.data.data;
    },
    initialData: {
      data: [],
    },
    refetchOnWindowFocus: false,
  });

  // const detail = await getDataDetailSoal(
  //   props.params.sub_id,
  //   props.params.subject,
  //   props.params.category_id
  // );
  const { data: detail, isFetching: isFetchingDetail } = useQuery({
    queryKey: ["list-carousel"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        `/api/users/siswa/detail/sub/product/owned/${props.params.subject}/${props.params.category_id}/${props.params.sub_id}`
      );
      return res.data.data;
    },
    initialData: {
      data: {
        category_name: "",
        sub_category_name: "",
      },
    },
    refetchOnWindowFocus: false,
  });

  if (isFetching || isFetchingDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {" "}
      <PreviewSoal
        dataSoal={data}
        detailSoal={detail}
        end_duration={
          data.end_duration
            ? data.end_duration
            : props.searchParams.end_duration
        }
      />{" "}
    </div>
  );
}
