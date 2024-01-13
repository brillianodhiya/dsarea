"use client";
import React from "react";
import { Form, Input, Modal, Spin, Typography } from "antd";

interface Values {
  title: string;
  description: string;
}

interface ModalProps {
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  loading: boolean;
  data: any;
}

const ViewCategoryModal: React.FC<ModalProps> = ({
  open,
  onSubmit,
  onCancel,
  loading,
  data,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title={"View Kategori"}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSubmit();
      }}
    >
      <Spin spinning={loading}>
        <div
          style={{
            marginTop: "24px",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              color: "#7A7A7A",
              fontWeight: "400",
            }}
          >
            Kategori Name
          </Typography>
          <Typography
            style={{
              color: "#333333",
              fontSize: "16px",
            }}
          >
            {data.name}
          </Typography>
        </div>
        <div
          style={{
            marginTop: "24px",
          }}
        >
          <Typography
            style={{
              fontSize: "14px",
              color: "#7A7A7A",
              fontWeight: "400",
            }}
          >
            Description
          </Typography>
          <Typography
            style={{
              color: "#333333",
              fontSize: "16px",
            }}
          >
            {data.desc}
          </Typography>
        </div>
      </Spin>
    </Modal>
  );
};
export default ViewCategoryModal;
