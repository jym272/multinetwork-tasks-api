export interface NewTaskType {
  name: string;
  description: string;
}

export interface DecodedPermission {
  authenticate: boolean;
  iat: number;
  exp: number;
}
