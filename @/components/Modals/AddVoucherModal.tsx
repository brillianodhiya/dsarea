import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Radio } from "antd";
import { PercentageOutlined } from "@ant-design/icons";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface VourcherModalProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const AddVourcherModal: React.FC<VourcherModalProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Tambah Voucher"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      width={415}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item name="code_voucher" label="Code Voucher">
          <Input placeholder="Code Voucher" />
        </Form.Item>
        <Form.Item name="nama_voucher" label="Nama Voucher">
          <Input placeholder="Nama Voucher" />
        </Form.Item>
        <Form.Item name="qouta" label="Qouta">
          <InputNumber
            placeholder="0"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item name="expired" label="Expired at">
          <Input placeholder="Expired at" />
        </Form.Item>
        <Form.Item name="diskon" label="Diskon">
          <InputNumber
            placeholder="00"
            addonAfter={<PercentageOutlined />}
            style={{
              width: 150,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddVourcherModal;
