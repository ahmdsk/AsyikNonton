import {
  responseErrorWithMessage,
  responseSuccessWithData,
} from "@/lib/Response";
import * as cheerio from "cheerio";
import SiteConfig from "@/lib/SiteConfig";
import { NextResponse } from "next/server";
import { IMovie, IMovieDetail } from "@/interface/Movie";
import { removeSeparator } from "@/lib/Helper";
import { ITVDetail } from "@/interface/TV";

const baseURL = SiteConfig.scrapUrl;

type DetailDataMovie = {
  [key: string]: string;
};

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      movie: string[];
    };
  }
) {
  let url = baseURL;
  const param = params.movie;

  if (param.length < 2) {
    // URL MOVIE
    url = `${baseURL}/${param[0]}`;
  } else {
    // URL TV
    url = `${baseURL}/${param[0]}/${param[1]}`;
  }

  const rawResponse = await fetch(url);
  const html = await rawResponse.text();

  const movieDetail: Array<IMovieDetail> = [];
  const tvDetail: Array<ITVDetail> = [];

  try {
    const $ = cheerio.load(html);
    const dataMovie: DetailDataMovie = {};

    $("main#main").each((i: number, el: any) => {
      $(el)
        .find(".gmr-moviedata")
        .each((i, ec) => {
          // ec = element child
          const textLine = removeSeparator($(ec).text())[0]
            .toLowerCase()
            .replace(" ", "_");
          const textValue = removeSeparator($(ec).text())[1].toLowerCase();

          dataMovie[textLine] = textValue;
        });

      if (params.movie[0] !== "tv") {
        movieDetail.push({
          title: $(el).find("h1.entry-title").text(),
          description: $(el).find("div.entry-content p").text(),
          created_at: dataMovie.diposting_pada ?? "",
          tagline: dataMovie.tagline ?? "",
          rating: dataMovie.rating ?? "",
          genre: dataMovie.genre ?? "",
          quality: dataMovie.kualitas ?? "",
          year: dataMovie.tahun ?? "",
          duration: dataMovie.durasi ?? "",
          country: dataMovie.negara ?? "",
          realease: dataMovie.rilis ?? "",
          language: dataMovie.bahasa ?? "",
          director: dataMovie.direksi ?? "",
          artist: dataMovie.pemain ?? "",
        });
      } else {
        tvDetail.push({
          title: $(el).find("h1.entry-title").text(),
          description: $(el).find("div.entry-content p").text(),
          created_at: dataMovie.diposting_pada ?? "",
          genre: dataMovie.genre ?? "",
          year: dataMovie.tahun ?? "",
          duration: dataMovie.durasi ?? "",
          country: dataMovie.negara ?? "",
          realease: dataMovie.rilis ?? "",
          number_of_eps: dataMovie.jumlah_episode ?? "",
          network: dataMovie.jaringan ?? "",
          artist: dataMovie.pemain ?? "",
        });
      }
    });

    const data = params.movie[0] !== "tv" ? movieDetail[0] : tvDetail[0];

    return NextResponse.json(responseSuccessWithData(data));
  } catch (error) {
    console.log("Detail Movies Error: ", error);

    return NextResponse.json(responseErrorWithMessage());
  }
}
