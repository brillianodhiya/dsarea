"use client";
import React from "react";
import { Button, Modal, Space, Spin, Typography } from "antd";
import moment from "moment";

interface Values {
  name: string;
  code: string;
  kuota: string;
  expired_at: any;
  diskon: string;
}

interface ModalProps {
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onEdit: () => void;
  loading: boolean;
  data: any;
}

const ViewVoucherModal: React.FC<ModalProps> = ({
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
      width={415}
      title={"View Voucher"}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSubmit();
      }}
      footer={
        <div>
          <Space>
            <Button onClick={onSubmit} type="primary">
              Close
            </Button>
          </Space>
        </div>
      }
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
            Code Voucher
          </Typography>
          <Typography
            style={{
              color: "#333333",
              fontSize: "16px",
            }}
          >
            {data.code}
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
            Nama Voucher
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
            Quota
          </Typography>
          <Typography
            style={{
              color: "#333333",
              fontSize: "16px",
            }}
          >
            {data.kuota}
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
            Expired at
          </Typography>
          <Typography
            style={{
              color: "#333333",
              fontSize: "16px",
            }}
          >
            {moment(data.expired_at).format("DD/MM/YYYY HH:mm")}
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
            Diskon
          </Typography>
          <Typography
            style={{
              color: "#333333",
              fontSize: "16px",
            }}
          >
            {data.diskon}%
          </Typography>
        </div>
      </Spin>
    </Modal>
  );
};
export default ViewVoucherModal;
