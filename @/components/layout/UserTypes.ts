export interface RootUser {
  error: boolean;
  responseCode: number;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  user_id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  role_id: number;
  status: boolean;
  last_access: string;
  createdAt: string;
  updatedAt: string;
  ds_user_role: DsUserRole;
}

export interface DsUserRole {
  id: number;
  name: string;
}
