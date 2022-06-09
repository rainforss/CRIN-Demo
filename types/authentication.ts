import { IronSessionData } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      fullname: string;
      email: string;
      username: string;
    };
  }
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export type CurrentUser = {
  fullname: string;
  email: string;
  username: string;
  id: string;
};
