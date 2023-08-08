import { IMovieDetail } from "@/interface/Movie";
import { ITVDetail } from "@/interface/TV";

interface IProps {
  movie?: IMovieDetail;
  tv?: ITVDetail;
  type: "movie" | "series";
}

export default function DetailMovie({ movie, tv, type }: IProps) {
  return (
    <div className="">
      {type == "movie" ? (
        <ul className="list-none">
          <li>
            <span className="font-bold text-neutral">Diposting Pada : </span>{" "}
            {movie?.created_at != "" ? movie?.created_at : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Tagline : </span>{" "}
            {movie?.tagline != "" ? movie?.tagline : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Rating : </span>{" "}
            {movie?.rating != "" ? movie?.rating : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Genre : </span>{" "}
            {movie?.genre != "" ? movie?.genre : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Kualitas : </span>{" "}
            {movie?.quality != "" ? movie?.quality : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Tahun : </span>{" "}
            {movie?.year != "" ? movie?.year : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Durasi : </span>{" "}
            {movie?.duration != "" ? movie?.duration : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Rilis : </span>{" "}
            {movie?.realease != "" ? movie?.realease : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Negara : </span>{" "}
            {movie?.country != "" ? movie?.country : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Bahasa : </span>{" "}
            {movie?.language != "" ? movie?.language : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Direksi : </span>{" "}
            {movie?.director != "" ? movie?.director : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Pemain : </span>{" "}
            {movie?.artist != "" ? movie?.artist : "-"}
          </li>
        </ul>
      ) : (
        <ul className="list-none">
          <li>
            <span className="font-bold text-neutral">Diposting Pada : </span>{" "}
            {tv?.created_at != "" ? tv?.created_at : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Genre : </span>{" "}
            {tv?.genre != "" ? tv?.genre : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Tahun : </span>{" "}
            {tv?.year != "" ? tv?.year : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Durasi : </span>{" "}
            {tv?.duration != "" ? tv?.duration : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Rilis : </span>{" "}
            {tv?.realease != "" ? tv?.realease : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Negara : </span>{" "}
            {tv?.country != "" ? tv?.country : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Jumlah Episode : </span>{" "}
            {tv?.number_of_eps != "" ? tv?.number_of_eps : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Jaringan : </span>{" "}
            {tv?.network != "" ? tv?.network : "-"}
          </li>
          <li>
            <span className="font-bold text-neutral">Pemain : </span>{" "}
            {tv?.artist != "" ? tv?.artist : "-"}
          </li>
        </ul>
      )}
    </div>
  );
}
