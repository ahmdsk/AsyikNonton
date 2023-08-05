"use client";

import Loading from "@/components/Loading";
import MoviePagination from "@/components/MoviePagination";
import TrailerModal from "@/components/TrailerModal";
import { IMovie } from "@/interface/Movie";
import SiteConfig from "@/lib/SiteConfig";
import useLayoutStore from "@/store/LayoutStore";
import { useEffect, useState } from "react";

import { AiFillStar } from "react-icons/ai";
import { BiMoviePlay, BiTimeFive } from "react-icons/bi";

declare global {
  interface Window {
    my_modal_1: any;
  }
}

export default function Home() {
  const { search, loading, setLoading } = useLayoutStore((state) => state);

  const [movies, setMovies] = useState<Array<IMovie>>([]);
  // Modal Trailer
  const [movie, setMovie] = useState<IMovie>({} as IMovie);

  const { pageActive, setPageActive } = useLayoutStore((state) => state);
  const [totalPage, setTotalPage] = useState<number>(1);

  const openTrailer = (movie: IMovie) => {
    setMovie(movie);
    window.my_modal_1.showModal();
  };

  useEffect(() => {
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
            movies.map((movie, index) => (
              // <Link href={`/movie/${movie.movieId}`} key={index}>
              <div
                className="rounded-md bg-gradient-to-tl from-black to-zinc-700 basis-[46%] sm:basis-[180px] overflow-hidden"
                key={index}
              >
                <div
                  className={`w-full h-[240px] bg-cover relative`}
                  style={{
                    backgroundImage: `url(${movie.thumbnail_url})`,
                  }}
                >
                  <div
                    className={`flex ${
                      movie.rating != "" ? "justify-between" : "justify-end"
                    } items-center`}
                  >
                    {movie.rating != "" && (
                      <span className="text-slate-50 bg-black opacity-80 text-xs p-1 flex items-center gap-1">
                        <AiFillStar />
                        {movie.rating}
                      </span>
                    )}
                    <span className="text-slate-50 bg-black opacity-80 text-xs p-1 flex items-center gap-1">
                      <BiTimeFive />
                      {movie.duration}
                    </span>
                  </div>
                  {movie.eps_now && (
                    <span className="text-neutral bg-primary text-xs font-medium p-1 absolute bottom-0 right-0 rounded-s-sm">
                      {movie.eps_now}
                    </span>
                  )}
                  <span
                    className={`text-slate-50 ${
                      movie.quality == "TV Show" ? "bg-success" : "bg-primary"
                    } text-neutral font-medium text-xs p-1 absolute bottom-0 rounded-e-sm`}
                  >
                    {movie.quality}
                  </span>
                </div>
                <div className="space-y-3 p-3">
                  <div className="h-[120px] space-y-2">
                    <h2 className="text-white text-sm font-bold">
                      {movie.title}
                    </h2>
                    <p className="text-slate-50 text-xs">
                      {movie.genre?.map((genre, index) => (
                        <span key={index}>{genre}, </span>
                      ))}
                    </p>
                  </div>
                  <div
                    className={`flex items-center ${
                      movie.trailer != "" ? "justify-between" : "justify-end"
                    }`}
                  >
                    {movie.trailer && (
                      <button
                        className="btn btn-sm"
                        onClick={() => openTrailer(movie ?? [])}
                      >
                        <BiMoviePlay />
                      </button>
                    )}
                    <button className="btn btn-neutral btn-sm">Tonton</button>
                  </div>
                </div>
              </div>
              // </Link>
            ))
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
        <TrailerModal movie={movie} />
      </div>
    )
  );
}
