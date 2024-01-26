import { formatRupiah } from "@dsarea/@/lib/utils";
import { Card, Progress, Space, Tag, Typography } from "antd";
import moment from "moment";
import Image from "next/image";
import MultiUserIcon from "../icons/MultiUsersIcon";
import DurationIcon from "../icons/DurationIcon";
import ListNumberIcon from "../icons/ListNumberIcon";
import { usePathname, useRouter } from "next/navigation";

interface dataType {}

export const SoalCard: React.FC<dataType> = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card
      onClick={() => router.push(`${pathname}/soal`)}
      style={{
        boxShadow:
          "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
      }}
      hoverable
    >
      <Tag
        style={{
          position: "absolute",
          // margin: 6,
          borderRadius: 100,
          // maxWidth: 200,
          textAlign: "center",
          right: 0,
          width: "max-content",
        }}
        color="#32D583"
      >
        Active
      </Tag>
      <Image
        alt={"alt"}
        src={"/card-image.svg"}
        width={500}
        height={140}
        className="w-full h-[100px] object-contain object-center"
      />
      <div className="text-lg font-semibold mt-2">Excel For Advance</div>
      <Typography
        style={{
          fontSize: 12,
        }}
      >
        Expired at : {moment().format("DD/MM/YYYY HH:mm")}
      </Typography>
      <Typography
        style={{
          fontWeight: 400,
          color: "#7A7A7A",
        }}
      >
        Harga
      </Typography>
      <Typography.Text strong> {formatRupiah(75000)}</Typography.Text>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            color: "#7A7A7A",
          }}
        >
          0%
        </div>
        <Progress showInfo={false} />
        <div
          style={{
            fontWeight: 700,
            color: "#7A7A7A",
          }}
        >
          1/<span style={{ fontWeight: 400 }}>4</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Space>
          <ListNumberIcon />
          <div
            style={{
              fontWeight: 400,
              color: "#7A7A7A",
              fontSize: 12,
            }}
          >
            90
          </div>
        </Space>
        <Space>
          <DurationIcon />
          <div
            style={{
              fontWeight: 400,
              color: "#7A7A7A",
              fontSize: 12,
            }}
          >
            90 min.
          </div>
        </Space>
        <Space>
          <MultiUserIcon />
          <div
            style={{
              fontWeight: 400,
              color: "#7A7A7A",
              fontSize: 12,
            }}
          >
            40
          </div>
        </Space>
      </div>
    </Card>
  );
};
