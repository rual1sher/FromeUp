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
