import React, { useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Space,
  message,
} from "antd";
import { PercentageOutlined } from "@ant-design/icons";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import { axiosInstance } from "@dsarea/@/lib/AxiosConfig";
import moment from "moment";
import LoadingNonFullscreen from "../../LoadingComponent/LoadingComponentParent";

interface Values {
  name: string;
  code: string;
  kuota: string;
  expired_at: any;
  diskon: string;
}

interface VourcherModalProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  loading: boolean;
}

const AddVourcherModal: React.FC<VourcherModalProps> = ({
  open,
  onCreate,
  onCancel,
  loading,
}) => {
  const [form] = Form.useForm();
  const [loadingData, setLoading] = React.useState(false);
  const [isVoucherValid, setIsVoucherValid] = useState(false);

  const checkCodeVoucher = async (code: string) => {
    try {
      setLoading(true);
      const res = await axiosClientInstance.get(`api/voucher/check/${code}`);
      setLoading(false);
      console.log(res.data.data, "data");
      if (res.data.data) {
        setIsVoucherValid(true);
      }
      message.success(`${res.data.message}`);
    } catch (error) {
      setLoading(false);
      message.error(
        `${(error as any).response.data.message} : ${
          (error as any).response.data.data
        }`
      );
    }
  };

  return (
    <Modal
      open={open}
      title="Tambah Voucher"
      okText="Save"
      cancelText="Cancel"
      onCancel={() => {
        setIsVoucherValid(false);
        onCancel();
      }}
      width={415}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            setIsVoucherValid(false);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <LoadingNonFullscreen spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item name="code" label="Code Voucher">
            <div className="flex">
              <Input
                placeholder="Code Voucher"
                style={{
                  marginRight: 10,
                }}
              />
              <Button
                type="primary"
                loading={loadingData}
                onClick={() =>
                  form.getFieldValue("code")?.length > 0 &&
                  checkCodeVoucher(form.getFieldValue("code"))
                }
              >
                Check
              </Button>
            </div>
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
            <Input placeholder="Nama Voucher" disabled={!isVoucherValid} />
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
              disabled={!isVoucherValid}
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
              disabled={!isVoucherValid}
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
              disabled={!isVoucherValid}
            />
          </Form.Item>
        </Form>
      </LoadingNonFullscreen>
    </Modal>
  );
};
export default AddVourcherModal;
