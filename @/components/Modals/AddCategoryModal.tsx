import React, { useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface AddCategoryModalProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Add Kategori"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
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
        <Form.Item name="name" label="Kategori Name">
          <Input placeholder="Kategori Name" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddCategoryModal;
