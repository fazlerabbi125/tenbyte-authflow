import { create } from "zustand";
import { createJSONStorage, devtools, persist, StateStorage } from "zustand/middleware";
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

export interface AuthActions {
    setToken: (access_token: string) => void;
    clearToken: () => void;
}
export type AuthStore = AuthState & AuthActions;

function createPersistStorage(): StateStorage {
    if (typeof window !== "undefined") return localStorage;
    return {
        async getItem(name) {
            return Promise.resolve(null);
        },
        async setItem(name, value) {
            return Promise.resolve();
        },
        async removeItem(name) {
            return Promise.resolve();
        },
    };
}

export const useAuthStore = create<AuthStore>()(
    devtools(
        immer(
            // simplifies handling of immutable data structures (especially useful for nested objects)
            persist(
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
                }),
                {
                    name: "auth-store",
                    storage: createJSONStorage(createPersistStorage),
                }
            )
        )
    )
);
