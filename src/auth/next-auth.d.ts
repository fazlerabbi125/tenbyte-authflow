import type { User as AppUser } from "../store/auth.store";

declare module "next-auth" {
    interface Session {
        user: AppUser;
        refresh_token: string;
    }

    interface User extends AppUser {
        refresh_token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: AppUser;
        refresh_token?: string;
    }
}
