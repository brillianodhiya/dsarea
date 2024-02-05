"use client";
import Link from "next/link";
import { ListSoal } from "../LatihanSoal/ListSoal";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { ListCource } from "./ListCource";

interface DataType {
  data: any;
}

const ActiveCourse: React.FC<DataType> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <div className="font-semibold text-md">
          Program yang sedang berjalan
        </div>
        <div>
          <Link
            style={{
              color: "#7A7A7A",
            }}
            href={"/siswa/latihan-soal"}
            type="text"
            onClick={() => router.push("/siswa/latihan-soal")}
          >
            View All
          </Link>
        </div>
      </div>
      <ListCource data={data} isFetching={false} />
    </>
  );
};

export default ActiveCourse;
