import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./auth.slice";
import { devtools } from "zustand/middleware";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { createPersistLocalStorage } from "./persist";
import { immer } from "zustand/middleware/immer";

export const useAuthStore = create<AuthSlice>()(
    devtools(
        // persist(
        immer((...a) => ({
            ...createAuthSlice(...a),
        }))
        //,     {
        //         name: "zustand-persist-local",
        //         storage: createJSONStorage(createPersistLocalStorage),
        //     }
        // )
    )
);
