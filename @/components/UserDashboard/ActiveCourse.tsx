"use client";
import Link from "next/link";
import { ListCource } from "./ListCource";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

interface DataType {
  data: any;
}

const ActiveCourse: React.FC<DataType> = ({ data }) => {
  const screens = useBreakpoint();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 10,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div
          className="font-semibold"
          style={{
            fontSize: screens.sm ? "16px" : "14px",
          }}
        >
          Program yang sedang berjalan
        </div>
        <div>
          <Link
            style={{
              color: "#7A7A7A",
              fontSize: screens.sm ? "12px" : "14px",
            }}
            href={"/siswa/latihan-soal"}
            type="text"
            onClick={() => window.location.assign("/siswa/latihan-soal")}
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
