import type { User as AppUser } from "../store/auth.store";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    /**
     * The returned data from the authorize method
     * This is data we extract from our own backend JWT tokens.
     */
    export interface User {
        refresh_token: string;
        userInfo: AppUser;
    }

    /**
     * Returned by `useSession`, `getSession`, returned by the `session`
     * callback and also the shape received as a prop on the SessionProvider
     * React Context
     */
    export interface Session {
        refresh_token: string;
        userInfo: AppUser;
    }
}

declare module "next-auth/jwt" {
    export interface JWT {
        refresh_token: string;
        userInfo: AppUser;
    }
}
