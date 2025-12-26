export interface IRequestRefresh {
  accessToken: string;
  refreshToken: string;
}

export type PlanId = "gold" | "platinum";

export interface Plan {
  id: PlanId;
  title: string;
  price: number;
  description: string;
  popular?: boolean;
  icon: any;
  color: string;
  features: string[];
}

export type User = {
  id: number;
  name: string;
  nickname: string;
  avatar?: string | null;
  banner?: string | null;
  desc?: string;
  status: boolean;
  createdAt: string; // с бэка обычно приходит ISO string
};

export interface IRequestUser {
  name: string;
  nickname: string;
  avatar?: string | null;
  banner?: string | null;
  desc?: string | null;
}

export type Message = {
  id: string;
  authorId: number;
  text: string;
  createdAt: string; // ISO
  author: User;
};

export interface IRequestGroup {
  nickname: string;
  name: string;
  desc: string;
  image: string;
  banner: string;
  members: number[];
}

export interface IResponceGroup {
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
  nickname: string;
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
