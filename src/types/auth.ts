export interface IUserDto {
  idusers: number;
  uuid: string;
  role: number;
  phone: string;
  name: string;
  password: string;
}

export interface IInsertUser {
  role?: number;
  phone?: string;
  email?: string;
  name: string;
  password: string;
}
