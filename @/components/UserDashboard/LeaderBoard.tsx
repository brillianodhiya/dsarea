import { List, Select, Space, Typography } from "antd";
import React from "react";
import Image from "next/image";
interface DataType {
  data: any;
  isLoading: boolean;
}

export const LeaderBoard: React.FC<DataType> = ({}) => {
  function sortByScoreDescending(dataArray: any[]) {
    return dataArray.sort((a, b) => b.score - a.score);
  }

  let dataArray = [
    { id: 1, name: "John", score: 85 },
    { id: 2, name: "Jane", score: 92 },
    { id: 3, name: "Bob", score: 78 },
    { id: 4, name: "Alice", score: 95 },
    { id: 5, name: "Charlie", score: 88 },
    { id: 6, name: "Eve", score: 90 },
    { id: 7, name: "David", score: 75 },
    { id: 8, name: "Grace", score: 96 },
    { id: 9, name: "Frank", score: 82 },
    { id: 10, name: "Helen", score: 89 },
  ];

  let sortedArray = sortByScoreDescending(dataArray);

  const myId = 99;

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
          myId > 10 && (
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
                    {myId}
                  </div>
                </div>
                <Space direction="vertical" size={0}>
                  <div style={{ fontSize: 12, color: "#3A9699" }}>
                    email@email.com
                  </div>
                  <div style={{ fontSize: 12, color: "#7A7A7A" }}>Anda</div>
                </Space>
              </Space>
              <div style={{ fontSize: 12, color: "#3A9699" }}>100</div>
            </div>
          )
        }
        bordered
        dataSource={sortedArray}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Typography.Text
                style={{
                  color: myId == index + 1 ? "#3A9699" : "#000",
                }}
                type="secondary"
              >
                100
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
                ) : myId === index + 1 ? (
                  <div>asd {/* Your content for myid equal to index */}</div>
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
              <div
                style={{
                  color: myId == index + 1 ? "#3A9699" : "#000",
                }}
              >
                user@email.com
              </div>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};
