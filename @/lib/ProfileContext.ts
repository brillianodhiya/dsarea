import { createContext } from "react";

export const ProfileContext = createContext({
  error: false,
  responseCode: 200,
  message: "Success Get Data",
  data: {
    id: 0,
    user_id: "0",
    email: "email",
    verified_email: false,
    name: "default user",
    given_name: "default user",
    picture: "default user",
    role_id: 0,
    status: false,
    last_access: "no data",
    createdAt: "2024-01-11T08:58:33.000Z",
    updatedAt: "2024-01-12T03:59:16.000Z",
    ds_user_role: { id: 0, name: "no role" },
    isFullscreen: false,
  },
});
