"use client";

import CardMovie from "@/components/CardMovie";
import Loading from "@/components/Loading";
import MoviePagination from "@/components/MoviePagination";
import TrailerModal from "@/components/TrailerModal";
import { IMovie } from "@/interface/Movie";
import SiteConfig from "@/lib/SiteConfig";
import useLayoutStore from "@/store/LayoutStore";
import useTrailerStore from "@/store/TrailerStore";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    my_modal_1: any;
  }
}

export default function Home() {
  const { search, loading, setLoading } = useLayoutStore((state) => state);

  const [movies, setMovies] = useState<Array<IMovie>>([]);
  // Modal Trailer
  const { trailer } = useTrailerStore((state) => state);

  const { pageActive, setPageActive } = useLayoutStore((state) => state);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    
    const getMovies = async () => {
      const res = await fetch(`${SiteConfig.apiURL}/movies?q=${search}&page=${pageActive}`);
      const { data } = await res.json();

      setMovies(data.movies);
      setPageActive(data.page);
      setTotalPage(data.lastPage);
      setLoading(false);
    };

    getMovies();
  }, [search, pageActive]);

  return (
    // Loading
    loading ? (
      <Loading />
    ) : (
      <div className="container mx-auto space-y-4">
        <h1 className="text-neutral text-2xl font-bold">
          {search != ""
            ? `Hasil pencarian untuk "${search}"`
            : "Film yang masih hangat..."}
        </h1>
        <div className="flex flex-wrap gap-3">
          {movies.length > 0 ? (
            <CardMovie movies={movies} />
          ) : (
            <div className="text-center w-full">
              <h1 className="text-neutral text-2xl font-bold">
                Filmnya ngga ada
              </h1>
            </div>
          )}
        </div>

        {/* Pagination */}
        {movies.length > 0 && (
          <MoviePagination page={pageActive} totalPage={totalPage} />
        )}

        {/* Modal Trailer */}
        <TrailerModal movie={trailer} />
      </div>
    )
  );
}
