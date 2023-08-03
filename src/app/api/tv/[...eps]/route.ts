import {
  responseErrorWithMessage,
  responseSuccessWithData,
} from "@/lib/Response";
import * as cheerio from "cheerio";
import SiteConfig from "@/lib/SiteConfig";
import { NextResponse } from "next/server";
import { IDownloadLinks } from "@/interface/Links";

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

    const data = {
      download_links,
      streaming_links,
    };

    return NextResponse.json(responseSuccessWithData(data));
  } catch (error) {
    console.log("Detail Movies Error: ", error);

    return NextResponse.json(responseErrorWithMessage());
  }
}

async function getStreamingLinks(stream_links: string[]) {
  const streaming_links = [];

  for (let i = 0; i < stream_links.length; i++) {
    const rawResponse = await fetch(stream_links[i]);
    const html = await rawResponse.text();

    const $ = cheerio.load(html);
    const stream_link = $(".gmr-embed-responsive iframe").attr("src");

    streaming_links.push(stream_link);
  }

  return streaming_links;
}
