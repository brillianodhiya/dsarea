import { List, Select, Space, Typography } from "antd";
import React from "react";
import Image from "next/image";
import { sensorEmail } from "@dsarea/@/lib/utils";
interface DataType {
  data: any;
  isLoading: boolean;
}

export const LeaderBoard: React.FC<DataType> = ({ data, isLoading }) => {
  const checkRank = (rank: number) => {
    return data?.all?.some((val: { rank: number }) => val?.rank === rank);
  };

  const isRankExist = checkRank(data?.my_rank?.[0]?.rank);

  console.log(isRankExist, "isRankExist");

  return (
    <div className="flex flex-col my-4 gap-4">
      <div className="font-semibold text-base">Pengumuman 10 terbaik</div>
      <Select
        defaultValue="lucy"
        style={{
          width: "100%",
        }}
        onChange={() => {}}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
      <List
        loading={isLoading}
        header={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Nama</div>
            <div>Score</div>
          </div>
        }
        footer={
          !isRankExist && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 10,
              }}
            >
              <Space align="center">
                <div
                  style={{
                    display: "flex",
                    width: "24px",
                    height: "24px",
                    padding: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#AAD2D3",
                    backgroundColor: "#EBF5F5",
                    borderRadius: 100,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "#3A9699",
                    }}
                  >
                    {data?.my_rank?.[0]?.rank}
                  </div>
                </div>
                <Space direction="vertical" size={0}>
                  <div style={{ fontSize: 12, color: "#3A9699" }}>
                    {data?.my_rank?.[0]?.email}
                  </div>
                  <div style={{ fontSize: 12, color: "#7A7A7A" }}>Anda</div>
                </Space>
              </Space>
              <div style={{ fontSize: 12, color: "#3A9699" }}>
                {data?.my_rank?.[0]?.score}
              </div>
            </div>
          )
        }
        bordered
        dataSource={data.all}
        renderItem={(item: any, index) => (
          <List.Item
            actions={[
              <Typography.Text
                key={index + item.rank}
                style={{
                  color:
                    data?.my_rank?.[0]?.rank == index + 1 ? "#3A9699" : "#000",
                }}
                type="secondary"
              >
                {item.score}
              </Typography.Text>,
            ]}
          >
            <Space>
              <div>
                {index === 0 ? (
                  <Image
                    src={"/number-one.svg"}
                    alt={`number one ${index}`}
                    width={24}
                    height={24}
                  />
                ) : index === 1 ? (
                  <Image
                    src={"/number-two.svg"}
                    alt={`number two ${index}`}
                    width={24}
                    height={24}
                  />
                ) : index === 2 ? (
                  <Image
                    src={"/number-three.svg"}
                    alt={`number three ${index}`}
                    width={24}
                    height={24}
                  />
                ) : data?.my_rank?.[0]?.rank === index + 1 ? (
                  <div
                    style={{
                      display: "flex",
                      width: "24px",
                      height: "24px",
                      padding: 12,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "#AAD2D3",
                      backgroundColor: "#EBF5F5",
                      borderRadius: 100,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "#3A9699",
                      }}
                    >
                      {data?.my_rank?.[0]?.rank}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      paddingRight: 8,
                      paddingLeft: 8,
                    }}
                  >
                    {index + 1}
                  </div>
                )}
              </div>
              {data?.my_rank?.[0]?.rank === index + 1 ? (
                <Space direction="vertical" size={0}>
                  <div style={{ fontSize: 12, color: "#3A9699" }}>
                    {data.my_rank[0].email}
                  </div>
                  <div style={{ fontSize: 12, color: "#7A7A7A" }}>Anda</div>
                </Space>
              ) : (
                <div>{sensorEmail(item.email)}</div>
              )}
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};
