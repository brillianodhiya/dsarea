import { List, Select, Typography } from "antd";
import React from "react";

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

  console.log(sortedArray);

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
        footer={<div>Footer</div>}
        bordered
        dataSource={sortedArray}
        renderItem={(item) => (
          <List.Item
            actions={[<Typography.Text type="secondary">100</Typography.Text>]}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>Nama</div>
              <div>Score</div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
