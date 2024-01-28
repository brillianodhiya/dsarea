import React from "react";
import {
  Avatar,
  Checkbox,
  Form,
  Input,
  List,
  Modal,
  Select,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { axiosClientInstance } from "@dsarea/@/lib/AxiosClientConfig";
import LoadingNonFullscreen from "../../LoadingComponent/LoadingComponentParent";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface AddRoleModalProps {
  open: boolean;
  onCreate: any;
  onCancel: () => void;
  loading: boolean;
}
interface ItemType {
  id: number;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({
  open,
  onCreate,
  onCancel,
  loading,
}) => {
  const [form] = Form.useForm();

  const { data, isFetching } = useQuery({
    queryKey: ["List Siswa", open],
    queryFn: async () => {
      const res = await axiosClientInstance.get("/api/users/list?role_id=3");
      return res.data.data;
    },
    initialData: [
      {
        id: 0,
        name: "test",
        desc: "test",
      },
    ],
  });

  const [selectedValues, setSelectedValues] = React.useState<ItemType[]>([]);
  // console.log(selectedValues);

  const isSelected = (item: ItemType): boolean => {
    return selectedValues.some((value) => value.id === item.id);
  };

  const handleSelection = (item: ItemType): void => {
    setSelectedValues((prevValues) => {
      const index = prevValues.findIndex((value) => value.id === item.id);
      if (index === -1) {
        // Item does not exist in array, so add it
        return [
          ...prevValues,
          {
            id: item.id,
            role_id: 3,
          },
        ];
      } else {
        // Item exists in array, so remove it
        const newValues = [...prevValues];
        newValues.splice(index, 1);
        return newValues;
      }
    });
  };

  const handleRoleChange = (item: ItemType, newRoleId: number): void => {
    setSelectedValues((prevValues) => {
      const updatedValues = prevValues.map((value) =>
        value.id === item.id ? { ...value, role_id: newRoleId } : value
      );
      return updatedValues;
    });
  };

  return (
    <Modal
      open={open}
      title="Add User Role"
      okText="Save"
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
        setSelectedValues([]);
      }}
      onOk={() => {
        if (selectedValues.length === 0) {
          alert("Please select at least one user");
          return;
        } else {
          onCreate(selectedValues).then(() => {
            setSelectedValues([]);
          });
        }
      }}
    >
      <LoadingNonFullscreen spinning={loading}>
        <Input placeholder="Search anything..." suffix={<SearchOutlined />} />
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item: any, index) => (
              <List.Item
                extra={
                  <Select
                    disabled={!isSelected(item)}
                    size="middle"
                    defaultValue={3}
                    style={{ width: 120 }}
                    onChange={(e) => {
                      handleRoleChange(item, e);
                    }}
                    options={[
                      { value: 1, label: "Super Admin" },
                      { value: 2, label: "Admin" },
                      { value: 3, label: "Siswa" },
                    ]}
                  />
                }
              >
                <Space>
                  <Space>
                    <Checkbox
                      checked={isSelected(item)}
                      onChange={() => handleSelection(item)}
                    />
                    <Avatar src={item.picture} />
                  </Space>
                  <div>
                    <div>{item.name}</div>
                    <div>{item.email}</div>
                  </div>
                </Space>
              </List.Item>
            )}
          />
        </div>
      </LoadingNonFullscreen>
    </Modal>
  );
};
export default AddRoleModal;
