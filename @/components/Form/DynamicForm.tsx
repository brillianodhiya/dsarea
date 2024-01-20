import React, { useRef } from "react";
import { CloseOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography, Image, Select } from "antd";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { Identifier, XYCoord } from "dnd-core";
import UploadImage from "./UploadImage";
import UploadSound from "./UploadSound";

// Membuat fungsi yang bernama angkaKeHuruf
function angkaKeHuruf(angka: number): string {
  // Membuat sebuah array yang berisi huruf-huruf alfabet
  const alfabet: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  // Mengecek apakah angka yang dimasukkan valid
  if (angka < 1 || angka > 26) {
    // Jika tidak valid, mengembalikan pesan kesalahan
    return "Angka harus antara 1 dan 26";
  } else {
    // Jika valid, mengembalikan huruf yang sesuai dengan indeks array
    return alfabet[angka - 1];
  }
}

const style = {
  cursor: "move",
};

interface DynamiCFormAddSoal {
  form: any;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const SubSoalForm: React.FC<{
  move: (from: number, to: number) => void;
  index: number;
  subField: any;
  id: number;
  form: any;
  remove: (index: number) => void;
  subOpt: any;
  indexParent: number;
}> = ({ move, index, subField, id, form, remove, subOpt, indexParent }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      move(dragIndex, hoverIndex);
      // form
      //   .getFieldInstance(`soal[${index}].no`)
      //   .setValue(angkaKeHuruf(hoverIndex + 1));
      form.getFieldsValue().soal.map((item: any, index: number) => {
        item.no = index + 1;
        item.jawaban.map((item2: any, index2: number) => {
          item2.key = angkaKeHuruf(index2 + 1);
        });
      });
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const [imgSoal, setImgSoal] = React.useState(undefined);
  const [audioSoal, setAudioSoal] = React.useState(undefined);

  return (
    <div
      key={subField.key}
      ref={ref}
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        width: "100%",
        gap: "8px",
      }}
      data-handler-id-sub-soal={handlerId}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          width: "100%",
          gap: "8px",
        }}
      >
        <div
          style={{
            ...style,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <HolderOutlined />
          <Typography
            style={{
              fontSize: "18px",
            }}
          >
            {angkaKeHuruf(id)}
          </Typography>
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Form.Item
                noStyle
                name={[subField.name, "key"]}
                initialValue={angkaKeHuruf(id)}
                hidden
              >
                <Input />
              </Form.Item>
            )}
          </Form.Item>
        </div>
        <Form.Item noStyle name={[subField.name, "jawaban"]} required>
          <Input placeholder={"Jawaban " + angkaKeHuruf(id)} />
        </Form.Item>
        <Form.Item noStyle name={[subField.name, "image"]}>
          <UploadImage
            size="small"
            onChange={(value) => setImgSoal(value)}
            value={imgSoal}
          />
        </Form.Item>
        <Form.Item noStyle name={[subField.name, "audio"]}>
          <UploadSound
            size="small"
            onChange={(value) => setAudioSoal(value)}
            value={audioSoal}
          />
        </Form.Item>
        <Form.Item noStyle name={[subField.name, "nilai"]} required>
          <Input placeholder="Score" />
        </Form.Item>
        <CloseOutlined
          onClick={() => {
            remove(subField.name);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "flex-start",
        }}
      >
        {imgSoal != undefined ? (
          <Space align="start">
            <Image
              alt={imgSoal + "Image Soal" + id}
              src={"https://api-dsarea.aitilokal.com/api/attach/" + imgSoal}
              width={140}
              style={{
                position: "relative",
              }}
              // className="w-[200px] object-contain aspect-auto"
            />
            <Button
              danger
              onClick={() => {
                setImgSoal(undefined);
                // delete fields[index].image;
                form.setFieldsValue({
                  soal: [
                    ...form
                      .getFieldsValue()
                      .soal.map((item: any, i: number) => {
                        if (i == indexParent) {
                          return {
                            ...item,
                            jawaban: [
                              ...item.jawaban.map((item2: any, i2: number) => {
                                if (i2 == index) {
                                  return {
                                    ...item2,
                                    image: undefined,
                                  };
                                } else {
                                  return item2;
                                }
                              }),
                            ],
                          };
                        } else {
                          return item;
                        }
                      }),
                  ],
                });
              }}
            >
              <CloseOutlined />
            </Button>
          </Space>
        ) : null}
        {audioSoal != undefined ? (
          <Space align="start">
            <audio id="audio" controls>
              <source
                id="source"
                src={"https://api-dsarea.aitilokal.com/api/attach/" + audioSoal}
                type="audio/mp3"
              />
              <source
                id="source"
                src={"https://api-dsarea.aitilokal.com/api/attach/" + audioSoal}
                type="audio/ogg"
              />
              <source
                id="source"
                src={"https://api-dsarea.aitilokal.com/api/attach/" + audioSoal}
                type="audio/wav"
              />
              Your browser does not support the audio element.
            </audio>
            <Button
              danger
              onClick={() => {
                setImgSoal(undefined);
                // delete fields[index].image;
                form.setFieldsValue({
                  soal: [
                    ...form
                      .getFieldsValue()
                      .soal.map((item: any, i: number) => {
                        if (i == indexParent) {
                          return {
                            ...item,
                            jawaban: [
                              ...item.jawaban.map((item2: any, i2: number) => {
                                if (i2 == index) {
                                  return {
                                    ...item2,
                                    audio: undefined,
                                  };
                                } else {
                                  return item2;
                                }
                              }),
                            ],
                          };
                        } else {
                          return item;
                        }
                      }),
                  ],
                });
              }}
            >
              <CloseOutlined />
            </Button>
          </Space>
        ) : null}
      </div>
    </div>
  );
};

const SoalForm: React.FC<{
  move: (from: number, to: number) => void;
  index: number;
  field: any;
  id: number;
  form: any;
  remove: (index: number) => void;
}> = ({ move, index, field, id, form, remove }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      move(dragIndex, hoverIndex);

      form
        .getFieldsValue()
        .soal.map((item: any, index: number) => (item.no = index + 1));

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const [imgSoal, setImgSoal] = React.useState(undefined);
  const [audioSoal, setAudioSoal] = React.useState(undefined);
  const [type, setType] = React.useState("pilihan");

  return (
    <div
      title={`Soal ${field.name + 1}`}
      key={field.key}
      ref={ref}
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        width: "100%",
        gap: "8px",
      }}
      data-handler-id-soal={handlerId}
    >
      <div className="w-full flex flex-row gap-3 align-top">
        <div
          className="w-1/4 flex flex-row gap-2 items-center"
          style={{
            ...style,

            marginTop: "-32px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_864_11670)">
              <path
                d="M5 5H5.00529M5 10H5.00529M5 15H5.00529M9.99736 5H10.0026M9.99736 10H10.0026M9.99736 15H10.0026M14.9947 5H15M14.9947 10H15M14.9947 15H15"
                stroke="#A3A3A3"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_864_11670">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h3
            className="font-semibold text-xl p-0 m-0"
            style={{
              fontSize: "24px",
            }}
          >
            {id}
            <Form.Item noStyle shouldUpdate>
              {() => (
                <Form.Item
                  noStyle
                  name={[field.name, "no"]}
                  initialValue={id}
                  hidden
                >
                  <Input />
                </Form.Item>
              )}
            </Form.Item>
          </h3>
        </div>
        <div className="w-full">
          <Form.Item noStyle name={[field.name, "soal"]} required>
            <Input.TextArea
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item noStyle name={[field.name, "image"]}>
            <UploadImage
              onChange={(value) => setImgSoal(value)}
              value={imgSoal}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item noStyle name={[field.name, "audio"]}>
            <UploadSound
              onChange={(value) => setAudioSoal(value)}
              value={audioSoal}
            />
          </Form.Item>
        </div>
      </div>
      <div
        style={{
          marginLeft: "12px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          {imgSoal != undefined ? (
            <Space align="start">
              <Image
                alt={imgSoal + "Image Soal" + id}
                src={"https://api-dsarea.aitilokal.com/api/attach/" + imgSoal}
                width={200}
                style={{
                  position: "relative",
                }}

                // className="w-[200px] object-contain aspect-auto"
              />
              <Button
                danger
                onClick={() => {
                  setImgSoal(undefined);
                  // delete fields[index].image;
                  form.setFieldsValue({
                    soal: [
                      ...form
                        .getFieldsValue()
                        .soal.map((item: any, i: number) => {
                          if (i == index) {
                            return {
                              ...item,
                              image: undefined,
                            };
                          } else {
                            return item;
                          }
                        }),
                    ],
                  });
                }}
              >
                <CloseOutlined />
              </Button>
            </Space>
          ) : null}

          {audioSoal != undefined ? (
            <Space align="start">
              <audio id="audio" controls>
                <source
                  id="source"
                  src={
                    "https://api-dsarea.aitilokal.com/api/attach/" + audioSoal
                  }
                  type="audio/mp3"
                />
                <source
                  id="source"
                  src={
                    "https://api-dsarea.aitilokal.com/api/attach/" + audioSoal
                  }
                  type="audio/ogg"
                />
                <source
                  id="source"
                  src={
                    "https://api-dsarea.aitilokal.com/api/attach/" + audioSoal
                  }
                  type="audio/wav"
                />
                Your browser does not support the audio element.
              </audio>
              <Button
                danger
                onClick={() => {
                  setAudioSoal(undefined);
                  // delete fields[index].image;
                  form.setFieldsValue({
                    soal: [
                      ...form
                        .getFieldsValue()
                        .soal.map((item: any, i: number) => {
                          if (i == index) {
                            return {
                              ...item,
                              audio: undefined,
                            };
                          } else {
                            return item;
                          }
                        }),
                    ],
                  });
                }}
              >
                <CloseOutlined />
              </Button>
            </Space>
          ) : null}
        </div>
        <Button
          danger
          onClick={() => {
            setImgSoal(undefined);
            remove(field.name);
          }}
        >
          Hapus Soal
        </Button>
      </div>

      <Form.Item noStyle name={[field.name, "type"]} initialValue={"pilihan"}>
        <Select
          style={{
            width: "200px",
          }}
          onChange={(v) => setType(v)}
        >
          <Select.Option value="pilihan">Pilihan Ganda</Select.Option>
          <Select.Option value="essay">Essay</Select.Option>
        </Select>
      </Form.Item>
      {/* Nest Form.List */}
      <Form.Item noStyle shouldUpdate>
        {() => (
          <div>
            {type == "pilihan" ? (
              <Form.List name={[field.name, "jawaban"]}>
                {(subFields, subOpt) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      paddingTop: "8px",
                    }}
                  >
                    {subFields.map((subField, index2) => (
                      <SubSoalForm
                        form={form}
                        id={index2 + 1}
                        index={index2}
                        move={subOpt.move}
                        remove={subOpt.remove}
                        subOpt={subOpt}
                        subField={subField}
                        key={subField.key}
                        indexParent={index}
                      />
                    ))}
                    <Button
                      type="default"
                      style={{ width: "200px", color: "#3a9699" }}
                      onClick={() => subOpt.add()}
                    >
                      + Tambah Opsi
                    </Button>
                  </div>
                )}
              </Form.List>
            ) : (
              <Form.Item
                noStyle
                name={[field.name, "jawaban"]}
                initialValue={[]}
                hidden
              >
                <Input />
              </Form.Item>
            )}
          </div>
        )}
      </Form.Item>
    </div>
  );
};

const DynamicFormAddSoal: React.FC<DynamiCFormAddSoal> = ({ form }) => {
  return (
    <>
      {/* <DndProvider backend={HTML5Backend}> */}
      <Form.List name="soal">
        {(fields, { add, remove, move }) => (
          <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
            {fields.map((field, index) => (
              <SoalForm
                field={field}
                index={index}
                move={move}
                key={field.key}
                id={index + 1}
                form={form}
                remove={remove}
              />
            ))}

            <Button
              type="default"
              style={{
                background: "#EBF5F5",
                color: "#3A9699",
              }}
              onClick={() => add()}
              block
              size="large"
            >
              + Tambah Pertanyaan
            </Button>
            {/* <Button type="dashed" onClick={() => move(3, 0)} block>
                NEXT{" "}
              </Button> */}
          </div>
        )}
      </Form.List>
      {/* </DndProvider> */}

      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}
    </>
  );
};
export default DynamicFormAddSoal;
