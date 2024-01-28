import React from "react";
import { Upload, UploadFile, UploadProps, message } from "antd";
import LoadingNonFullscreen from "../LoadingComponent/LoadingComponentParent";

interface UploadImageProps {
  onChange?: (value: any) => void;
  value?: string;
  size?: "small" | "default";
}

const UploadImage: React.FC<UploadImageProps> = ({
  onChange,
  value,
  size = "default",
}) => {
  const [file, setFile] = React.useState<UploadFile[]>([]);
  const [loading, setLoading] = React.useState(false);
  const props: UploadProps = {
    name: "file",
    action: "https://api-dsarea.aitilokal.com" + "/api/upload/file",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZV9pZCI6MSwidXNlcl9pZCI6IjEwMDU3NDMyOTAwNDQ4NzI4MDQ2MyIsImVtYWlsIjoiYnJpbGxpZGhpeWFAZ21haWwuY29tIiwibmFtZSI6IkJyaWxsaWFubyBEaGl5YSBVbGhhcSIsImlhdCI6MTcwNDk5NjgzOSwiZXhwIjoxNzM2MTAwODM5fQ.JPWvVftUAB19t2i-8SG7EzIQmg9iFlWeU_ELauPRbH0",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);

        // setFile(info.fileList);
        if (onChange) {
          onChange(info.file.response?.data);
        }
      }
      if (info.file.status == "uploading") {
        setLoading(true);
      }
      if (info.file.status === "done") {
        setLoading(false);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  React.useEffect(() => {
    if (value) {
      setFile([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: "https://api-dsarea.aitilokal.com/api/attach/" + value,
        },
      ]);
    } else {
      setFile([]);
    }
  }, [value]);

  return (
    <div>
      <LoadingNonFullscreen spinning={loading}>
        <Upload
          {...props}
          accept=".jpg,.jpeg,.png,.gif"
          listType="text"
          showUploadList={false}
          // fileList={file}
        >
          <div
            className="div-to-button"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              display: "flex",
              padding: size == "small" ? "8px" : "14px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: size == "small" ? "16px" : "20px",
                height: size == "small" ? "16px" : "20px",
                // padding: "1.667px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {size == "small" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14.6667 4.75004C15.0809 4.75004 15.4167 4.41425 15.4167 4.00004C15.4167 3.58583 15.0809 3.25004 14.6667 3.25004V4.75004ZM9.33337 3.25004C8.91916 3.25004 8.58337 3.58583 8.58337 4.00004C8.58337 4.41425 8.91916 4.75004 9.33337 4.75004V3.25004ZM12.75 1.33337C12.75 0.91916 12.4143 0.583374 12 0.583374C11.5858 0.583374 11.25 0.91916 11.25 1.33337H12.75ZM11.25 6.66671C11.25 7.08092 11.5858 7.41671 12 7.41671C12.4143 7.41671 12.75 7.08092 12.75 6.66671H11.25ZM14.6667 3.25004H12V4.75004H14.6667V3.25004ZM12 3.25004H9.33337V4.75004H12V3.25004ZM11.25 1.33337V4.00004H12.75V1.33337H11.25ZM11.25 4.00004V6.66671H12.75V4.00004H11.25Z"
                    fill="#7A7A7A"
                  />
                  <path
                    d="M7.66671 2C4.68115 2 3.18836 2 2.26087 2.9275C1.33337 3.85499 1.33337 5.34777 1.33337 8.33333C1.33337 11.3189 1.33337 12.8117 2.26087 13.7392C3.18836 14.6667 4.68115 14.6667 7.66671 14.6667C10.6523 14.6667 12.1451 14.6667 13.0725 13.7392C14 12.8117 14 11.3189 14 8.33333V8"
                    stroke="#7A7A7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3.33337 14.0001C6.14003 10.8325 9.29416 6.63175 14 9.78238"
                    stroke="#7A7A7A"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3333 5.74996C18.7475 5.74996 19.0833 5.41417 19.0833 4.99996C19.0833 4.58575 18.7475 4.24996 18.3333 4.24996V5.74996ZM11.6666 4.24996C11.2524 4.24996 10.9166 4.58575 10.9166 4.99996C10.9166 5.41417 11.2524 5.74996 11.6666 5.74996V4.24996ZM15.75 1.66663C15.75 1.25241 15.4142 0.916626 15 0.916626C14.5857 0.916626 14.25 1.25241 14.25 1.66663H15.75ZM14.25 8.33329C14.25 8.74751 14.5857 9.08329 15 9.08329C15.4142 9.08329 15.75 8.74751 15.75 8.33329H14.25ZM18.3333 4.24996H15V5.74996H18.3333V4.24996ZM15 4.24996H11.6666V5.74996H15V4.24996ZM14.25 1.66663V4.99996H15.75V1.66663H14.25ZM14.25 4.99996V8.33329H15.75V4.99996H14.25Z"
                    fill="#7A7A7A"
                  />
                  <path
                    d="M9.58329 2.5C5.85134 2.5 3.98536 2.5 2.82599 3.65937C1.66663 4.81874 1.66663 6.68471 1.66663 10.4167C1.66663 14.1486 1.66663 16.0146 2.82599 17.174C3.98536 18.3333 5.85134 18.3333 9.58329 18.3333C13.3152 18.3333 15.1812 18.3333 16.3406 17.174C17.5 16.0146 17.5 14.1486 17.5 10.4167V10"
                    stroke="#7A7A7A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.16663 17.4999C7.67494 13.5405 11.6176 8.2895 17.5 12.2278"
                    stroke="#7A7A7A"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </div>
          </div>
        </Upload>
      </LoadingNonFullscreen>
    </div>
  );
};
export default UploadImage;
