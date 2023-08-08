"use client";

import DownloadLinks from "@/components/DownloadLinks";
import Loading from "@/components/Loading";
import { ISeriesDetail } from "@/interface/TV";
import SiteConfig from "@/lib/SiteConfig";
import useLayoutStore from "@/store/LayoutStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Series({
  params,
}: {
  params: {
    tvId: string[];
  };
}) {
  const tvId = params.tvId;

  const [tv, setTV] = useState<ISeriesDetail>();
  const { loading, setLoading } = useLayoutStore((state) => state);

  const [linkStreamActive, setLinkStreamActive] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const getMovie = async () => {
      const res = await fetch(`${SiteConfig.apiURL}/tv/${tvId[0]}/${tvId[1]}`);
      const { data } = await res.json();

      setTV(data);
      setLinkStreamActive(data?.streaming_links[1] ?? "#");
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
              {tv?.streaming_links?.map((link, index) => (
                <button
                  className="btn btn-xs md:btn-sm"
                  key={index}
                  onClick={() => changeStreamLink(link)}
                >
                  Server {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <h1 className="text-2xl font-bold">Nonton {tv?.title}</h1>

        <div className="divider"></div>

        <div className="card w-full bg-neutral text-neutral-content">
          <div className="card-body space-y-2">
            <div className="card-actions">
              <button className="btn btn-xs btn-success md:btn-sm">
                Pilih Episode Lain:
              </button>
              {tv?.eps_links?.map((link, index) => (
                <Link
                  href={`/series/${link.tvId?.replace("/", "")}`}
                  className={`btn btn-xs md:btn-sm`}
                  key={index}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="divider"></div>
        <DownloadLinks series={tv ?? ({} as ISeriesDetail)} />
      </div>
    </div>
  );
}
