"use client";

import DetailMovie from "@/components/DetailMovie";
import DownloadLinks from "@/components/DownloadLinks";
import Loading from "@/components/Loading";
import { IMovieDetail } from "@/interface/Movie";
import { ITVDetail } from "@/interface/TV";
import SiteConfig from "@/lib/SiteConfig";
import useLayoutStore from "@/store/LayoutStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export const runtime = "edge";

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
  const [tv, setTV] = useState<ITVDetail>();

  const [typeMovie, setTypeMovie] = useState<"movie" | "series">("movie");

  const { loading, setLoading } = useLayoutStore((state) => state);

  const [linkStreamActive, setLinkStreamActive] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const getMovie = async () => {
      const res = await fetch(url);
      const { data } = await res.json();

      if (movieId.length == 1) {
        setTypeMovie("movie");
        setMovie(data);
        setLinkStreamActive(data?.streaming_links[1]);
      } else {
        setTypeMovie("series");
        setTV(data);
        setLinkStreamActive(data?.trailer);
      }
      setLoading(false);
    };

    getMovie();
  }, []);

  const changeStreamLink = (link: string | undefined) => {
    setLinkStreamActive(link ?? "#");
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="flex flex-col">
      <div className="md:w-[800px] space-y-3">
        <div className="card w-full bg-neutral text-neutral-content">
          <div className="card-body space-y-2">
            <iframe
              src={linkStreamActive ?? "#"}
              className="w-full h-[300px] rounded-md"
              allowFullScreen
              referrerPolicy="same-origin"
            />
            <div className="card-actions">
              {typeMovie == "movie" ? (
                movie?.streaming_links?.map((link, index) => (
                  <button
                    className="btn btn-xs md:btn-sm"
                    key={index}
                    onClick={() => changeStreamLink(link)}
                  >
                    Server {index + 1}
                  </button>
                ))
              ) : (
                <>
                  <button className="btn btn-success btn-xs md:btn-sm">Pilih Episode</button>
                  {tv?.eps_links?.map((link, index) => (
                    <Link
                      href={`/series/${link.tvId?.replace("/", "")}` ?? "#"}
                      className="btn btn-xs md:btn-sm"
                      key={index}
                    >
                      {link.title}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold">
          {typeMovie == "movie" ? movie?.title : tv?.title}
        </h1>
        <p className="text-gray-500">
          {typeMovie == "movie" ? movie?.description : tv?.description}
        </p>
        <div className="divider"></div>
        {typeMovie == "movie" ? (
          <DetailMovie movie={movie ?? ({} as IMovieDetail)} type={typeMovie} />
        ) : (
          <DetailMovie tv={tv ?? ({} as ITVDetail)} type={typeMovie} />
        )}
        <div className="divider"></div>
        {typeMovie == "movie" && (
          <DownloadLinks movie={movie ?? ({} as IMovieDetail)} />
        )}
      </div>
    </div>
  );
}
