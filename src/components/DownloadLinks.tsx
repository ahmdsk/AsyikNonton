"use client";
import { useState } from "react";
import { IMovieDetail } from "@/interface/Movie";
import { ISeriesDetail } from "@/interface/TV";
import { HiDownload } from "react-icons/hi";
import Link from "next/link";

interface IProps {
  movie?: IMovieDetail;
  series?: ISeriesDetail;
}

export default function DownloadLinks({ movie, series }: IProps) {
  const [showDownloadButtons, setShowDownloadButtons] = useState(false);

  const toggleDownloadButtons = () => {
    setShowDownloadButtons(!showDownloadButtons);
  };

  return (
    <div className="card w-full bg-neutral text-neutral-content">
      <div className="card-body space-y-2">
        <h2 className="card-title">Download {movie?.title ?? series?.title}</h2>
        {showDownloadButtons ? (
          <>
            {movie?.download_links?.length === 0 && series?.download_links?.length === 0 ? (
              <h1 className="font-semibold text-center text-neutral-content">
                Link Download Belum Tersedia...
              </h1>
            ) : (
              <>
                <div className="flex flex-wrap justify-start md:justify-center">
                  {movie?.download_links?.map((link, index) => (
                    <Link
                      key={index}
                      href={link.link ?? "#"}
                      target="_blank"
                      className="btn btn-xs md:btn-sm mx-1 my-1"
                    >
                      <HiDownload className="mr-1" /> {link.text}
                    </Link>
                  ))}
                  {series?.download_links?.map((link, index) => (
                    <Link
                      key={index}
                      href={link.link ?? "#"}
                      target="_blank"
                      className="btn btn-xs md:btn-sm mx-1 my-1"
                    >
                      <HiDownload className="mr-1" /> {link.text}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap justify-end">
                  <button
                    onClick={toggleDownloadButtons}
                    className="btn btn-primary btn-xs md:btn-sm mx-1 my-1"
                  >
                    Tutup
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-wrap justify-end">
            <button
              onClick={toggleDownloadButtons}
              className="btn btn-primary btn-xs md:btn-sm mx-1 my-1"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
