"use client";
import { SearchOutlined } from "@ant-design/icons";
import ViewInformasiModal from "@dsarea/@/components/Modals/Informasi/ViewInformasiModal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { useQuery } from "@tanstack/react-query";
import { Card, Input } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState({
    id: 0,
    name: "test",
    desc: "test",
    image: "/card-image.svg",
  });
  const { data, isFetching } = useQuery({
    queryKey: ["list-banner"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/banner/list?status=1");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        name: "test",
        desc: "test",
        image: "/card-image.svg",
      },
    ],
  });
  return (
    <>
      <ViewInformasiModal
        onCancel={() => setOpenModal(false)}
        onSubmit={() => setOpenModal(false)}
        open={openModal}
        data={selectedData}
        loading={false}
      />
      <CustomHeader title="Informasi" />
      <div className="p-6">
        <Input
          placeholder="Search anything..."
          suffix={<SearchOutlined />}
          className="!w-[calc(250px)]"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Card className="!mt-4">
          {searchFromValue(data, searchText).map((e: any, i: any) => (
            <Card
              onClick={() => {
                setOpenModal(true);
                setSelectedData(e);
              }}
              className="!mb-6"
              loading={isFetching}
              hoverable
              key={i}
              bodyStyle={{
                padding: 0,
                margin: 0,
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Image
                alt={e.title + i}
                // src={"/card-image.svg"}
                src={e.image}
                width={240}
                height={100}
                className="h-[140px] aspect-video object-contain object-center w-full sm:w-auto bg-[#EDF3EF]"
              />

              <div className="flex-row p-4 ">
                {/* <Typography.Text strong>{e.title}</Typography.Text>
              <Typography.Paragraph>{e.desc}</Typography.Paragraph> */}
                <Meta
                  title={
                    e.title.length > 20 ? e.title.slice(0, 20) + "..." : e.title
                  }
                  description={
                    e.desc.length > 20 ? e.desc.slice(0, 20) + "..." : e.desc
                  }
                />
              </div>
            </Card>
          ))}
        </Card>
      </div>
    </>
  );
}
