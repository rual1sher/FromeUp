export interface IRequestRefresh {
  accessToken: string;
  refreshToken: string;
}

export type User = {
  id: number;
  name: string;
  avatar?: string | null; // url
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
  authorId: number;
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
