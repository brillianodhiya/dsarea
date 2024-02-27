"use client";
import { DashboardOverview } from "@dsarea/@/components/Dashboard/DashboardOverview";
import { DashboardRecentTransaction } from "@dsarea/@/components/Dashboard/DashboardRecentTransaction";
import { DashboardTransaction } from "@dsarea/@/components/Dashboard/DashboardTransaction";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Page() {
  const [year, setYear] = React.useState("2024");
  const { data: dataOverview, isFetching: loadingOverview } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(`/api/dashboard/overview`);
      return res.data.data;
    },
    initialData: [
      {
        total_kategori: 0,
        total_sub_kategori: 0,
        total_siswa: 0,
        total_siswa_active: 0,
        total_siswa_inactive: 0,
      },
    ],
  });
  const { data: dataReportTransaction, isFetching: loadingReportTransaction } =
    useQuery({
      queryKey: ["report-transaction", year],
      queryFn: async () => {
        const res = await axiosClientInstance.get(
          `/api/dashboard/transaksi/${year}`
        );
        return res.data.data;
      },
      initialData: [
        {
          total_kategori: 0,
          total_sub_kategori: 0,
          total_siswa: 0,
          total_siswa_active: 0,
          total_siswa_inactive: 0,
        },
      ],
    });

  const { data: dataTransaction, isFetching: loadingTransaction } = useQuery({
    queryKey: ["recent-transaction"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(`api/transaksi/list?limit=10`);
      return res.data.data;
    },
    initialData: [
      {
        id: "",
        name: "",
        coverImage: null,
        amount: "",
      },
    ],
  });
  return (
    <div>
      <CustomHeader title="Dashboard" />
      <div className="p-4 flex flex-col gap-y-2">
        <DashboardOverview data={dataOverview} isFetching={loadingOverview} />
        <DashboardTransaction
          data={dataReportTransaction}
          year={year}
          setYear={setYear}
          isFetching={loadingReportTransaction}
        />

        <DashboardRecentTransaction
          data={dataTransaction}
          isFetching={loadingTransaction}
        />
      </div>
    </div>
  );
}
