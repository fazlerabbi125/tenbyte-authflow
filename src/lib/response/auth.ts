import { User } from "@/store/auth.slice";
import { CommonSuccessAttrs } from "./common";

export interface LoginResponse extends CommonSuccessAttrs {
    access_token: string;
    refresh_token: string;
    result: User;
}

export type RefreshResponse = Omit<LoginResponse, "result">;
