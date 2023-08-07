"use client";

import Loading from "@/components/Loading";
import { IMovieDetail } from "@/interface/Movie";
import SiteConfig from "@/lib/SiteConfig";
import useLayoutStore from "@/store/LayoutStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Detail({
  params,
}: {
  params: {
    movieId: string[];
  };
}) {
  const movieId = params.movieId;
  let url = `${SiteConfig.apiURL}/movies/detail/${movieId[0]}`;

  if (movieId.length > 1) {
    url = `${SiteConfig.apiURL}/movies/detail/${movieId[0]}/${movieId[1]}`;
  }

  const [movie, setMovie] = useState<IMovieDetail>();
  const { loading, setLoading } = useLayoutStore((state) => state);

  const [linkStreamActive, setLinkStreamActive] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const getMovie = async () => {
      const res = await fetch(url);
      const { data } = await res.json();

      setMovie(data);
      setLinkStreamActive(data?.streaming_links[0]);
      setLoading(false);
    };

    getMovie();
  }, []);

  const changeStreamLink = (link: string | undefined) => {
    setLinkStreamActive(link ?? "#");
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="flex flex-col">
      <div className="md:w-[800px] space-y-3">
        <div className="card w-full bg-neutral text-neutral-content">
          <div className="card-body space-y-2">
            <iframe src={linkStreamActive ?? "#"} className="w-full h-[300px] rounded-md" allowFullScreen />
            <div className="card-actions">
              {movie?.streaming_links?.map((link, index) => (
                <button className="btn btn-xs md:btn-sm" key={index} onClick={() => changeStreamLink(link)}>
                  Server {index+1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold">{movie?.title}</h1>
        <p className="text-gray-500">{movie?.description}</p>
        <div className="divider"></div>
        <div className="">
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
        </div>
        <div className="divider"></div>
        <div className="card w-full bg-neutral text-neutral-content">
          <div className="card-body space-y-2">
            <h2 className="card-title">Download {movie?.title}</h2>
            <div className="card-actions">
              {movie?.download_links?.map((link, index) => (
                <Link
                  href={link.link ?? "#"}
                  target="_blank"
                  className="btn btn-xs md:btn-sm"
                  key={index}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
