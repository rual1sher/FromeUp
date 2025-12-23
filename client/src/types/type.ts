export interface IRequestRefresh {
  accessToken: string;
  refreshToken: string;
}

export type User = {
  id: number;
  name: string;
  avatar?: string | null;
  banner?: string | null;
  desc?: string;
  status: boolean;
  createdAt: string; // с бэка обычно приходит ISO string
};

export type Message = {
  id: string;
  authorId: number;
  text: string;
  createdAt: string; // ISO
  author: User;
};

export interface IGroup {
  id: number;
  nickname: string;
  name: string;
  desc?: string;
  image?: string;
  banner?: string;
  status: boolean;
  createdAt: string;
}

export interface IRequestLogin {
  name: string;
  password: string;
}

export interface IResponceLogin {
  accessToken: string;
  refreshToken: string;
}

export interface IRequestRegister {
  name: string;
  password: string;
}

export interface IResponceRegister {
  accessToken: string;
  refreshToken: string;
}
