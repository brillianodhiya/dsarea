"use client";
import React from "react";
import { Button, Modal, Space, Typography } from "antd";
import LoadingNonFullscreen from "../../LoadingComponent/LoadingComponentParent";

interface Values {
  title: string;
  description: string;
}

interface ModalProps {
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onEdit: () => void;
  loading: boolean;
  data: any;
}

const ViewCategoryModal: React.FC<ModalProps> = ({
  open,
  onSubmit,
  onCancel,
  onEdit,
  loading,
  data,
}) => {
  return (
    <Modal
      zIndex={90}
      open={open}
      title={"View Kategori"}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSubmit();
      }}
      footer={
        <div>
          <Space>
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={onSubmit} type="primary">
              Close
            </Button>
          </Space>
        </div>
      }
    >
      <LoadingNonFullscreen spinning={loading}>
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
      </LoadingNonFullscreen>
    </Modal>
  );
};
export default ViewCategoryModal;
