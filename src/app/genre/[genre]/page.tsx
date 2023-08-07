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

export default function Genre({
  params
}: {
  params: {
    genre: string
  }
}) {
  const genre = params.genre;
  const { loading, setLoading } = useLayoutStore((state) => state);

  const [movies, setMovies] = useState<Array<IMovie>>([]);
  
  // Modal Trailer
  const { trailer } = useTrailerStore((state) => state)

  // Page Active
  const { pageActive, setPageActive } = useLayoutStore((state) => state);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);

      if(pageActive > totalPage) setPageActive(1);

      const res = await fetch(`${SiteConfig.apiURL}/movies?page=${pageActive}&category=${genre}`);
      const { data } = await res.json();
      
      setMovies(data.movies);
      setTotalPage(data.lastPage);
      setLoading(false);
    };

    getMovies();
  }, [genre, pageActive]);

  return (
    // Loading
    loading ? (
      <Loading />
    ) : (
      <div className="container mx-auto space-y-4">
        <h1 className="text-neutral text-2xl font-bold">
          {genre != ""
            ? `Menampilkan genre dari "${genre}"`
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
