import { ReasonPhrases, StatusCodes } from "http-status-codes";

const UserRole = {
  admin: "admin",
  recruiter: "recruiter",
};

export namespace LoginAPI {
  export type UserRole = (typeof UserRole)[keyof typeof UserRole];

  export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_img?: string;
    role: UserRole;
  }

  export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface LoginResponse {
    status: StatusCodes;
    message: ReasonPhrases | string;
    meta: User;
  }
}
