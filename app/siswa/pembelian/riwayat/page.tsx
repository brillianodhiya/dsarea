"use client";
import { SearchOutlined } from "@ant-design/icons";
import { CustomBadge } from "@dsarea/@/components/Badge/CustomBadge";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { formatRupiah } from "@dsarea/@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Input, Row, Space, Table, Typography } from "antd";
import SkeletonInput from "antd/es/skeleton/Input";
import Column from "antd/lib/table/Column";
import moment from "moment";
import Link from "next/link";
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
      <CustomHeader title="Riwayat Transaksi" />
      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              Riwayat Transaksi
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
          scroll={{
            x: 1800,
          }}
        >
          <Column
            title="No. Transaction"
            dataIndex="invoice"
            key="invoice"
            render={(text, record) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : record.status == "pending" ? (
                <Link target="_blank" href={record.link}>
                  {text}
                </Link>
              ) : (
                text
              )
            }
            // fixed="left"
            // width={140}
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => a.invoice.localeCompare(b.invoice)
            }
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            width={140}
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <CustomBadge value={text} status={text} />
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => a.status.localeCompare(b.status)
            }
          />

          <Column
            title="Nama Siswa"
            dataIndex="name"
            key="name"
            width={200}
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : (
                <Typography className="!text-[#3A9699]">
                  {record?.ds_user?.name}
                </Typography>
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) =>
                    a.ds_user.name.localeCompare(b.ds_user.name)
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
                record?.ds_product?.nama_product
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) =>
                    a.ds_product.nama_product.localeCompare(
                      b.ds_product.nama_product
                    )
            }
          />
          <Column
            title="Tanggal Pembelian"
            dataIndex="tanggal_transaksi"
            key="tanggal_transaksi"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) =>
                    moment(a.tanggal_transaksi).unix() -
                    moment(b.tanggal_transaksi).unix()
            }
          />
          <Column
            title="Tanggal Pembayaran"
            dataIndex="tanggal_pembayaran"
            key="tanggal_pembayaran"
            render={(text) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : text ? (
                text
              ) : (
                "-"
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) =>
                    moment(a.tanggal_pembayaran).unix() -
                    moment(b.tanggal_pembayaran).unix()
            }
          />
          <Column
            title="Voucher"
            dataIndex="voucher"
            key="voucher"
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
            }
            sorter={
              isFetching ? undefined : (a: any, b: any) => a.voucher - b.voucher
            }
          />
          <Column
            title="Diskon"
            dataIndex="discount"
            key="discount"
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : record.ds_voucher != null ? (
                `${record.ds_voucher.diskon}%`
              ) : (
                "-"
              )
            }
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => a.discount - b.discount
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
            align="right"
            sorter={
              isFetching ? undefined : (a: any, b: any) => a.harga - b.harga
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
            align="right"
            sorter={
              isFetching
                ? undefined
                : (a: any, b: any) => a.total_pembayaran - b.total_pembayaran
            }
          />
        </Table>
      </Card>
    </div>
  );
}
