import { StateCreator } from "zustand";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface User {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    user_name?: string;
    avatar_path?: string;
    oauth_type?: string;
    timezone?: string;
    email_verified_at: string;
    id: string;
    newsletter: boolean;
}

export interface Profile extends User {
    created_at: string;
    password: string;
    profession?: string;
    team_size?: number;
    know_about_us?: string;
    organization_name?: string;
    phone_verified_at?: string;
    role?: string;
    oauth_id?: string;
    country?: string;
    address_line1?: string;
    address_line2?: string;
    state?: string;
    zipcode?: string;
    city?: string;
    payment_provider?: string;
    vat_rate?: string;
    deleted_at?: string;
    active_plan_id?: string;
}

export type Session =
    | {
          user: User;
          refresh_token: string;
      }
    | {
          user: undefined;
          refresh_token: undefined;
      };

export interface AuthSlice {
    access_token?: string;
    setToken: (access_token: string) => void;
    clearToken: () => void;
    isTokenExpired: () => boolean;
    getTokenPayload: () => JwtPayload | null;
}

export const createAuthSlice: StateCreator<AuthSlice, [["zustand/immer", never]], [], AuthSlice> =
    // simplifies handling of immutable data structures (especially useful for nested objects)
    (set, get) => ({
        access_token: undefined,
        setToken: (access_token: string) =>
            set((state) => {
                state.access_token = access_token;
            }),
        clearToken: () =>
            set((state) => {
                state.access_token = undefined;
            }),
        isTokenExpired: () => {
            const payload = get().getTokenPayload();
            if (!payload) return true;
            return payload.exp ? payload.exp * 1000 < Date.now() : true;
        },
        getTokenPayload: () => {
            const token = get().access_token;
            if (!token) return null;

            try {
                return jwtDecode(token);
            } catch {
                return null;
            }
        },
    });
