import { create, StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

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

export interface AuthState {
    access_token?: string;
}

export interface AuthSlice {
    access_token?: string;
    setToken: (access_token: string) => void;
    clearToken: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [["zustand/immer", never]]> = immer(
    // simplifies handling of immutable data structures (especially useful for nested objects)
    (set) => ({
        access_token: undefined,
        setToken: (access_token: string) =>
            set((state) => {
                state.access_token = access_token;
            }),
        clearToken: () =>
            set((state) => {
                state.access_token = undefined;
            }),
    })
);