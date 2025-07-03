import { StateStorage } from "zustand/middleware";

export function createPersistLocalStorage(): StateStorage {
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