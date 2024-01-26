import { SearchOutlined } from "@ant-design/icons";
import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";
import { Card, Col, Input, Row, Typography } from "antd";
import moment from "moment";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <CustomHeader title="Pengumuman" />
      <div className="p-4">
        <Input
          placeholder="Search anything..."
          suffix={<SearchOutlined />}
          className="!w-[250px]"
        />

        {/* <Row gutter={[24, 24]} className="mt-4">
          <Col>
            <Card>
              <Image
                src={"/card-image.svg"}
                alt="cover"
                width={100}
                height={100}
                className="w-full aspect-square object-cover h-[100px] object-center rounded-md"
                style={
                  {
                    // height: 100,
                    // width: "100%",
                    // objectFit: "fill",
                  }
                }
              />
              <Typography>Excel For Advance</Typography>
              <Typography>
                Expired at : {moment().format("DD/MM/YYYY HH:mm")}
              </Typography>
              <Typography>Harga</Typography>
              <Typography>Rp 75.000</Typography>
              <Typography>
                Peringkat : <span>30</span>/40 Siswa
              </Typography>
            </Card>
          </Col>
        </Row> */}
      </div>
    </div>
  );
}
