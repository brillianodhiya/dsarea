"use client";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Grid,
  Layout,
  List,
  Popover,
  Typography,
  message,
} from "antd";
import { Bell } from "lucide-react";
import DropdownLogout from "../Dropdown/DropdownLogout";
import React, { useContext, useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ProfileContext } from "@dsarea/@/lib/ProfileContext";
import { useQuery } from "@tanstack/react-query";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import Link from "next/link";

type HeaderProps = {
  title: string;
  isSubMenu?: boolean;
  subMenu?: any;
};

const { useBreakpoint } = Grid;

const CustomHeader: React.FC<HeaderProps> = ({
  title,
  isSubMenu = false,
  subMenu,
}) => {
  const { Header } = Layout;
  const router = useRouter();
  const screens = useBreakpoint();
  const { data } = useContext(ProfileContext);

  // buat state untuk menyimpan status fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // buat fungsi untuk mengubah status fullscreen berdasarkan document.fullscreenElement
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        // jika ada elemen yang fullscreen, maka ubah status menjadi true
        setIsFullscreen(true);
      } else {
        // jika tidak ada elemen yang fullscreen, maka ubah status menjadi false
        setIsFullscreen(false);
      }
    };

    // tambahkan event listener untuk mendeteksi perubahan fullscreen
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // hapus event listener ketika komponen unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const { data: dataCountNotif } = useQuery({
    queryKey: ["list-notif"],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/notif/jumlah/unread");
      return res.data.data;
    },
    initialData: 0,
  });

  const [loadingNotif, setLoadingNotif] = React.useState(false);
  const [listNotif, setListNotif] = React.useState([]);

  const handleOpenNotif = async () => {
    try {
      setLoadingNotif(true);
      const res = await axiosClientInstance.get("/api/notif/list");
      setLoadingNotif(false);

      setListNotif(res.data.data);
    } catch (error) {
      message.error(
        "Terjadi kesalahan saat mengambil data notifikasi, silahkan coba lagi"
      );
    }
  };

  const content = (
    <List
      style={{
        width: "200px",
      }}
      itemLayout="horizontal"
      dataSource={listNotif}
      renderItem={(item: any) => {
        let url = "";

        switch (item.title) {
          case "Pengumuman Nilai":
            url = "/siswa/pengumuman/" + item.product_id;
            break;

          case "Pembayaran Tertunda":
            url = item.url ?? "";
            break;

          case "Pembayaran Berhasil":
            url = "/siswa/latihan-soal/" + item.product_id;
            break;

          default:
            url = item.url ?? "";
            break;
        }

        return (
          <List.Item>
            <List.Item.Meta
              title={
                <Link href={url}>
                  {item.is_read ? (
                    item.title
                  ) : (
                    <Badge color="red" text={item.title} />
                  )}
                </Link>
              }
              description={
                <div
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {item.body} <br />{" "}
                  <span
                    style={{
                      marginTop: "4px",
                      color: "#A3A3A3",
                      fontSize: "12px",
                    }}
                  >
                    {item.tanggal}
                  </span>{" "}
                </div>
              }
            />
          </List.Item>
        );
      }}
    />
  );

  return (
    <Header
      style={{
        padding: 0,
        background: "#FFF",
        borderBottom: "1px solid #F3F3F3",
        display: isFullscreen ? "none" : "flex",
        alignItems: "center",
        gap: 10,
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 24,
        // position: "fixed",
      }}
    >
      {isSubMenu ? (
        <div>
          {screens.md ? (
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: "Home",
                },
              ].concat(subMenu)}
            />
          ) : null}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          >
            <ArrowLeftOutlined />
            <Typography.Text
              style={{
                fontSize: screens.xs ? 14 : 20,
              }}
              strong
              // className="!text-xl"
            >
              {title}
            </Typography.Text>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Typography.Text strong className="!text-xl">
            {title}
          </Typography.Text>
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: screens.md ? 24 : 16,
        }}
      >
        <Badge count={dataCountNotif}>
          <Popover
            placement="bottomRight"
            content={content}
            title="Notification"
            trigger="click"
            onOpenChange={(visible) => {
              if (visible) {
                handleOpenNotif();
              }
            }}
          >
            <Bell
              style={{
                cursor: "pointer",
              }}
            />
          </Popover>
        </Badge>

        <Avatar
          style={{ backgroundColor: "#D9D9D9", verticalAlign: "middle" }}
          size="large"
          gap={2}
          src={data?.picture}
          alt={data?.name}
          shape="circle"
        >
          {data?.name}
        </Avatar>
        <DropdownLogout />
      </div>
    </Header>
  );
};

export default CustomHeader;
