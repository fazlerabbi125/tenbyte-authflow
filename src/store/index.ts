import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./auth.slice";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createPersistLocalStorage } from "./persist";

export const useLSStore = create<AuthSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createAuthSlice(...a),
            }),
            {
                name: "zustand-persist-local",
                storage: createJSONStorage(createPersistLocalStorage),
            }
        )
    )
);
