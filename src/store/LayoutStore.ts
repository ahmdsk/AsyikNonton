import { create } from "zustand";

type LayoutStore = {
    search: string;
    setSearch: (search: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    pageActive: number;
    setPageActive: (pageActive: number) => void;
}

const useLayoutStore = create<LayoutStore>((set) => ({
    search: "",
    setSearch: (search: string) => set({ search }),
    loading: true,
    setLoading: (loading: boolean) => set({ loading }),
    pageActive: 1,
    setPageActive: (pageActive: number) => set({ pageActive }),
}));

export default useLayoutStore;