import { create } from "zustand";

interface StoreState{
    isloggedIn: boolean;
    storeLogin: (token: string) => void;
    storeLogout: () => void;
}

const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

const removeToken = () => {
    localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>((set) => ({
    isloggedIn: getToken() ? true : false,
    storeLogin: (token: string) => {
        set({ isloggedIn: true });
        setToken(token);
    },
    storeLogout: () => {
        set({ isloggedIn: false });
        removeToken();
    },
}));