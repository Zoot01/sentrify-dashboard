import { HTTPStatusCodeType } from "@faker-js/faker/modules/internet";
import { UserRole } from "@prisma/client";
import { HttpStatusNames } from "@utils/errorHandler/types";
import "express-session";

export type UserSession = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_img?: string;
  role: UserRole;
};

declare module "express-session" {
  interface SessionData {
    user: UserSession;
  }
}
