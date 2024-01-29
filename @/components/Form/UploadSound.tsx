import React from "react";
import { Upload, UploadFile, UploadProps, message } from "antd";

interface UploadSoundProps {
  onChange?: (value: any) => void;
  value?: string;
  size?: "small" | "default";
}

const UploadSound: React.FC<UploadSoundProps> = ({
  onChange,
  value,
  size = "default",
}) => {
  const [file, setFile] = React.useState<UploadFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const props: UploadProps = {
    name: "file",
    action: process.env.NEXT_PUBLIC_URL_BE + "/api/upload/file",
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
          url: process.env.NEXT_PUBLIC_URL_BE + "/api/attach/" + value,
        },
      ]);
    } else {
      setFile([]);
    }
  }, [value]);

  return (
    <div>
      <Upload
        {...props}
        accept=".mp3,.ogg,.wav"
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
              padding: size == "small" ? "1" : "1.667px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {size == "small" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
              >
                <path
                  d="M10.3333 4.66671V7.33337C10.3333 9.17432 8.84091 10.6667 6.99996 10.6667C5.15901 10.6667 3.66663 9.17432 3.66663 7.33337V4.66671C3.66663 2.82576 5.15901 1.33337 6.99996 1.33337C8.84091 1.33337 10.3333 2.82576 10.3333 4.66671Z"
                  stroke="#7A7A7A"
                  strokeWidth="1.5"
                />
                <path
                  d="M12.3333 7.33337C12.3333 10.2789 9.94548 12.6667 6.99996 12.6667M6.99996 12.6667C4.05444 12.6667 1.66663 10.2789 1.66663 7.33337M6.99996 12.6667V14.6667M6.99996 14.6667H8.99996M6.99996 14.6667H4.99996"
                  stroke="#7A7A7A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
              >
                <path
                  d="M12.1667 5.83329V9.16663C12.1667 11.4678 10.3012 13.3333 8.00004 13.3333C5.69885 13.3333 3.83337 11.4678 3.83337 9.16663V5.83329C3.83337 3.53211 5.69885 1.66663 8.00004 1.66663C10.3012 1.66663 12.1667 3.53211 12.1667 5.83329Z"
                  stroke="#7A7A7A"
                  strokeWidth="1.5"
                />
                <path
                  d="M14.6667 9.16663C14.6667 12.8485 11.6819 15.8333 8.00004 15.8333M8.00004 15.8333C4.31814 15.8333 1.33337 12.8485 1.33337 9.16663M8.00004 15.8333V18.3333M8.00004 18.3333H10.5M8.00004 18.3333H5.50004"
                  stroke="#7A7A7A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        </div>
      </Upload>
    </div>
  );
};
export default UploadSound;
