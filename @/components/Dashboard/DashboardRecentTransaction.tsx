"use client";
import { CustomBadge } from "@dsarea/@/components/Badge/CustomBadge";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import { formatRupiah } from "@dsarea/@/lib/utils";
import { Card, Col, Row, Table, Typography } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonInput from "antd/es/skeleton/Input";
import Button from "antd/lib/button";
import Column from "antd/lib/table/Column";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  isFetching: boolean;
  data: object[];
}
export const DashboardRecentTransaction: React.FC<Props> = ({
  isFetching,
  data,
}) => {
  const router = useRouter();

  return (
    <div>
      <Card>
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-base">
              Recent Transaction
            </Typography.Text>
          </Col>
          <Col>
            <Button
              onClick={() => router.push("/transaction")}
              color="red"
              style={{
                backgroundColor: "#EBF5F5",
                color: "#3A9699",
              }}
            >
              View All
            </Button>
          </Col>
        </Row>
        <Table
          dataSource={data}
          pagination={{
            hideOnSinglePage: true,
          }}
          rowKey={"id"}
          size="middle"
          scroll={{ x: 1000 }}
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
            render={(text, record: any) =>
              isFetching ? (
                <SkeletonInput active size={"small"} />
              ) : record.ds_voucher != null ? (
                `${record.ds_voucher.diskon}%`
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
};
