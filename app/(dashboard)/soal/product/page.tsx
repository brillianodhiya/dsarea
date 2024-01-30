"use client";
import {
  DownOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import ViewProductModal from "@dsarea/@/components/Modals/Product/ViewProductModal";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { formatRupiah, getStatus, pickRandomItem } from "@dsarea/@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Badge,
  Card,
  Col,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import Button from "antd/lib/button";
import SkeletonInput from "antd/lib/skeleton/Input";
import Column from "antd/lib/table/Column";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  const [searchText, setSearchText] = React.useState("");
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState({
    id: 0,
    having_expired: false,
    expired_date: "2024-02-10 10:00:00",
    nama_product: "loading",
    harga: 10000,
    desc: "loading",
    benefit: "loading",
    image: "",
    is_publish: false,
    publish_date: null,
    createdAt: "2024-01-18T10:19:33.000Z",
    updatedAt: "2024-01-18T10:19:33.000Z",
    is_buying: false,
    category: [
      {
        id: 0,
        product_id: 0,
        name: "loading",
        desc: "loading",
        createdAt: "2024-01-18T10:19:33.000Z",
        updatedAt: "2024-01-18T10:19:33.000Z",
      },
    ],
  });

  const { data, isFetching } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/soal/product/list");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        having_expired: false,
        expired_date: "2024-02-10 10:00:00",
        nama_product: "loading",
        harga: 10000,
        desc: "loading",
        benefit: "loading",
        image: "",
        is_publish: false,
        publish_date: null,
        createdAt: "2024-01-18T10:19:33.000Z",
        updatedAt: "2024-01-18T10:19:33.000Z",
        is_buying: false,
        category: [
          {
            id: 0,
            product_id: 0,
            name: "loading",
            desc: "loading",
            createdAt: "2024-01-18T10:19:33.000Z",
            updatedAt: "2024-01-18T10:19:33.000Z",
          },
        ],
      },
    ],
  });
  return (
    <div>
      <CustomHeader title="Soal" />
      <ViewProductModal
        onSubmit={() => setOpenViewModal(false)}
        data={dataSelected}
        open={openViewModal}
      />
      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Product
            </Typography.Text>
          </Col>
          <Col>
            <Space wrap>
              <Input
                placeholder="Search anything..."
                suffix={<SearchOutlined />}
                className="!w-[250px]"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Link href={"/soal/product/add-product"}>
                <Button
                  type="primary"
                  onClick={() => {}}
                  color="red"
                  icon={<PlusOutlined />}
                >
                  Buat Product
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
            x: 1800,
          }}
          expandable={{
            expandedRowRender: (record: any) => (
              <div
                style={{
                  marginLeft: "48px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    marginBottom: "4px",
                    color: "#7A7A7A",
                  }}
                >
                  Kategori
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {record.category.map((item: any) => {
                    return (
                      <Tag color={pickRandomItem()} key={item.id}>
                        {item.name}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            ),
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <DownOutlined
                  color="#7A7A7A"
                  style={{
                    color: "#7A7A7A",
                  }}
                  onClick={(e) => onExpand(record, e)}
                />
              ) : (
                <RightOutlined
                  color="#7A7A7A"
                  style={{
                    color: "#7A7A7A",
                  }}
                  onClick={(e) => onExpand(record, e)}
                />
              ),
          }}
        >
          <Column
            title="Product"
            dataIndex="nama_product"
            key="nama_product"
            sorter={
              isFetching
                ? false
                : (a: any, b: any) =>
                    a.nama_product.length - b.nama_product.length
            }
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography className="!text-[#3A9699]">{text}</Typography>
              )
            }
          />
          <Column
            title="Jml. Soal"
            dataIndex={"total_soal"}
            key="total_soal"
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => a.total_soal - b.total_soal
            }
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography>{text}</Typography>
              )
            }
          />
          <Column
            title="Jml. Pembeli"
            dataIndex="total_pembelian"
            key="total_pembelian"
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => a.total_pembelian - b.total_pembelian
            }
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                text + " Orang"
              )
            }
          />
          <Column
            title="Harga"
            dataIndex="harga"
            key="harga"
            sorter={isFetching ? false : (a: any, b: any) => a.harga - b.harga}
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography>{formatRupiah(text)}</Typography>
              )
            }
          />
          <Column
            title="Start Date"
            dataIndex="start_date"
            key="start_date"
            sorter={
              isFetching
                ? false
                : (a: any, b: any) =>
                    moment(a.start_date).unix() - moment(b.start_date).unix()
            }
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography>{text}</Typography>
              )
            }
          />
          <Column
            title="End Date"
            dataIndex="end_date"
            key="end_date"
            sorter={
              isFetching
                ? false
                : (a: any, b: any) =>
                    moment(a.end_date).unix() - moment(b.end_date).unix()
            }
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography>{text}</Typography>
              )
            }
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <>
                  {text == "active" ? (
                    <Space
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      <Badge status={"success"} /> Active
                    </Space>
                  ) : (
                    <Space
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      <Badge status={"error"} /> Inactive
                    </Space>
                  )}
                </>
              )
            }
            sorter={
              isFetching
                ? false
                : (a: any, b: any) => a.status.length - b.status.length
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
                <DropdownMenuAction
                  onClick={(ev) => {
                    // console.log(ev, "EV");
                    if (ev.key == 1) {
                      setOpenViewModal(true);
                      setDataSelected(record);
                    } else if (ev.key == 2) {
                      window.localStorage.setItem(
                        "edit-product",
                        JSON.stringify(record)
                      );
                      router.push("/soal/product/edit-product");
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
