import React from "react";
import {
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import { Spin } from "antd/lib";
import { PercentageOutlined } from "@ant-design/icons";
import moment from "moment";

interface Values {
  name: string;
  code: string;
  kuota: string;
  expired_at: any;
  diskon: string;
}

interface EditVoucherModalProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  loading: boolean;
  initialValues?: Partial<Values>;
}

const EditVoucherModal: React.FC<EditVoucherModalProps> = ({
  open,
  onCreate,
  onCancel,
  loading,
  initialValues,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Modal
      zIndex={100}
      width={415}
      open={open}
      title="Edit Kategori"
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
            // console.log("Validate Failed:", info);
          });
      }}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item name="code" label="Code Voucher">
            <Input
              placeholder="Code Voucher"
              style={{
                marginRight: 10,
              }}
              disabled
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nama Voucher"
            rules={[
              {
                required: true,
                message: "Nama Voucher tidak boleh kosong!",
              },
            ]}
          >
            <Input placeholder="Nama Voucher" />
          </Form.Item>
          <Form.Item
            name="kuota"
            label="Quota"
            rules={[
              {
                required: true,
                message: "Quota tidak boleh kosong!",
              },
            ]}
          >
            <InputNumber
              placeholder="0"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="expired_at"
            label="Expired at"
            rules={[
              {
                required: true,
                message: "Expired tidak boleh kosong!",
              },
            ]}
          >
            <DatePicker
              placeholder="Expired at"
              style={{
                width: "100%",
              }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
          <Form.Item
            name="diskon"
            label="Diskon"
            rules={[
              {
                required: true,
                message: "Diskon tidak boleh kosong!",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              placeholder="00"
              addonAfter={<PercentageOutlined />}
              style={{
                width: 150,
              }}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default EditVoucherModal;
