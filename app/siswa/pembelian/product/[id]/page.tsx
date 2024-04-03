import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import DetailPayment from "./DetailPayment";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import { Result } from "antd";

const getDetailProduct = async (id: string) => {
  try {
    const res = await axiosInstance.get(
      "/api/users/pembelian/detail/product/" + id
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

export default async function Page(props: any) {
  const userId = props.params.id;
  const dataProudct = await getDetailProduct(userId);

  return (
    <div>
      {dataProudct.error ? (
        <Result status={"404"} title="Produk telah expired" />
      ) : (
        <>
          <CustomHeader
            title={dataProudct.data[0].nama_product}
            subMenu={[
              {
                title: "Pembelian",
              },
            ]}
            isSubMenu={true}
          />
          <DetailPayment dataProudct={dataProudct} />
        </>
      )}
    </div>
  );
}
