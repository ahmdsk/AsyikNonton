import { IMovie } from "@/interface/Movie";
import { create } from "zustand";

type TrailerStore = {
    trailer: IMovie;
    setTrailer: (trailer: IMovie) => void;
}

const useTrailerStore = create<TrailerStore>((set) => ({
    trailer: {} as IMovie,
    setTrailer: (trailer: IMovie) => set({ trailer }),
}));

export default useTrailerStore;