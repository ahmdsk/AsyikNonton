import { create } from "zustand";

type LayoutStore = {
    search: string;
    setSearch: (search: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const useLayoutStore = create<LayoutStore>((set) => ({
    search: "",
    setSearch: (search: string) => set({ search }),
    loading: true,
    setLoading: (loading: boolean) => set({ loading })
}));

export default useLayoutStore;