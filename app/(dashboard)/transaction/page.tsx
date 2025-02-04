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
import moment from "moment";
import React from "react";
import { CSVLink } from "react-csv";

// headers = [
//   { label: "First Name", key: "firstname" },
//   { label: "Last Name", key: "lastname" },
//   { label: "Email", key: "email" }
// ];

// data = [
//   { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
//   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
//   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
// ];

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
                className="!w-[calc(100%-30px)]"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <CSVLink
                data={data.map((val: any) => {
                  return {
                    invoice: val.invoice,
                    status: val.status,
                    name: val?.ds_user?.name,
                    product: val?.ds_product?.nama_product,
                    tanggal_transaksi: val.tanggal_transaksi,
                    tanggal_pembayaran: val.tanggal_pembayaran,
                    voucher: val.voucher,
                    discount: val.ds_voucher ? val.ds_voucher.diskon + "%" : 0,
                    harga: val.harga,
                    total_pembayaran: val.total_pembayaran,
                  };
                })}
                filename={"export-transaction" + moment().unix() + ".csv"}
                headers={[
                  { label: "No. Transaksi", key: "invoice" },
                  { label: "Status", key: "status" },
                  { label: "Nama Siswa", key: "name" },
                  { label: "Product", key: "product" },
                  { label: "Tanggal Pembelian", key: "tanggal_transaksi" },
                  { label: "Tanggal Pembayaran", key: "tanggal_pembayaran" },
                  { label: "Voucher", key: "voucher" },
                  { label: "Diskon", key: "discount" },
                  { label: "Harga", key: "harga" },
                  { label: "Total Pembayaran", key: "total_pembayaran" },
                ]}
              >
                <Button
                  type="primary"
                  onClick={() => {}}
                  color="red"
                  icon={<ExportIcon />}
                >
                  Export
                </Button>
              </CSVLink>
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
            render={(text) =>
              isFetching ? <SkeletonInput active size={"small"} /> : text
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
                  {record.ds_user.name}
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
                record.ds_product.nama_product
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
