import { IMovie } from "@/interface/Movie";
import useTrailerStore from "@/store/TrailerStore";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { BiTimeFive, BiMoviePlay } from "react-icons/bi";

export default function CardMovie({ movies }: { movies: Array<IMovie> }) {
  const { setTrailer } = useTrailerStore((state) => state);

  const openTrailer = (movie: IMovie) => {
    setTrailer(movie);
    window.my_modal_1.showModal();
  };

  return movies.map((movie, index) => (
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
          {movie.duration != "" && (
            <span className="text-slate-50 bg-black opacity-80 text-xs p-1 flex items-center gap-1">
              <BiTimeFive />
              {movie.duration}
            </span>
          )}
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
          <h2 className="text-white text-sm font-bold cursor-pointer">
            <Link href={`detail/${movie.movieId?.replace("/", "")}` ?? "#"}>
              {movie.title}
            </Link>
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
          <Link
            href={`detail/${movie.movieId?.replace("/", "")}` ?? "#"}
            className="btn btn-neutral btn-sm"
          >
            Tonton
          </Link>
        </div>
      </div>
    </div>
  ));
}
