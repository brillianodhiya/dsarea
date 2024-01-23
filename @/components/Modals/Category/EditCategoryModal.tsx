import React from "react";
import { Form, Input, Modal } from "antd";
import { Spin } from "antd/lib";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface EditCategoryModalProps {
  open: boolean;
  onCreate: (values: Values, form: any) => void;
  onCancel: () => void;
  loading: boolean;
  initialValues?: Partial<Values>;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
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
      open={open}
      title="Edit Kategori"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values, form);
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
          <Form.Item
            rules={[
              {
                required: true,
                message: "Nama kategori tidak boleh kosong!",
              },
            ]}
            name="title"
            label="Nama Kategori"
          >
            <Input placeholder="Kategori Name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} placeholder="Description" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default EditCategoryModal;
