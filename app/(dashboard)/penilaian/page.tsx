"use client";
import { SearchOutlined } from "@ant-design/icons";
import DropdownMenuAction from "@dsarea/@/components/Dropdown/DropdownMenu";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Input,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import Column from "antd/lib/table/Column";
import { Eye } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const [searchText, setSearchText] = React.useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["penilaian"],
    queryFn: async () => {
      const res = await axiosClientInstance.get(`/api/penilaian/list`);
      return res.data.data;
    },
    initialData: [],
  });

  const router = useRouter();

  return (
    <div>
      <CustomHeader title="Penilaian" />

      <Card className="!m-6">
        <Row className="mb-4" justify={"space-between"} wrap>
          <Col>
            <Typography.Text strong className="!text-xl">
              List Kategori Soal
            </Typography.Text>
          </Col>
          <Col>
            <Input
              placeholder="Search anything..."
              suffix={<SearchOutlined />}
              className="!w-[calc(100%-30px)]"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
        </Row>
        <Table
          dataSource={searchFromValue(data, searchText)}
          pagination={{
            hideOnSinglePage: true,
          }}
          scroll={{
            x: 1000,
          }}
          loading={isFetching}
          rowKey={(record: any) => record.id}
        >
          <Column
            title="Product"
            dataIndex="nama_product"
            key="nama_product"
            render={(text, record: any) => (
              <Typography className="!text-[#3A9699]">{text}</Typography>
            )}
            sorter={(a, b) => {
              return a.nama_product.localeCompare(b.nama_product);
            }}
          />
          <Column
            title="Tanggal"
            dataIndex="expired_date"
            key="expired_date"
            render={(text, record) => (
              <Typography>{moment(text).format("DD/MM/YYYY HH:mm")}</Typography>
            )}
            sorter={(a: any, b: any) =>
              moment(a.expired_date).unix() - moment(b.expired_date).unix()
            }
          />
          <Column
            title="Jml. Soal"
            dataIndex="total_soal"
            key="total_soal"
            sorter={(a: any, b: any) => a.total_soal - b.total_soal}
          />
          <Column
            title="Jml. Siswa"
            dataIndex="total_siswa"
            key="total_siswa"
            sorter={(a: any, b: any) => a.total_siswa - b.total_siswa}
          />
          <Column
            title="Status Penilaian"
            dataIndex="persentase_koreksi"
            key="persentase_koreksi"
            render={(text, record) => (
              <Progress percent={Math.round(parseFloat(text))} />
            )}
            sorter={(a: any, b: any) =>
              a.persentase_koreksi - b.persentase_koreksi
            }
          />
          <Column
            title="Status"
            dataIndex="is_publish"
            key="is_publish"
            render={(text, record) => (
              <Tag color={text ? "green-inverse" : "red-inverse"}>
                {text ? "Published" : "Unpublished"}
              </Tag>
            )}
          />
          <Column
            title="Action"
            dataIndex="action"
            key="action"
            // render={(text, record: any) => (
            //   <DropdownMenuAction
            //     itemLists={[
            //       {
            //         label: "View",
            //         key: "1",
            //         icon: <Eye size={17} />,
            //       },
            //     ]}
            //     onClick={() => {
            //       router.push(
            //         "/penilaian/" +
            //           record.product_id +
            //           "?soal=" +
            //           record.nama_product
            //       );
            //     }}
            //   />
            // )}
            render={(text, record: any) => (
              // <DropdownMenuAction
              //   itemLists={[
              //     {
              //       label: "View",
              //       key: "1",
              //       icon: <Eye size={17} />,
              //     },
              //   ]}
              //   onClick={() => {
              //     router.push(
              //       "/penilaian/" +
              //         record.product_id +
              //         "?soal=" +
              //         record.nama_product
              //     );
              //   }}
              // />
              <Button
                // type="primary"
                onClick={() => {
                  router.push(
                    "/penilaian/" +
                      record.product_id +
                      "?soal=" +
                      record.nama_product
                  );
                }}
              >
                <Space>
                  <Eye size={17} />
                  <Typography>View</Typography>
                </Space>
              </Button>
            )}
          />
        </Table>
      </Card>
    </div>
  );
}
