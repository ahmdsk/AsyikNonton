"use client";

import TrailerModal from "@/components/TrailerModal";
import { IMovie } from "@/interface/Movie";
import SiteConfig from "@/lib/SiteConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AiFillStar } from "react-icons/ai";
import { BiMoviePlay, BiTimeFive } from "react-icons/bi";

declare global {
  interface Window {
    my_modal_1: any;
  }
}

export default function Home() {
  const [movies, setMovies] = useState<Array<IMovie>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [movie, setMovie] = useState<IMovie>({} as IMovie);

  const openTrailer = (movie: IMovie) => {
    setMovie(movie);
    window.my_modal_1.showModal();
  };

  useEffect(() => {
    const getMovies = async () => {
      const res = await fetch(`${SiteConfig.apiURL}/movies`);
      const { data } = await res.json();

      setMovies(data.movies);
    };

    getMovies();
  }, []);

  return (
    <div className="container mx-auto space-y-4">
      <h1 className="text-neutral text-2xl font-bold">
        Film yang masih hangat...
      </h1>
      <div className="flex flex-wrap gap-3">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            // <Link href={`/movie/${movie.movieId}`} key={index}>
              <div
                className="rounded-md bg-black w-[180px] overflow-hidden"
                key={index}
              >
                <div
                  className={`w-full h-[240px] bg-cover relative`}
                  style={{
                    backgroundImage: `url(${movie.thumbnail_url})`,
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-slate-50 bg-black opacity-80 text-xs p-1 flex items-center gap-1">
                      <AiFillStar />
                      {movie.quality}
                    </span>
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

      <TrailerModal movie={movie} />
    </div>
  );
}
