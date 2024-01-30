import Link from "next/link";
import { ListSoal } from "../LatihanSoal/ListSoal";
import { Button } from "antd";
import { useRouter } from "next/navigation";

interface DataType {}

export const ActiveCourse: React.FC<DataType> = ({}) => {
  const router = useRouter();

  const data = [
    {
      id: 18,
      image:
        "http://api-dsarea.aitilokal.com/api/attach/MTcwNjQzODA5NzUzNzEuUE5HLi1zcGxhc2gtLmltYWdlL3BuZw",
      expired_at: "2024-02-10 10:00:00",
      nama_product: "testing131image",
      harga: 10000,
      category_name: ["TKP SKD CPNS1", "CPNS 2"],
      total_duration: "360",
      score: 0,
      benefit: "untung belipat",
      desc: "testing",
      total_soal: 8,
      total_jawab: 0,
      status: "active",
    },
    {
      id: 21,
      image: null,
      expired_at: "2024-02-10 10:00:00",
      nama_product: "testing 1 category",
      harga: 10000,
      category_name: ["TKP SKD CPNS1"],
      total_duration: "240",
      score: 0,
      benefit: "untung belipat",
      desc: "testing",
      total_soal: 5,
      total_jawab: 0,
      status: "active",
    },
  ];

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
          Program yang seadng berjalan
        </div>
        <div>
          <Link
            style={{
              color: "#7A7A7A",
            }}
            href={"/siswa/latihan-soal"}
            type="text"
            // onClick={() => router.push('/siswa/latihan-soal')}
          >
            View All
          </Link>
        </div>
      </div>
      <ListSoal data={data} isFetching={false} showBadge={false} />
    </>
  );
};
