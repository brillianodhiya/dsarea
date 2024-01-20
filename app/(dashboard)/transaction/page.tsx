"use client";
import { SearchOutlined } from "@ant-design/icons";
import { CustomBadge } from "@dsarea/@/components/Badge/CustomBadge";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import ExportIcon from "@dsarea/@/components/icons/ExportIcon";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { formatRupiah } from "@dsarea/@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Input, Row, Space, Table, Typography } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonInput from "antd/es/skeleton/Input";
import Button from "antd/lib/button";
import Column from "antd/lib/table/Column";
import React from "react";

export default function Page() {
  const [searchText, setSearchText] = React.useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["transaksi"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(`/api/transaksi/list`);
      return res.data.data;
    },
    initialData: [
      {
        id: "id",
      },
    ],
  });

  return (
    <div>
      <CustomHeader title="Transaction" />
      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Transaction
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
              <Button
                type="primary"
                onClick={() => {}}
                color="red"
                icon={<ExportIcon />}
              >
                Export
              </Button>
            </Space>
          </Col>
        </Row>
        <Table
          dataSource={searchFromValue(data, searchText)}
          pagination={{
            hideOnSinglePage: true,
          }}
          rowKey={"id"}
          size="middle"
        >
          <Column
            title="No. Transaction"
            dataIndex="invoice"
            key="invoice"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
            }
          />
          <Column
            title="Nama Siswa"
            dataIndex="name"
            key="name"
            width={"20%"}
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography className="!text-[#3A9699]">
                  {record.ds_user.name}
                </Typography>
              )
            }
          />
          <Column
            title="Product"
            dataIndex="product"
            key="product"
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                record.ds_product.nama_product
              )
            }
          />
          <Column
            title="Voucher"
            dataIndex="voucher"
            key="voucher"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
            }
          />
          <Column
            title="Diskon"
            dataIndex="discount"
            key="discount"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : text > 0 ? (
                `${text}%`
              ) : (
                "-"
              )
            }
          />
          <Column
            title="Harga"
            dataIndex="harga"
            key="harga"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                formatRupiah(text)
              )
            }
          />
          <Column
            title="Total Pembayaran"
            dataIndex="total_pembayaran"
            key="total_pembayaran"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                formatRupiah(text)
              )
            }
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <CustomBadge value={text} status={text} />
              )
            }
          />

          <Column
            title="Action"
            dataIndex="action"
            key="action"
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonButton active />
              ) : (
                <DropdownMenuAction
                  onClick={(ev) => {
                    // console.log(ev, "EV");
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
