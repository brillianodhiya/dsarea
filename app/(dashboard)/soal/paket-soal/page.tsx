"use client";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DropdownMenu from "@dsarea/@/components/Dropdown/DropdownMenu";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Input, Row, Space, Table, Typography } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonInput from "antd/es/skeleton/Input";
import Button from "antd/lib/button";
import Column from "antd/lib/table/Column";
import React from "react";
import { Eye, PencilLine } from "lucide-react";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [countFetch, setCountFetch] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const router = useRouter();

  const { data, isFetching } = useQuery({
    queryKey: ["sub_category", countFetch],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/soal/sub/category/list");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        title: "test",
        duration: 12,
        rules: "deskripsi",
        total: 80,
        ds_category: {
          id: 1,
          name: "TKP SKD CPNS1",
          desc: "Category CPNS1",
        },
      },
    ],
  });

  // fungsi untuk meminta fullscreen
  const requestFullscreen = () => {
    // cek apakah browser mendukung fitur fullscreen
    if (document.fullscreenEnabled) {
      // cek apakah sudah ada elemen yang fullscreen
      if (!document.fullscreenElement) {
        // jika tidak, maka buat elemen body menjadi fullscreen
        document.body.requestFullscreen().catch((err) => {
          // tangani error jika ada
          console.error(err);
        });
      }
    } else {
      // jika browser tidak mendukung fitur fullscreen, tampilkan pesan error
      // alert("Browser Anda tidak mendukung fitur fullscreen.");
    }
  };

  return (
    <div>
      <CustomHeader title="Soal" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Soal (Sub Kategori)
            </Typography.Text>
          </Col>
          <Col>
            <Space wrap>
              <Input
                placeholder="Search anything..."
                suffix={<SearchOutlined />}
                className="!w-[calc(100%-30px)]"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Link href={"/soal/paket-soal/add-soal"}>
                <Button type="primary" color="red" icon={<PlusOutlined />}>
                  Buat Soal
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
        <Table
          dataSource={searchFromValue(data, searchText)}
          pagination={{
            hideOnSinglePage: true,
          }}
          rowKey={"id"}
          scroll={{
            x: 800,
          }}
        >
          <Column
            title="Judul"
            dataIndex="title"
            key="title"
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography className="!text-[#3A9699]">{text}</Typography>
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => {
                    return a.title.localeCompare(b.title);
                  }
            }
          />
          <Column
            title="Kategori"
            dataIndex={["ds_category", "name"]}
            key="category"
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography className="!text-[#3A9699]">{text}</Typography>
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => {
                    return a.ds_category.name.localeCompare(b.ds_category.name);
                  }
            }
          />
          <Column
            title="Jumlah Soal"
            dataIndex="total"
            key="total"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => {
                    return a.total - b.total;
                  }
            }
          />
          <Column
            title="Durasi"
            dataIndex="duration"
            key="duration"
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography>{text} Menit</Typography>
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => {
                    return a.duration - b.duration;
                  }
            }
          />
          <Column
            title="Action"
            dataIndex="action"
            key="action"
            fixed="right"
            width={100}
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonButton active />
              ) : (
                <DropdownMenu
                  itemLists={[
                    {
                      key: "1",
                      label: "Preview",
                      icon: <Eye size={17} />,
                    },
                    {
                      label: "Edit",
                      key: "2",
                      icon: <PencilLine size={17} />,
                    },
                  ]}
                  onClick={(ev) => {
                    // console.log(ev, "EV");
                    if (ev.key == 1) {
                      requestFullscreen();
                      router.push(`/soal/paket-soal/preview-soal/${record.id}`);
                    } else if (ev.key == 2) {
                      router.push(`/soal/paket-soal/edit-soal/${record.id}`);
                    }
                  }}
                />
              )
            }
          />
        </Table>
      </Card>
    </div>
  );
}
