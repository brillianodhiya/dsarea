import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography } from "antd";

interface DynamiCFormAddSoal {
  form: any;
}

const DynamicFormAddSoal: React.FC<DynamiCFormAddSoal> = ({ form }) => {
  return (
    <>
      <Form.List name="soal">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <div
                // size="small"
                title={`Item ${field.name + 1}`}
                key={field.key}
                // extra={
                //   <CloseOutlined
                //     onClick={() => {
                //       remove(field.name);
                //     }}
                //   />
                // }
              >
                <Form.Item label="Name" name={[field.name, "name"]}>
                  <Input />
                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="List">
                  <Form.List name={[field.name, "list"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, "first"]}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, "second"]}>
                              <Input placeholder="second" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </div>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </>
  );
};
export default DynamicFormAddSoal;
