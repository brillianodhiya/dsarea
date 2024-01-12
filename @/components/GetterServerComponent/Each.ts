import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import { Children } from "react";

const getData = async (apiRoute: string) => {
  try {
    const res = await axiosInstance.get(apiRoute);
    return res.data.data;
  } catch (error) {
    return [];
  }
};

export const Each = async ({
  render,
  of,
  apiRoute,
}: {
  render: any;
  of?: any[];
  apiRoute?: string;
}) => {
  if (apiRoute) {
    const data = await getData(apiRoute);
    return Children.toArray(
      data.map((item: any, index: any) => render(item, index))
    );
  }

  return Children.toArray((of ?? []).map((item, index) => render(item, index)));
};
