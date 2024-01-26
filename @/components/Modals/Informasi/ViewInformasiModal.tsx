"use client";
import React from "react";
import { Button, Modal, Space, Spin, Typography } from "antd";
import Image from "next/image";

interface Values {
  title: string;
  description: string;
}

interface ModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  loading: boolean;
  data: any;
}

const ViewInformasiModal: React.FC<ModalProps> = ({
  open,
  onSubmit,
  onCancel,
  loading,
  data,
}) => {
  return (
    <Modal
      zIndex={90}
      open={open}
      title={data.title}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSubmit();
      }}
      footer={
        <div>
          <Space>
            <Button onClick={onSubmit} type="text">
              Close
            </Button>
          </Space>
        </div>
      }
    >
      <Spin spinning={loading}>
        <Image
          src={data.image}
          width={1000}
          height={1000}
          alt="image-cover"
          // className=" aspect-square object-contain object-center mb-4"
          // style={{
          //   // padding: 0,
          //   // margin: 0,
          //   width: "100%",
          //   height: 220,
          //   // objectFit: "cover",
          // }}
          className="w-full h-[220px] aspect-video object-contain object-center mb-4"
        />

        <Typography.Text strong>{data.title}</Typography.Text>
        <Typography>{data.desc ? data.desc : "-"}</Typography>
      </Spin>
    </Modal>
  );
};
export default ViewInformasiModal;
