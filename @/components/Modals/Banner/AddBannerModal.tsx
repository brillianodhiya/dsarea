import React from "react";
import { Form, Input, Modal, Space, Switch, Upload, message } from "antd";
import { Spin } from "antd/lib";
import type { UploadProps } from "antd";
import {
  CloudUploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Image from "next/image";
interface Values {
  image: any;
  title: string;
  description: string;
  modifier: string;
}

interface AddBannerModalProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  loading: boolean;
}
// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const AddBannerModal: React.FC<AddBannerModalProps> = ({
  open,
  onCreate,
  onCancel,
  loading,
}) => {
  const [form] = Form.useForm();
  const [checked, setChecked] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [imageLoading, setImageLoading] = React.useState(false);

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    customRequest: dummyRequest,

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        setImageLoading(true);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        getBase64(info.file.originFileObj, (url) => {
          setImageUrl(url);
          setImageLoading(false);
        });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  };

  return (
    <Modal
      open={open}
      title="Unggah Banner"
      okText="Save"
      cancelText="Cancel"
      onCancel={() => {
        setImageUrl(undefined);
        onCancel();
        setChecked(true);
      }}
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
        setImageUrl(undefined);
        setChecked(true);
      }}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name={"image"}
            rules={[
              {
                required: true,
                message: "Gambar tidak boleh kosong!",
              },
            ]}
          >
            <Upload.Dragger {...props} accept=".png,.jpg">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="banner image"
                  width={20}
                  height={20}
                  style={{
                    width: "100%",
                    height: 100,
                    objectFit: "contain",
                  }}
                />
              ) : (
                <>
                  {imageLoading ? (
                    <LoadingOutlined />
                  ) : (
                    <>
                      <CloudUploadOutlined
                        style={{
                          fontSize: 44,
                          color: "#667085",
                        }}
                      />
                      <p className="ant-upload-text">Click to upload</p>
                      <p className="ant-upload-hint">png atau jpeg</p>
                    </>
                  )}
                </>
              )}
            </Upload.Dragger>
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            initialValue={true}
            name="status"
            label="Status"
          >
            <Space>
              {checked ? "Active" : "No Active"}
              <Switch
                defaultChecked={true}
                onChange={(checked) => {
                  setChecked(checked);
                  form.setFieldValue("status", checked);
                }}
                style={{
                  backgroundColor: checked ? "#3A9699" : "#E0E0E0",
                }}
              />
            </Space>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Judul tidak boleh kosong!",
              },
            ]}
            name="title"
            label="Judul"
          >
            <Input placeholder="Banner Name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} placeholder="Description" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddBannerModal;
