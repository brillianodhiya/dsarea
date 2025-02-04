import React from "react";
import { Form, Input, Modal } from "antd";
import LoadingNonFullscreen from "../../LoadingComponent/LoadingComponentParent";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface AddCategoryModalProps {
  open: boolean;
  onCreate: (values: Values, form: any) => void;
  onCancel: () => void;
  loading: boolean;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onCreate,
  onCancel,
  loading,
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
            onCreate(values, form);
          })
          .catch((info) => {
            // console.log("Validate Failed:", info);
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
      </LoadingNonFullscreen>
    </Modal>
  );
};
export default AddCategoryModal;
