import {
  responseErrorWithMessage,
  responseSuccessWithData,
} from "@/lib/Response";
import * as cheerio from "cheerio";
import SiteConfig from "@/lib/SiteConfig";
import { NextResponse } from "next/server";
import { IDownloadLinks } from "@/interface/Links";
import { getStreamingLinks } from "../../movies/detail/[...movie]/route";

const baseURL = SiteConfig.scrapUrl;

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      eps: string[];
    };
  }
) {
  const param = params.eps;

  const tvId = `${param[0]}/${param[1]}`;

  let url = `${baseURL}/eps/${tvId}`;

  const rawResponse = await fetch(url);
  const html = await rawResponse.text();

  try {
    const $ = cheerio.load(html);

    // Get download links
    const download = $("#download");
    const download_links: IDownloadLinks[] = [];
    download.each((i, el) => {
      $(el)
        .find("a.button.button-shadow")
        .each((i, el) => {
          download_links.push({
            link: $(el).attr("href"),
            text: $(el).text(),
          });
        });
    });

    // Get streaming links
    const stream_links: string[] = [];
    const num_of_stream_links = $("ul.muvipro-player-tabs li:last-child a")
      .text()
      .split(" ")
      .at(-1);
    if (num_of_stream_links) {
      for (let i = 1; i <= parseInt(num_of_stream_links); i++) {
        stream_links.push(`${url}/?player=${i}`);
      }
    }

    const streaming_links = await getStreamingLinks(stream_links);

    // Get Other Eps
    const eps_links: any[] = [];

    $(".gmr-listseries a").each((i, el) => {
      if (i !== 0) {
        let link = $(el).attr("href");
        eps_links.push({
          title: $(el).text(),
          tvId: link?.replace(baseURL, "")
        });
      }
    });

    const data = {
      title: $("h1.entry-title").text(),
      streaming_links,
      eps_links,
      download_links,
    };

    return NextResponse.json(responseSuccessWithData(data));
  } catch (error) {
    console.log("Detail Movies Error: ", error);

    return NextResponse.json(responseErrorWithMessage());
  }
}