import { Card, Col, Empty, Progress, Row, Space, Tag, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { formatRupiah } from "@dsarea/@/lib/utils";
import ListNumberIcon from "../icons/ListNumberIcon";
import DurationIcon from "../icons/DurationIcon";
import MultiUserIcon from "../icons/MultiUsersIcon";
import { ImageDsArea } from "../Image/ImageDsArea";

interface dataType {
  data: any;
  isFetching: boolean;
  showBadge?: boolean;
}

export const ListSoal: React.FC<dataType> = ({
  data,
  isFetching,
  showBadge = true,
}) => {
  const filteredData = data.filter((e: any) => e.id !== 0);
  const router = useRouter();
  const pathname = usePathname();

  console.log(data, "data");
  return (
    <>
      {isFetching ? (
        <Card
          hoverable
          loading
          style={{ width: 240 }}
          cover={
            <Image
              alt="example"
              src="/card-image.svg"
              width={500}
              height={500}
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      ) : filteredData.length === 0 ? (
        <Col>
          <Empty description="Data not found" />
        </Col>
      ) : (
        <Row gutter={[24, 24]}>
          {data.map((e: any, i: any) => (
            <Col key={i}>
              <Card
                onClick={() => router.push(`${pathname}/soal`)}
                style={{
                  boxShadow:
                    "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
                }}
                hoverable
              >
                {showBadge && (
                  <Tag
                    style={{
                      position: "absolute",
                      // margin: 6,
                      borderRadius: 100,
                      // maxWidth: 200,
                      textAlign: "center",
                      right: 0,
                      width: "max-content",
                      color: e.status == "selesai" ? "#7A7A7A" : "#FFF",
                    }}
                    color={
                      e.status == "active"
                        ? "#32D583"
                        : e.status == "expired"
                        ? "#F04438"
                        : "#F7F7F7"
                    }
                  >
                    {e.status}
                  </Tag>
                )}
                <ImageDsArea src={e.image} />
                <div className="text-lg font-semibold mt-2">
                  {e.nama_product}
                </div>
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
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
