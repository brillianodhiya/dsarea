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
  Grid,
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
const { useBreakpoint } = Grid;

export default function Home() {
  const router = useRouter();
  const screens = useBreakpoint();

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
                className="!w-[calc(100%-30px)]"
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
                {screens.md ? (
                  <Image
                    alt={" "}
                    src={record.image ? record.image : "/card-image.svg"}
                    width={1000}
                    height={1000}
                    // className="w-full aspect-square object-contain object-center"
                    style={{
                      objectFit: "cover",
                      width: "200px",
                      height: "auto",
                      // margin: "auto",
                      aspectRatio: "1/1",
                      backgroundPosition: "center",
                      backgroundImage: "url(/card-image.svg)",
                      borderRadius: "10px",
                      position: "relative",
                    }}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAAD5CAYAAAADZljUAAAABmJLR0QA/wD/AP+gvaeTAAA4o0lEQVQYGezBCbSdd33e++/ze999Bs1HsyfhQbbxDLYx2NjMBsJMWCSrzdAQKBm6miZZTW6bpGu19640Te9NQunqatKkN0lvmqzGtISEAAWDU6DWOfKADcYaDLZBtmxZtnRmHZ29399zz9bBQR5wsCXrbGn/Px/xNAemD1xm60PAGxFnY5ZTFMXJQcxgHgRuFv6DtSvX3sNRxHfYHnxieuJ3hH8KCIqiONk1gt8dWbHmFyXNs0AssD14cHr804bXUxTFqeYLa1es+QFJ88GCJ6YnPmJ4PUVRnIrecHB6/LdYoAPTBy6zdRcQFEVxqmogrwhbHwKCoihOZRWODwbwJoqiOPWJGwPYQlEU/eAlAaygKIp+sDIoiqJvBEVR9I2gKIq+ERRF0TeCoij6RlAURd8IiqLoG0FRFH0jKIqibwRFUfSNoCiKvhEURdE3gqIo+kZQFEXfCIqi6BtBURR9IyiKom8ERVH0jaAoir4RFEXRN4KiKPpGUBRF3wiKougbQVEUfSMoiqJvBEVR9I2gKIq+ERRF0TeCoij6RlAURd8IiqLoG0FRFH0jKIqib9T0IcvIwhgh+p14KrPI4ggBNiAWWXQJ0yW6zJOMKHpTTZ8RphOmZfFYp0OdNaa/GSOgrmoigpYggHASNo0aIkQYMFgcYUSXMV0yBGCKXlXTd4IwdHKA37jpJp5ojDH9TAYBVVS0qorhgRarhoYZGR5m/arVrFsxxKY1qzlt1WrWDA4yEB3CEA4iRScEBiQ6iLABU/Semn5kaELsb5InqKkb088agQA1oE6D5jowNYtlzB66WoZlwJrhYbasWcN5mzZxweYNbFm7hlVRU7HAphOJETJFD6rpO8YyVlJl0nIiGvqWRZdYJEMq6JKFMFLQASYNU4cO8625R/jfex9mkGBFa5CtG9dw+ZazuOKMs9iwYjkDdKgwAgwIMMIsUCKLYmnU9BnLyAaBBbIwQd8SiO+yQJjvErYRC8QRYYEqDgOHO/M8sfcxtu99lOW6jXPWrueac8/g6nPO5bTh5VQ0JA24AgciAQOiOPFq+ox5KlMcq3DQKJiQuPuJcb6+/wA33XEPV5y+iddc9FIu3nwaK9RQ06HtFiIRSXHi1RTFMcpoI0OdQhYZ4qDNlx7ax/YH93HOyAivueQCrjv3LNZVDbZBFEugpiiOkbIGjAVNmMiKlg2Yw3Vy79R+dm17nE9+ZYg3XvpS3njBVkZaA4STRcKY4sUXFMUxsozFEWGBGlJJyoAIKqxg7+F5/uSOu/lnH/9rPnXvfUwZUiIIQDgSiwWieHEERXECGfHw4cP8/vbb+dVPfoovP/IwU2GEaTVgQcoUL46gKE6w2h2aELsnZvjoZ77I733+Szww22Y+BokMAlG8OIKiOMHmNURlGHSbQ7X4/MN7+Zef+ASf3r2b2aixRZfFAlEcP0FRnGAtd0hBUhMWlRv2N8l/3jbGRz/zOfYcmqMRiEQO5KA4PoKiWGImCNfMM8Ctj+7jX/3lX3LbnsewWxDzWA3F8REUxRJrogHNU9MmSPbNd/jIF77AH999F3O0qFIUx0dQFEusbmpw0K6gE0ISMw7+6q57+a2bb2FfJkYUxy4oiiVmGQFVirCQhQLaIcb2Psqv//VneHBuDmQggIrihQmKoocZsXt6kv/n459kxxOzNNEg2hQvTFAUPS4y+FaT/PpnP8Vd+57AqihemKAoepwwdSbT7YaP/s9buOOhRzAgiucrKIqeJ1IiCQ7a/M4tX+KOR/YDDSBwRfH9CYriJDPlho9+8RZue2KKZIHaFN+foChOMjI83oHf/+wt3D8xRUZF8f0JiuIkY4lWAw81h/nozTezb3ae4vsTFMVJR6REUPHg4wf4xY/8FgcPd+hqwhTfW1AUJ5mOgi7NzLBzbJTR2+7k13/395hTRRiEKZ5dUBQnmcqG2Vl2jG2jPT6BCD7xxS/xXz/5KVIVxfcWFMXJZmaGnaOjzI+PY4Et5iP4D//l/+OunffRqSqKZxcURc8TSQUEzMxy3/ZR5scPEBJCIFM1yUT7ML/67/4dB6cO00hkGGRE8aSgKHpcIoTxzBQ7tm9jdmKcCPG3LGTRqOK+vY/yO3/8RzSqaDUiDKZ4UlAUPa7CaHaGnWOjtCcOEphnEka0q4qPff5mPn/77ZgATMoUi4Ki6HE5O8OO7duYnziI6BJHs4xoCIxs5mz+7//0ezx2eJYUhCm+IyiKniOSChEwM8vu0W20x8cJBRA8nYAmRFcA4eD+xw7wH//kJtAAxhSLgqLoMYkQJmem2bF9G3OTE4jvXxhQcNNn/ydf++b9SEGxKCiKHlNhNDvNzu3baE8cJDDPi4wMk502v/2Hf8h8Q/EdQdE3BAgQIECA6D05M82O7aO0Jw4iusTz0Q4IjBx8+at388Xbb0cRFFBTnHSMqGyMyRBYiAWGFARQuWFYZtXwMBtXrmD9qlWsGhpkxeAgihoE2TTMzR1mfK7N/qkpHpua5OChQxxyYETKKETViFQHBJEtrAYwx49IggrjmWl2j43SnpxABC9EWKRAMh1afPRPb+Laq17O8kpYFZUbkqAf1RQnGYMaEhGGSOiohdRh0G02Dw9z0eaNXLzlbLZu2Mi6oSEGKggnFUZOmqgwCwwCwqKROJwwMTvLN544yD17vs3XHnmYR2ammWuJOlvUjcg4DAQgjpckECZnptm5fRvzkxMEL5xYZLrEPQ8+wGdv3cb7brieBtNIyPSlmuIkIyJrOqpoAqpss14Nl569hddcsJWL129gWW2CRJmE5yEDAyZBItJ0CQGmUUMghgOGlg9w2vLNvOrsM5ih4oFHHuXLu3ayfc/DHKwgCDDHVZAwO8uO7aO0Jw4SCBDHS1MFv3/Tx3nrtdexrBU0qpEb+lFNcZIxKVMbNkTFDZdczOsuPp/Tli1nwA1EB7sCAks0gjBHhGswWAaBMRjkGjAChLGgdsMakpdtWsulm6/nfTMzfH7Hbm7Z/U2eaLexOG48M83O7WO0Jw4iusTxdu+eh7n5jtt4z6teSTaA6Es1RU8zwgRBG5QYMUzF6849i3e97Ao2r1xJ7QZlBwsyhQQYxKIUi2QwiAXmKAkC8x3mCJN0tUjOXDbMj179ct5y8YV84it387n7H2TGNa1sQNCowmpTOTACzPcmkqDCeHaa3WOjzE9OEAgQx1sIHOJP/sdf8dZXXUdNQ7+qKXpakMht5qsWA03FuSuX8yPXX8ulmzcy3HRwGmMs0RUssDmazHMSC8yzEEcYkgXZsHF4iA9eex2vvPAC/uuXvszXZmZIQasJKifQAC2eSxII49kZdoxtY35yguDFozQW3Ll7N1/ZuYtXXng+xvSjoOhpRmQMMtQkbz7/bH7tXW/l6o1rWNaZI0naYU4USUiCqs2lG1bzq+94Bz943gUMdwzUtBmgHQMY8VwqjGZn2DF2K+2JgwTmxWQJWczXwZ9+6pM0BP0qKHrecho+8Mor+eCrr2F9VaMMUjUg6kxOJNvIwlSsqmp+4rpr+KlXX8ea7KAwYSOem2en2TF2K+2Jg4gu8WLqBAihRnxhbDv7JyfoV0HRU0xXYEQqWSv42TdcwzsvupCaJAUpMIvE82clIpAaHJCVgSQwXSIQIgBhni4sIoEwVXa4cetL+Lk3v471IWQDBiqaSATIQVIBgplZdo3eyvzEBCKA4MVWJViJZCbm2nzy1m1YNQKsBEy/CIqeIiBlOhLrIvjHb3kjrz3jHAYaYwk5AQOmyzx/8xZ3TUzytZl5vnUIDnQq5mKQjiqEqTJpBPNRYVqAOJoBYXAioFJw1ekb+bm3vInNdY1owKaVSbhNCoRhdpYd20eZm5wkOHHEd1V1zV997mbaCDCLRL+oKXpOuGGlKj70utfx8o1raTDtgDBUho44JvP1AP/9wXuYrmtqBy1gpK7Ysnw5LxlZw7mrh1iXFcPtpF2DbcT3lmkGs+GqtWv48Btex7//7Bc4oAoziCMRoJkZdozdSnviIEGwFCSRmex84EG+8fBDXHr6JmQWCDD9ICh6zpDFj73yam44/TRCkIIKaDXQEcdEQJ0VDYOYYeajZlY1exJunZ7mz7+1h9/96m7+/KGH2UnSVoV4bhVmthWEgqs2r+cnrnslw3SwkiqNZma4d/RW2hMHEUvHNpKYB77w5VsxCRiLvhEUS8osikxSSTh50wVbufHCC0k10Ig6QYYUWBwTA6mGdpWACYNlhMBBUnGAFqOTM/zhvffx8Qf286iDdiUyQK4AYYFZZKBK6DipbG64YAvvuPhC6kxydobdo/+b9uQEIoBgqVnB58a2MU9FWPSToFhSAUQGnaomgAtGRnjftdcwlB0QoMCAAQMyx8RA2IBZJIR4ksUCY8NkVXHr9BP8wb07uPvADG0qiAZhwhB8VxgCMFA38N6rr+TS4QF2j25nbnKaoHfY5r4HH2TP4/uxBJh+ERRLT5DAqjQ/fsOrWUuHyA5VQooTrgmoDANmgdgXg3zsW9/mLx/ew6SCBtMVBvFMllimeX742qsYPDQFTnqJQhzqtLnjnq/TkegnQbGkEtNEh6Emef1FF3HxyEqEaUcgCzAnWpXQCDqCAGo3zNaDbDswzce+uYfxCjrBETLPEE4qw6Vnns2Pv+cdBEkvcSaqW9x6x504AjD9IiiWlkQjMTJY8QNXvoxQBzuwIAVhs1RS0AiMqWxSNffMHuIT39zDVFYYAwLE0YSQgwA+9O53cdbIGpwgGwNmaYWEU3zl3l3MtTuE6RtBsbQshjvibZdfyua6QlkhQGaBWQoWCAiD6BKWAdNI3Dt9iM88vIfJqsKVAXM08x0yq4eH+cB730st0QkIg1haZoGCR594gr2P7cc2/SIolpQw6wZqXnPheVRuk1T0usPR4o6JSe5+/CBtBJhnYxtJvPdNb2DTmtWAECCzpGSwTFviqzt2YVX0i6BYUpWTV209h7WtYVKAOvS6wBxWi88/8ih728YEz2XVUIv3vulGhhpIIMUSMynIKrhn1y7Sol8ExQnXCdOVBEPucP1Lz6bOhlTQSnpeCmSzP5Jbvv0wc1VFhUmJJgyYo6XgB1//Wuoq6YSRxFISwjIYdnz72yD6RlCcULLoMpAhzlo3wlmrVyMnXUb0uiorBpoAKnbMTnP/zCwdhCwC80xiy2kbuezC86kE2Cy9RIYH9u7lUHuefhEUJ5gJA4ZQ8vKztjCUARIydETPawc0EnVWzCnY/ug+DlUDVIZI8XRhUYV47dWvoGrMUjPfYXFwepoDk5P0i6A4oSwIQwBV+zAvP+MsBHRkujLoeXU2NJF0GbFr+hD7Ds9hjAlAHE2A3fCaq66mTjBLT0AaDqf51sN76RdBcUIZsIwFI/UgZ65dTZeAMITpeQEIsACJtoL7xidIGavh6SwQ5rwzzmTtqpX0gsiAMBXi24/tp8uCFKe0oDjxDOnkjLXrGGzVdMkcIdPzUvwtGRrMfQfHaVfBszPCDNY1W885GzBLyQIhEITh4X37sMA2CMSpKyhOKGFEEFScObKSypz0UsGjnXkmmsQETycLGZQN5205C2F6huCxx/eTmEoBBnPqCooTShgQYXHaqhVUKU52VYopm4NzbawKI55KyFBJbDnjdGR6yhPjB3EV2OZUFxQnlBFgTIc1Q8uxO5z0BJVr9rfnESDM0SzTlZhNq0aQTS8QYODg9AyRQcqETUqcqoLihLIEBsksGxwGcdKzjAxT8/NgI57KLBAgMbJyFZLoFRZMTs/QtBuQCbNAnKqCYmkIBgYGsM2pomkanotthoeG6TWH5uYwokuAOHUFxZKRhBCnCttgMM/OGIXoNZ1Om44bbJBB5pQVFCeUzAJhRLvdgRAnP9ME1BEgniEsGkHYHG4fBpte0kmwhCQsYSWnqqA44YRIYO7wYU4VxgxXLcA8nQALApiYmcQSvcQJtugywjKnqqA4oQzIHDHZngObk58YyGRkaBCZZzAGgwmemJjC9BgJY/pBUJxwwaL9U+PInPxsBhJGBgcJzNNZBoEQjzz2OJboJSEhRD8IihOukakzeHh8gozgZGeZNQMDrG7VGBDiaLKQRUp8c88ejOglVYAjwZASMqesoDihwsIyVvCtA+O0ESe7FGxZtYJl6pAKjHgqIYs2Yve3HsT0lsHBAQgIRErInLKCYkk0YfYfOsTjM3Oc7AYNF61dQSvbGLB4CssI8ej4QfbsfZRA9JLlw8PUEch8hzhVBcUJZUEKIs084t5HHuFktznEucuWIdfUboCGoxkIw5333EM7Ta9ZtXIllQU24tQWFCeUMV0CRHDbnofoVIFIUuKk4JqKNpWDMFy5aYQhFjgQRuYpAtMRfGH7KI5AZkkZkAFzxMjy5YQgQ5jEnLqC4oQSEIYUhMQ9Dz3MgfkO2AgQptdZBouOKk6PisvXr0WZhI0JQBxNiAOH5rj1K3fRZcxSMiAW2WbTyAghsFhgEKesoFgymcmhbLj9wT04aiJBpueJDmaAKtu87rRNrMugtrB4Vo3F39x5BwemZzAgiaUkvkNQEWzeuAnbgDjVBcWSkcS8gr/ZuYs5BDIWPS8MuM2VK4e5ZGQFdZoUdIJnlYg/++tP0omaLmOWkgADBgI4fdNmuow51QXF0lLwjf2Ps2vfPmSBg15jQGaBgcQSZ9TBW15yJkNOGoHFEQYs0yWxQNy+8z7u2nkfUgCmFwjTZScvOX0zMoRBBswpKyiWlpP5Vs3H77yL2bpGaug9JixMRVhscMM7tp7HehlhumSQOUIYIeyG+YTf+7Ob6FCBE7H0DMhgi6FWxekb1xEGGQSIU1dQLKnAOOGrjx5k7NsPQ4hekzLtEDgZAd639WzOHQpqt7GSZxJhaBR86e6v8aW77qSpQPQOA8ZsHFnDyIqV9IugWFICaot2VfOxbdvY36bnBKLVdDhTDT98/ks4f2iIVtPQSMji6RJIwdT8YX7zD/6AJgIZZDBglpYQXVHBOWeewUCIfhEUS8oICzIa9hya5aavfJX5AGEaVaDk+BNCdMnCCCNAhKETgIPIICyWdZJLli/j7118CRdVLeo0dmACIUwAIgxGJKYh+L0/+3Pue3QvClGZRaIHGBOQcNH5W1E29Iug6AGmSpNU3LxjJ7c9/AhghHmxGAHCYkFDqiHVYJll80EGdKLNGjW85cxNvP+Cl3AWh+nUScoIkIUBC9pVkpEgo6j50l138Ud/9SmsCmO6LI4QS8uAJZTmsgsvICT6RU3RU+YV/OEXRznzbW/hJSuHkVqYhuPJGDDGCBMIG4QJQ0bDOszVG9Zx7dpNjNSmnj8MYVLCBvFdtRuSBESV4v7Hn+BX/v1HmMHUBtsg0SsEWMmKqLjkvK2A6Bc1RU8xZt98h//w+f/FL7zzRjZXNeL4ERCYcBIYkbQrU2fDCienL1/O5SNruXDNGkYEdoMsOlULMErzDBatJggH+2fn+KXf+DfsGZ8kXHGERE8xIHPemaezefUImW2Q6Ac1RU8Rxphdk1P8p5tv5p+84c2MDASkQCCbFMdENpesHIZqiJX1AGtbFeuXL2PTsmFWSLToEG4jg10RThqBZcCEhQmMCEMTIMzjh+b4hd/8Te564AGgorKwjAHRW4S4+vLLUHawhOgPNUVPsUVYpCrG9o/zkZtv4WdvfD0b6xqrARk5OBYDFj983vkgqNqJIlnUgCHMgsB0mRTIIAsQjYQFssGAYf+hOX7p3/wmX77nXlJBBWSYLtFbFELthle9/ArqyjQWMn0hKHqLTBOJnFg1tz++n9/6zOd46NAhumRxzNww1G5Y1knqgDCEIQxhvg9BlaZ2g8M8ePAgP/Ovfp1b7tlJEyB6m23WLlvGlRddhNMEFf0iKHqLWZA4Ogw2HSpg54ED/OYn/prb9h2g0QDHLJKmbmirQ9Lh+aoMYWgr+PK9u/iJf/Yr3L57J5ZRil5nwVUXX8za4WEQKOkbNUVPCQRZ0wlDsMAEcH+T/M5nP8fbL7yAd19xOStbNQ5jiwqTErIIQ8o8l8qiYVFlME9nukyXECCDBYmxG6abhv/3Y3/Bf/4fH2d8vkMIKneQW1gsML1E5ggLqkze/LpXE9nBCpDpFzVFTzELZCrzHSKpkM3k1Az/13/8XT42sppf+sAHufqySxgiSSVghFgknksiZI5InskEQiwyqYYgMCIJbtt9L7/1B3/M7d+4n6aCAETQ5Uh6TQI1YBatbg1w/VUvQ4AJTNIvaooeJ4Rgeprdt9/G/MQEXx2f4MP/8l/zuldexU+//91ccO7ZDDcmZDoyEIB4oQIjGzCWUYrDEju+/RB/dNPH+Mzorcw24LoCN5wMEkhBSFz38ivZsGIFapIuYYzoBzVFTxPGM1PsGhulPTlOl1wz13T41Ng2vnjbGNe/7GX80NvfxisuvZjhVkVtYZsXTA1YNAqms+Hur+3iv3360/zNV+5istMgggDUJCAsep4FIVG1k/e85S0ESSOwIAymP9QUPUgYCEwzO8uusVHakxOETUbQCVO5Q6aYbuAzd9zJZ++4jfNOO403XHMNr7v6Ki46fysrBgeITKQAGxkEWCwSYLANCoywxGTb7PrmA/yv7bdxy7ZtfOPRvTQK0kIGRYLAdImeJyML0mzZuIFrLr+UdAeigjSmf9QUPScJAvDsFLvGRulMjiPAEmEDxgqCBUq6kor7HnmM+z7xSf7wLz7JupUruOics7nk/PN5yVmnc/rmzaxdtZplQ8NEFQjITA7NHeKJiXH27nuMbz20lx277uPr93+bx6cnaWPMAgVdkkEsECcTGTAgeMcbX8vKEHIFZoExol/UFD1GBOCZSXaOjdKeHEeI5+MwsHdqhr1f/Tqf/9rXCTpgU1cVdVUTquiyTdM0HG7mQQICS2BAIE4N4SAFKwaC9735RiqSpD/VFD1FGM9OsXNsG+3JCYQB8XxUJEakwEBSg2A+4XAmVnI0qYVYZLPAVIYwpMDipJYY2bz1VdexZd160h36VU3RA4SBwDQzM+zePkZ7ahIBRojnJ6noko3EAtNlQEDYPJVYZASkRAIpMBCc3AwsD/jAe95DOEkJ2fSjmmLJJYEAz06za2yUzuQEokuIF0Dm2YgniWcnusL8LXHykXmKkHjjNddw0dlnYhrkoF8FxZIyIgTMTLJz7Fbak+MUx9dgwE/+0PupO0aGFH0rKJZUYDQzzc7to8xPjCNMcXxIouvNr76WS845m6iDrsqmX9UUS0AYCExnZprdY2PMT44TgBGiOBYWmAU2Kwdb/PTf//sMkMw7qRAyWPSloDjhkkAEzB7ivu3b6UxOEAgQQhTHRgYTCPMjb7mRCzdtxDZBYESKvlVTnFBGhMBTk9y7fRvtyQkCURw/AsINZ24Y4YM/9H7qbLBEAUFxQgVGs9PsvG2UzuQEgSmOr7ZMTcPP/4MfZ83KIaykWFRTnBBGBNCZmWbX2CjtyXECY4QojpXMAmOgknnj1a/gXa96Na2mjRXIFAtqiheZMIEAz06xa/sozeQEgQAhimOVQG2wREisXzbEP/3whxioTNJCFpAUEBQvqhRYkDOT7Nh2K834OMVxJmNBSijNL/7DD3Huxg3gBpNAUiwKihdVZROz0+y+bYz21ATCFMdXmAUimoZ3Xn8d737t9VSZmAohRPGkmuJFYUQFdGam2TU6SntqHGGaEGGK4yAFMoRF2Jx72iZ+9Wc+zJCNESkhugyYAmqK40wkgTA5M83u7WN0piYQAkSY4hglEAYBYVE1ZnhZi3/7f/wy64eXYRJhwqbLFE8KiuPKQLBgZoodY9uYnzhIcXylhBy0UsjQqpJ/8dMf5oqztxBqQKZ4djXFcRU2zM2wc/sY7cmDBMIUx1NlFpjDaqhC/Nh738N7XnsDNQ2NQBbFs6spjhMhTDM7w86xUdoTB6kkEhDFsTAgjuIkw7RI3nvtDfzC3/tRBpy0gwWitkhRPIua4hiJJBAmDh1i9/YxOhPjhAIDojhWFkSCAQEhsJPrL7+cX/3HP8NQJAbCQVeK4nuoKY6JgRB4eoqvj40yPzlOSBTHjwwCUhwRTXLNhS/lt3/5n7NmsIWdiKD4uwXFMQkMM1Ps3D5Ke3KcoDjeUtARNMERV11wPr/9a7/ChuEhqgQRFN+fmuIFEsLk7Cw7x0aZHz9ICIwQxbEyILpMJFQEdMyV51/AR/7FP2fzquXYDbgCDCTF362meJ5EEgjD7Ay7x0bpTIwTCrpEcTx0AgYbI5v5KqjS3HD5ZfzbX/pFNq5cBk7MAjUU37+a4nkxEIBnptm5fZS58QNUCmwjieLYGQhDg6ioaGXD269/Jf/nP/pZRgaX40wQxQtQUzwvgcmZKXZtH2V+4iCVRJckiuNDhtrQjiQCPvy2d/LzP/YjLAvTUQckwhQvQE3xfRLCNDMz7No+RnvyIMIYIYrjxUCGGGiSja0BfulDH+L9b3o9YYGDOttYiQmK56+m+DuIJBBGs7PsGttGZ3ISIUCI4niQAQsEteHczZv4jV/4J1x54fnICZhUAgJE8cLUFM/JiAA8M82O20aZn5wkKI6nSNEEOMxwY97+qmv55Z/5KTauHkbZBgUgimNXUzynwHhmmp3bt9GeGCfoEsXx04TJ7LBx1Qp+8QM/yQ++/g201GA6uAIZZIrjoKb4HoQwzew0O7eP0pkYRxgjRHGsjOgSpnaHG195Df/0Jz/IuRs3IjfgRAgBRpjieKgpnkYkQQCemWL32CjN5ARCgBDFCyGbJ3UwRrQQZ21Yx8//2A/zjutvYABhGgwIYYQpjqea4imMEMYz0+zcvo35yQmC4liEGyxICSzqhDXDA/zYu97JP3jXOxlZNkxtkCEDkuLFUlM8RWA8O8uOsW20J8cJukTxwlk1iQmL1QNDvO211/IT738f525Yz0CTJNARILBABlG8GGr6nADTJYTJ2Rl2jG6jMzmOMEaI4unMIgEGxCLZWOJodXZYtWyIt15/PR947w/yktM3EtkhMmlHTdiIpKsyGDDFi6GmzxmRVAQLZqfYNbqNZnICIUCI4pkSS+BABosjZMAiJcJJ7eT0Det59xtew/vf/FbOWLcW0UAaUdEVbjhaUryYavqcJeSE2WnuHb2V+clJguK5RAZIWCwQUoMNqCIJVrTglZdcxvve+CZueNkVrFm2HDlxJp0KxAJTLIGaPlfZ5OwM947eSmdygqBLFN9bE5BKhBFQZbCi1eKKrefwpuuv5TXXXMUZmzZSZVK5oaN5IIg0VQpTLJWaPiTALMpDM9w7eiudyQmEMYHoPwLMIrNILDIgQBgZwg11HWxev56XX3wxN1xxOa+4/Ao2jaylhRAN2TZSTdKilR2gIRWYYinV9BlLDHTEdGVibpadt46Rk1MIgYUA0V8aJUJIoiuiQmlokiqCgYGK9atXsWXTRi467zwu27qVS7Zu5fSNG2hVIBsZcEOXAYkFiYBGAkSx9Gr6jYUFg502p7UP84YLtiKzQIj+lJEMDQ0xODjAsuFljAwPsX7tWjau38CGdes5bWQtq1csp1UFAThFOBEmMwFRnBz0xNRB00eMCIRJUsICOQHxVGaRAPP8iWcy35t4JvP8CTCLxFOZZ5AwFUcLNwiDOSLoMmZRIxGAgRSEhUxxEqjpMwEkXUGdpgljxJPEk8R3ieNDPD/ihRHPTjyDIdxwNCOsAIGBVAMILECIBhkCCIMRxcmhps8YI0xXCmQQxdGEwaZLLLD4LgOBAVOcbIKiKPpGUBRF3wiK58USlni+jDDHnyVSwhLfLwOWsPg7GbB4CkukxNEsYYmit9X0mZQIEmPaGsSA1KAUjkBAbWPaVBngGqsD0fCtyUN8/uu7GFm1jHe+9KVUCsJBEx1ElxELbLoEJKLDAJ++5x4OTE/wpksv5awVy8BBI1MTuEkI0VRJlUkqSEEYwiwwYFJgQZUilXQQn/7aLvZOznLmqhW865KX0gSkGgRECtElDJgFgjsf2sudex7GzPEjr7iO5VXFkywwQeUOkwmf/so9tLPN2y9/GSMD5onDyV/cdTeHJd689RzOXb+Wg/Pz/Pc776ah4fqzz+PyTRtoJAxUhlRigQwC5OCpjAUJVGaBMM9BLLIwYJkjZMCEhSy6UmBA5ohgUYoFpksW/aKmz1Q2VUI7Kv7qq3dzy33300GgDjXJ6uHlnLd+A685/0K2jKyh5TaVO8zT4uYd9/Px3Q+wnDav2nIOm1e0CIOyJgUpSCBkugxYySPTE/yX2+4i6wHQID963WW0GiNqDtioaljnwCk60UJuCEOYI+arQIbKokoWJOGKpg6+vHcPO/Yd4or1q/mByy6mlR0qaixImcRYIHOEJXaOH+Cvd++h0hzvuaZiOSAWyZDRxg6+vu9x/vSeHTRqsXZkPTdeeAYzM20+/Y1v0DFctvk0tq6tmOo0fG7Hg8wLzlp7GpduAhkCEFBlRQoMWCwwR7MCGSpMJ0CGMH8rBRbIHJFhhKkS6oRGkAIZwpDiiMocYRaloB1gi8oQDmQBxkr6QU2faSSa2oSDyUNt9szMEGkqErtmz8QUdz82yed27OS9l7+Ud175cgYzaLnhyi0buO+RB9i4aj3rBpdhRLtqQPNEBi0LG7KCzCQUhGHj4Cqu2nIm44fGefk5m2k1wsBjTfJrf/ZnnLZ6hF9799tYlvMooVEFhiYAw7I2dMKYREBHorJY1q4YaILQLNIwKWgiQB1kqCzEAgdk0oSYD1O7AZtKMNA0KCoMNDKECNfUmZy7ejmv2LiM+Qwu2bSWVkK6pmpatDGpIKNCJA7oiAUNCGRIIAPCRjaVDJhUYIsjBAEEBpJWGisw4kkyBMKZVApoKpBJJ6lEaVpRkRYoaGRQogQBKY6oG2MLYWRo1NBUQhYyfaGmz9QJncpkJChpqmAF5h+99QcYlnl4/CA3f+3rfGM6uekru1i1fA03XngubpKXrj+Nn3vru6BKBtWQJFgcjgH2T08xNTdHXbVYOTRE1BXODkOtmlVV8sHXvIoOZnW0aEdgzF27HmCfa1YqeHT+MMs6bVYOrmCAhgwxF2b/5BQHpjqEkjPWrGbd4CC128xXUGWFJcgaE4CBpKOKqU7DvvEJOhJDA8npq9awLKFO0VAjGqChHTUyNGFmsmG2PU8rK1a3hlizbCUffOPbadSwvh4mlTimkNpYYAwYUxMktROoAGGgUwf7Z6c4OD1PGFYvH2ZkxXJamVQYAw3ikclDPHZoBlVwxorVbBiqCRrEAsHE/GHablg1PEwYHpmeYmpmlrPXr2O5ggwxK7FvYpKZ9jzDgzWbR1YjTPX/twfvMZbW52HHv8/z+73nMnPO3Gfvd1izu4MXY1EHlmswhMXYxk3sREpSqUlaV62MGsW9qKoaWa3SRHUtWU6jWq3qJkrt5mJkahMbvEAMrG3A2GbB7DLshb0wy+7szs79zJzzvr/n6V5MylKrKuo/dM/7+RiIc1EnC5xpL3B6vkXRdkZ6e1gz0E9mBhjdINJlTIyYlBQER4hFQEPBe0eGaWji+pF+rt+0hs889DAnl5SH9/2EWzdtoTc6T4yP85Uf7KOaJT77Kx9ndVIOtxP/+TuPc+DsGUgJlwoVnCI6WQ73vW87vzC2k3/+Z39Ji8ivXv9edu8c48Efv8jD+/eDJ47MnuPTX3mQiPGP7riNWzZuYN+J1/nic88xP7dIG0HEqEvGzZs38+u7rqcpSq4QzAHBxMGdQiPf3D/OQz98gfmijbmgCEM9PfzDm3Zy3bqtBHfUFfEMccXcOb6wwGf/ag/n2gvsGBzkgXt3c3p2nn/zV4+QXPhnu+/k+pWrMTEcR1wQh+CGuHOJICTUjelC+K/feYpnj0/QFgipIEhg61CTB3bfxdpQ5fsnJ/jSMz/k9HIbLZxcnJo6t27ezK/dcgsD0qbQjD98ZC8HZib4B7vvZvzQ6zx28Ah1M/7glz9OX2/k5bPn+NLe5zg+M41IwkLG5p46v3n7LWwbXYF7YnY55wuPP8G+6SmkMMQdkciWgWE++fO3sbVZoyOJmimFJvDAlUjpNsJlBHCcC4Tz3FiVVbh5y1YixunFOd6YmydJIHmghdJ2xU1phYw/eeZ77DszzcqePj55x53ctWMbyxhLGLfu2MZtm65GHDoObcDccTNemzhK8oIKgSjK+v4+Vvc3qWQBvEN/f4PO4iKjg4P83JYtvGd0lJY7jxw5yBOHDmNExKEIjqkTHESE4/PTfOXZZzlrztqhEXZt2sKaoUGWFpfpG15BkBx1KNRRLwhunMpb/OGjezjRTqxoDvGb99xLf4zgwiJKGzAc4W1EcM4TxwEXznMM569fPcjjJ07QCs771qzixvUbqDbrFIUwWK1TqNMYGWaxtcT6vgY3XrWa7Sv6WHbhsUNH+OuXX0E84CLMRWPJG/zp3hf59vhhzCtUNCOrBI4u5Xx+z3c4PDvD6mYvt2/byareUQ7N53zusaeY6LSJZmTVGkVK9GU1rlu3kRs2biQE5eWZs3zpqSdYkkhVIu5KEuVKFSldxlWpmrNhYBA8USBMt5bYNNKPi+PiOBAE5lLO+NlJTBJ3bNvKXZvW8rfWr+HZg4eYSm3WDPSydrCf6eUcFzAgCVRE+PSHf4nPPfItnn1jks0DffzuRz5K1Y16MhzY3GjyB7/4S/Q36mQCCx74zJ9/ncNLy7w0cYoPbRsjAEnAAQFEhOnZOTpUiAa3vmcz947tIBYFZ2cWWNHbj3kCBBcnamRanS8++h1eWcxZXwt8evfPsz4G3BMXCeC8I0UQziws4AT6EO6/8QaubfSxYE6rNUvFBHVhe63Gv/vb9zHQGCIGZ07hM3/xEAdbLfafPsXHxt6DYCA5uDE1N8NNV2/gw2M7GagKIxXly/sOcaoDoxr4nft+gQ31Oqfazu9+9atMtju8dOQEG7ZupkHiH991G7VKhVqWUajy357dx/946RWOTs/TBmrJEFHEhStVpPQWjiM4QlIwUaIZIqA4joEYimEUVLRCjQg480VOHgPtvENHDS0iVRPEQAAXcEAdMnMsJkQcUDIL9CVDJOEqqDuLEjg+0+LQq4eZXm7R9g5T3kbFsE4HEcfcCa4EhyTg7mwaGmUwJM6Y8mfP/IDnDh3n7m3buHnLGjIrcBQTUAfNanz5u9/lwLlJBqsNHrj3bjZWexGM5QgujnrCUd4JMWfryhFq+/czQ8bnHnyEsc0rueeaMXauHsGtwFzpmHJ8qc1jR/Yx11okJWGmk4hAx3JSAHUIKSNXYWOjyidv3sUwQjsKHZQjkycpQpsU63zjpXGiOaC0NSNJh1PT58h1CwmYb8NTrx3jZGsBby9zfHYRBNwSJCOFhOIEB0e4EkW6nLjjYrgY4ChgApPTs4AQMHqbdcQKiuAY57lgktErwq4tG3lo/zh79r9C3imYOHOOhdwYDoHt6zfikjA1cEEQHEjixOTkAQQjWM5yUKpeoObMe+ALjz/GCydOkUTpr2Y0axmdvI17xDSAOwioKTiogwkM13p44K47+ONnnuPYnHFg+hxHnt7LUy/386l772Q068ERxBPTnYIfHjuOaYWlzjLLrQIaRgI01Qg2RxIQVy5yLnIB56eE/00kcNOm9cx84P18/aVxptodnj56kuePvs49Wzfzd3fdTIHz2cef4KWJUxQKK2JGvV5l2XLcDXXAwFVxMYIbg739NEKg8IKsUJZiYj61UY9Md9o89fIBhITjQKCunJeDOw+PH+Yvvv88LRKDWqW3EWgXieBOEQUVQURwF8C5UkW6nAlEg0oSJAgmwtki8b1DB0kCK3t6WNPXIJBQd0wNR1ATagl2v/8DvHjiNBPzM+w9eACJkRtGB/jYDTewrreO4ziXM3XEuCiJkkuFzCBzJ5Ex/sYEPzpxiuUofOK6MT783msJsc6//drX+Mn8Ihc4IIA4uIADAjjOdSvX83v3r+bFExN8Y99L7J+Z4cezC3z75XF+7br3gRhFcFwSY/39LOUFh1ttvvTUd1l7/27WxYBLjikEF5w3Cf83jESPK/ePjbFr61aePnSYR1/cz0SeeHT8KDdevZ3lzjI/emMCJPLR68b4xZ1jkFX4va8/wv6zZxEuJzggXODimIJ6oBnrVKzNpoEGn7r3bhrmFKqoA5Zohox2bnzr+edZ1MhVw738k7t2M1yv8dArB/jv33+emJwLxMERwLlSRbqdCoVETiznSEycnDzHN3/8AkeXCqom3H3DTvpUwCCYEAxUwILQCs6TL+3j+OwMt+7YwSeu30lQoRYC/ThKgbnxVgIYoAJZEhBo523mgbYoXuRMLy+TJFIrjPetWMsQgfHFWSbnZ6kUgbdzIAmIw9Ryi7m8YF1fDzdtXMemjZv4V1/+KpN5YnpxCVOI5kRTFOdT9+xmpjXP73/jUY4uLfGnTz/DAx+8g6q3MZSL3HlHNHD0zAzVngb9vTU+cu0YK4ZG+fyePXTUmF1apNXukIdASMLYunX0SeDY7DQnZ6ewwP9RrYBcQXGuWrOK7589y+tzU0ydm2Lz6nXgyrIk3jhzisbgIAs4c3mHSMa24ZWsqNcoPHHwxDHyqHhKdItIt3Eu48Ccwb9+8EEWQyLmzpIaPVS4d9vVfHD7VagZSQLiEUdxHMzJVMgkUITA3vFXOXjsCCkIFQsM1Bp8cOd7uH39GiDxJgEUQXDWDA4TT51lYmGBf/m1h5HOIh97/3WsGxol85zlEPmj7z7N+oEBXj99hpZETIy3cwFTUODk7DT//ltP0jfYYFWzj1anzVS+SCUZ16wcRg1yDYhlhGDUA6waHOTj77+eP/nhj3jm9dNs3T/OR669GvFAElDhp5zLOT+LmfLI+BGefO0Ya/uaDDWqvDY9S27OiAibRgZpLRdUc6et8J+efJJvDQxzfPI0ySEz4+2c/yUJdAJU88Rd265h78GDTLScz+/Zy4aRfqqqvLG0RGdumt//5U8wWKuwutnktcU2Txw+xNT8MlOLM5yea1NJisWCbqF0GXVBcCQZvQqDMTGQKUToDRlDfXXu2LSBf3HPnfydXTfQcC4SgyqJoegMBUdJLIkSqlV6VEiFcWZ2mcn5RY635tg3dY4vPvk0h2ZnEGBAhOHoqIKaECxx53u3s22gTmYwOTPDTKdNb6xx1cgQu3dup6HG5MISL0+cZPuKUT55662MqtMrSkAwV3qCMBSMITfcnUbWoFmvMzkzxwsnTnDw1Gn6K8JHx3Zw21U7iC70Ao0MBoLiyYgG9+3Yxo1rR2gE2PPjFzg8OUXUgmFVBiQQ3UjSQS1jWCsMRidzR03JDIaDMBgyqu44wkizgYpz8OxZfnD8OOfm59nQ28vfv+U21vY22TLUz/3XXUMzJKbnlnh54jjbV47y9+68nRVq1LVAEdyM/uA0qkafCnggiRDNcYXRSuSf7r6LXWtWIuIcPHWGAydPM7+wwMaRYeoxo56EX921i1W1jFQ4L75+gqxwfvu+e9jWqDKsGS5OKMABF65YMjU/7XQRRzA11GEpKS131A0QRKCSRSpiZGY4BS4BR1CgUygLLkQv6M0ijx44yB8/+yyrBvr4jVt2sapWZ0nh9LlZ/uPe7zHf7vCpmz7AHVs3M1vkCJEmGVJxAglDaZlwZnEOKYR6T5VVMZKRs6yRM8s5C52CeqXCcD0SDWaSEREGQgCH+WS0VVBJjOAkqixQMNNeYrmTEyXQ39NLM0QyDBOjbbBoTnBjMComgWjGXIDlDqgnetXRGJguEo4zHJQaTkcCsx0nDzBEhqpg4sx2CkyVhkAtFBSSsdCBuaVF2nSoaYXB3gZNMdwNxegEYWo5Z3GxoFKPrKrWuGCmSITgjCKAMmuJljh1DzTUQAVx5U0uRkHGTLtgbnkRF6Gv3sNAVqGWEoFEroFzyZlutQiqjPbW6FFYyI02ykDFCakAyVA3HOFKFOkywSEkSOr0BKNpgonyJvMEDmKCSgUMBKdQoxISoy6YOLkYh09PsiwZW1auZdvoCD2WyEMFM8dJZMnob/YRyBiNQkeFYEJITlJQjKYIjUYPwRREMDc6GqgYrK1UsWoNBxJOBIajEjA6klBgEENd6KiSJEcsMehOf62G1XoABzGgwwWCUNVAgwQoHVHUBcTp9URPBSopUohiCKtVQIxEpEAJ7gxUO6gLwRI5guKsiI5SkKviBKoFVIPQ7O9B6KGSoAASQvQMxKkVBauzCgzUcQx1wySwIgZcE4WDONSzQB0lmACOY7yVuFJ1Y00MrOhrYJII7mBt8iDkqoQkjKgy3GziGBeYOc0Q6HNInuOqhCQgXLEiXaZQJ5ogLrhwnuBczoGkXCJOZqCuFArBBAEU56rVK3ny2DGeefVVJqfP0tvsobPQ5vDMGRba8HNr1rJjzQh4jnnExXDNKVwJFrjAhfOUPBjRHBEQF3IVBAjmuBriERxcEgVKdMOBdgioO9GUQhUXp+AC4QJHEYekXBTMCXRIGsCF6AnHyVVQj+BOR4XgBcGhUAWPIA4ksAgWMZwiOMENdadQxVGUBESK4AhONBAExzE11EFIdBQqSRF3CoXgQqGOAAlBLQKC46g5gmPiRAMcTPgbApg4SR3HCa4YYMFRdyQZLpCrEUwQHEMRIk4CcUwCMSkKdNQJJlyJZGp+2ukiLiDO3xDA+dmc8wTEucgBBcTBBRYUnjjwCk+9eoSzCwuYC5kEVg402bVpA7dvvYa+EDApAOESx0UQ5zwBnAscEEC4xHkrBwQBnMu5AA6K4Dg/iwAOuIA4CI4jXCA4juCAcIkDgnOJcDnhEscFxDnPcYQLBAeENwmXOOCAcIkLiIMAzuUcEIQ3Cc4FDgjgvDMCOBc4IPwsLiDOeYKLIS5ciWRqftopvSMCBIRCnEIgGXTMMIMogVhRMs9RHENRE0qld4NI6R1xLjGcYCDiaHCigrqgOKQCARxFUMApld4NIqV3zAWSgwrnCZqEC1wcw7lIBBDEnVLp3SJSekeE85yLnEucNwk4COc5pdK7TqT0/0z4KadUeldTSqVS11BKpVLXUEqlUtdQSqVS11BKpVLXUEqlUtdQSqVS11BKpVLXUEqlUtdQSqVS11BKpVLXUEqlUtdQSqVS11BKpVLXUEqlUtdQSqVS11BKpVLXUEqlUtdQSqVS11BKpVLXUEqlUtdQSqVS11BKpVLXUEqlUtdQSqVS11BKpVLXUEqlUtdQSqVS11BKpVLXUEqlUtdQSqVS11BgnlKp1A3mFDhBqVTqBscV2EOpVLryOd+Wc/PnrnXkBSBQKpWuVAlspw41h34i8EVKpdKV7I+Gm8P7hfPcvXJuYeabwAcplUpXmseGGgMfEpFcOU9EOkONgQ8J/AcgUSqVrgQJ+MJQY+BDIpJznvA2U/NTY7j+FsLdwCagQalU+v/FAnAU59uI/Zfh5vB+3uJ/AjoGeW5Ku7rMAAAAAElFTkSuQmCC"
                  />
                ) : null}
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
