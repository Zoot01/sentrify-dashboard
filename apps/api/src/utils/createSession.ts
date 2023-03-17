import ENV from "@config/envVars";
import { Users } from "@prisma/client";
import { Request } from "express";

export const logNewSession = (id: string) => {
  console.log("🔑 New session created with ID: ", id);
};

export const createSession = (
  req: Request,
  user: Users,
  cb: (id: string) => void
) => {
  const { id, email, first_name, last_name, profile_img, role } = user;
  req.session.user = {
    id,
    email,
    first_name,
    last_name,
    profile_img,
    role,
  };
  if (ENV.NODE_ENV === "development") {
    cb(req.session.id);
  }
  return req.session.user;
};
