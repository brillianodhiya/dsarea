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
  data: any[];
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
          <Empty
            description="Data not found"
            image={
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M96.0938 37.7391V58.3188C96.0938 58.3188 96.1813 78.6156 90.4219 88.3219C90.2766 88.5453 90.0312 88.6797 89.7672 88.6797C83.7875 88.6844 48.2891 88.6844 38.3641 88.6844C38.0906 88.6844 37.8375 88.5422 37.6953 88.3078C37.5547 88.075 37.5453 87.7844 37.6719 87.5422C37.6781 87.5313 37.6828 87.5188 37.6875 87.5078C41.2172 79.8609 42.4078 68.1359 42.7906 62.1406C42.8188 61.7094 42.4906 61.3391 42.0609 61.3109C41.6313 61.2828 41.2594 61.611 41.2313 62.0406C40.8578 67.8953 39.7234 79.3438 36.2828 86.8234C35.9078 87.5625 35.9391 88.4234 36.3594 89.1172C36.7844 89.8188 37.5438 90.2469 38.3625 90.2469C48.2891 90.2469 83.7891 90.2469 89.7672 90.2422C90.5688 90.2422 91.3141 89.8313 91.7438 89.1531C91.7469 89.1484 91.7516 89.1422 91.7547 89.1359C97.6813 79.1734 97.6562 58.3141 97.6562 58.3141V37.7391C97.6562 37.3078 97.3063 36.9578 96.875 36.9578C96.4438 36.9578 96.0938 37.3078 96.0938 37.7391Z"
                  fill="#A3A3A3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M41.4062 15.1205V16.1658C41.4062 16.222 41.4125 16.2767 41.4234 16.3299C41.4422 16.422 41.475 16.4986 41.5172 16.5658L41.5281 16.5861C41.6672 16.8033 41.9109 16.947 42.1875 16.947C42.1875 16.947 42.9687 16.883 42.9687 16.1517V15.1205C42.9687 14.6892 43.3187 14.3392 43.75 14.3392H74.3859C74.8172 14.3392 75.1672 13.9892 75.1672 13.558C75.1672 13.1267 74.8172 12.7767 74.3859 12.7767C74.3859 12.7767 50.1953 12.7767 43.75 12.7767C42.4562 12.7767 41.4062 13.8267 41.4062 15.1205Z"
                  fill="#A3A3A3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M96.5876 34.1171C96.897 34.2389 97.2486 34.1514 97.4658 33.9014C97.683 33.6499 97.7173 33.2905 97.5533 33.0014C93.1455 25.2968 87.1064 18.6108 79.4564 12.9311C79.1955 12.7374 78.8423 12.7249 78.5689 12.8999C78.297 13.0749 78.1595 13.4014 78.2267 13.7186C79.3783 19.2202 79.9439 24.7874 79.3861 30.4796C79.3095 31.1968 79.5736 31.9139 80.1001 32.4155C80.6283 32.9171 81.358 33.1452 82.0767 33.0311C87.0876 32.2577 91.9751 32.2952 96.5876 34.1171Z"
                  fill="#CCCCCC"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M32.4127 21.6938C38.6877 19.5657 45.9096 21.0016 50.908 26.0001C56.7815 31.8735 57.7362 40.8157 53.7705 47.686C53.6612 47.8766 53.6362 48.1032 53.7018 48.3126L56.1627 56.1141C56.1955 56.2204 56.1674 56.3344 56.0893 56.4126L55.8799 56.6219C55.819 56.6813 55.7299 56.7032 55.6487 56.6782L47.808 54.2048C47.5987 54.1391 47.3721 54.1641 47.183 54.2735C40.3127 58.2391 31.3705 57.286 25.4971 51.4126C18.4846 44.4001 18.4846 33.0126 25.4971 26.0001C25.8018 25.6954 25.8018 25.2001 25.4971 24.8954C25.1908 24.5907 24.6971 24.5907 24.3908 24.8954C16.769 32.5173 16.769 44.8938 24.3908 52.5173C30.6908 58.8157 40.2362 59.9094 47.6627 55.7969L55.1783 58.1688C55.8158 58.3688 56.5127 58.1985 56.9846 57.7266L57.194 57.5173C57.6846 57.0266 57.8612 56.3048 57.6518 55.6454L55.294 48.1657C59.4049 40.7407 58.3112 31.1938 52.0127 24.8954C46.5799 19.4626 38.7315 17.9016 31.9112 20.2141C31.5033 20.3516 31.283 20.797 31.4221 21.2048C31.5612 21.6126 32.0049 21.8329 32.4127 21.6938Z"
                  fill="#A3A3A3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M34.8953 33.3361C34.8609 31.847 35.4187 30.7595 36.2828 30.122C37.639 29.122 39.664 29.1642 40.764 30.4032C41.2375 30.9361 41.5109 31.6892 41.5187 32.6423C41.5375 34.9282 40.464 36.2642 39.4156 37.647C38.0031 39.5111 36.5922 41.4267 36.4172 44.6267C36.3703 45.4876 37.0312 46.2236 37.8922 46.2704C38.7531 46.3173 39.4906 45.6564 39.5375 44.7954C39.6703 42.3657 40.8328 40.9501 41.9062 39.5345C43.3437 37.6392 44.6687 35.7486 44.6437 32.6173C44.6281 30.7767 44.014 29.3564 43.1015 28.3282C40.9687 25.9282 37.0547 25.6689 34.4281 27.6064C32.8531 28.7689 31.7078 30.6939 31.7718 33.4095C31.7922 34.272 32.5078 34.9564 33.3703 34.9345C34.2328 34.9142 34.9156 34.1986 34.8953 33.3361Z"
                  fill="#CCCCCC"
                />
                <path
                  d="M37.8314 52.0736C38.8928 52.0736 39.7533 51.2132 39.7533 50.1517C39.7533 49.0903 38.8928 48.2299 37.8314 48.2299C36.77 48.2299 35.9095 49.0903 35.9095 50.1517C35.9095 51.2132 36.77 52.0736 37.8314 52.0736Z"
                  fill="#CCCCCC"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.0889 13.0688L25.3389 20.9313C25.8764 21.6063 26.8592 21.7188 27.5342 21.1828C28.2092 20.6469 28.3217 19.6625 27.7858 18.9875L21.5358 11.125C20.9983 10.45 20.0155 10.3375 19.3405 10.8735C18.6655 11.411 18.553 12.3938 19.0889 13.0688Z"
                  fill="#CCCCCC"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.34693 16.9797L18.6782 26.3547C19.4251 26.7844 20.3813 26.5266 20.811 25.7781C21.2407 25.0297 20.9813 24.075 20.2329 23.6453L3.90318 14.2703C3.15474 13.8406 2.20006 14.0984 1.77037 14.8469C1.34068 15.5953 1.59849 16.55 2.34693 16.9797Z"
                  fill="#CCCCCC"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.6875 34.375H15.625C16.4875 34.375 17.1875 33.675 17.1875 32.8125C17.1875 31.95 16.4875 31.25 15.625 31.25H4.6875C3.825 31.25 3.125 31.95 3.125 32.8125C3.125 33.675 3.825 34.375 4.6875 34.375Z"
                  fill="#CCCCCC"
                />
              </svg>
            }
          />
        </Col>
      ) : (
        <Row gutter={[24, 24]}>
          {data.map((e: any, i: any) => (
            <Col key={i}>
              <Card
                onClick={() => router.push(`${pathname}/${e.id}`)}
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
                  Expired at : {moment(e.expired_at).format("DD/MM/YYYY HH:mm")}
                </Typography>
                <Typography
                  style={{
                    fontWeight: 400,
                    color: "#7A7A7A",
                  }}
                >
                  Harga
                </Typography>
                <Typography.Text strong>
                  {" "}
                  {formatRupiah(e.harga)}
                </Typography.Text>
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
                    {Math.floor(
                      (parseFloat(e.total_sub_soal_done) / e.total_sub) * 100
                    )}
                    %
                  </div>
                  <Progress
                    showInfo={false}
                    percent={Math.floor(
                      (parseFloat(e.total_sub_soal_done) / e.total_sub) * 100
                    )}
                  />
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#7A7A7A",
                    }}
                  >
                    {e.total_sub_soal_done}/
                    <span style={{ fontWeight: 400 }}>{e.total_sub}</span>
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
                      {e.total_soal}
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
                      {e.total_durasi} min.
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
                      {e.total_peserta}
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
