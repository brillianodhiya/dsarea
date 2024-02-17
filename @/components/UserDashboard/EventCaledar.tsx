import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Calendar, Card, Popover, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";
import LoadingNonFullscreen from "../LoadingComponent/LoadingComponentParent";
import { useQuery } from "@tanstack/react-query";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { useRouter } from "next/navigation";

interface dataType {
  event: {
    id: number;
    title: string;
    start: string;
    end: string;
  }[];
}

export const EventCalendar: React.FC<dataType> = ({ event = [] }) => {
  const [today, setToday] = React.useState(dayjs());
  const { data, isFetching } = useQuery({
    queryKey: ["list-calendar", today],
    queryFn: async () => {
      const res = await axiosClientInstance.get(
        "/api/users/siswa/dashboard/calender?tanggal=" +
          today.format("YYYY-MM-DD HH:mm:ss")
      );
      return res.data.data;
    },
    initialData: [],
  });

  const router = useRouter();

  return (
    <Card>
      <LoadingNonFullscreen spinning={isFetching}>
        <Calendar
          value={today}
          onChange={(date) => setToday(date)}
          fullscreen={false}
          headerRender={({ onChange, value }) => {
            // ubah menggunakan custome header hanya untuk mengganti bulan panah kanan untuk next month dan panah kiri untuk previous month

            return (
              <div style={{ padding: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <LeftOutlined
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      onChange(value.clone().subtract(1, "month"));
                    }}
                  />
                  <div>
                    <span>{value.format("MMMM YYYY")}</span>
                  </div>

                  <RightOutlined
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      onChange(value.clone().add(1, "month"));
                    }}
                  />
                </div>
              </div>
            );
          }}
          cellRender={(value) => {
            const listData = data.filter(
              (item: {
                id: number;
                title: string;
                start: string;
                end: string;
              }) => dayjs(item.end).isSame(value, "day")
            );

            return (
              <ul className="events">
                {listData.map(
                  (item: {
                    id: number;
                    title: string;
                    start: string;
                    end: string;
                  }) => (
                    <Popover
                      key={item.title}
                      placement="top"
                      content={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "240px",
                            gap: "2px",
                          }}
                        >
                          {/* looping ketika tanggal end date sama */}
                          {data.map(
                            (e: {
                              id: number;
                              title: string;
                              start: string;
                              end: string;
                            }) =>
                              dayjs(e.end).isSame(item.end, "day") ? (
                                <div
                                  key={e.title}
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 10,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    router.push(`/siswa/latihan-soal/${e.id}`);
                                  }}
                                >
                                  <div>{e.title}</div>
                                  <div
                                    style={{
                                      color: "#7A7A7A",
                                      background: "#F7F7F7",
                                      padding: "2px 8px",
                                      borderRadius: "100px",
                                    }}
                                  >
                                    {dayjs(e.end).format("HH:mm")}
                                  </div>
                                </div>
                              ) : null
                          )}
                        </div>
                      }
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "22px",
                          backgroundColor: "transparent",
                          position: "absolute",
                          top: 0,
                          zIndex: "30",
                        }}
                      ></div>
                      <div
                        key={item.title}
                        style={{
                          position: "absolute",
                          height: "4px",
                          width: "100%",
                          backgroundColor: "rgba(253, 176, 34, 1)",
                          bottom: "-6px",
                          borderRadius: "35%",
                        }}
                      ></div>
                    </Popover>
                  )
                )}
              </ul>
            );
          }}
        />
        {/* legends */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              background: "#3A9699",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: "100px",
            }}
          >
            Hari ini
          </div>
          <div
            style={{
              background: "#FDB022",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: "100px",
            }}
          >
            Try Out Kadaluarsa
          </div>
        </div>
      </LoadingNonFullscreen>
    </Card>
  );
};
