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
        <div
          style={{
            marginLeft: "-24px",
            marginRight: "-24px",
          }}
        >
          <Image
            alt={data.tile}
            src={data.image}
            width={1000}
            height={1000}
            style={{
              width: "100%",
              height: 200,
              objectFit: "contain",
              background: "#EDF3EF",
              marginBottom: 10,
            }}
          />
        </div>

        <Typography.Text strong>{data.title}</Typography.Text>
        <Typography>{data.desc ? data.desc : "-"}</Typography>
      </Spin>
    </Modal>
  );
};
export default ViewInformasiModal;
