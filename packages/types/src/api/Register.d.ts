import { ReasonPhrases, StatusCodes } from "http-status-codes";

export namespace RegisterAPI {
  export interface RegisterRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }

  export interface RegisterResponse {
    status: StatusCodes;
    message: ReasonPhrases | string;
  }
}
