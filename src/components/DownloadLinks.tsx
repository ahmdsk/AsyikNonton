import { IMovieDetail } from "@/interface/Movie";
import { ISeriesDetail } from "@/interface/TV";
import Link from "next/link";

interface IProps {
  movie?: IMovieDetail;
  series?: ISeriesDetail;
}

export default function DownloadLinks({ movie, series }: IProps) {
  return (
    movie != null ? (
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
    ) : (
      <div className="card w-full bg-neutral text-neutral-content">
        <div className="card-body space-y-2">
          <h2 className="card-title">Download {series?.title}</h2>
          <div className="card-actions">
            {series?.download_links?.map((link, index) => (
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
    )
  );
}
