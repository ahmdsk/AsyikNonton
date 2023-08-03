import {
    responseErrorWithMessage,
    responseSuccessWithData,
  } from "@/lib/Response";
  import * as cheerio from "cheerio";
  import SiteConfig from "@/lib/SiteConfig";
  import { NextResponse } from "next/server";
  import { IMovie } from "@/interface/Movie";
  
  const baseURL = SiteConfig.scrapUrl;
  
  export async function GET(req: Request) {
    const params = new URL(req.url);
    const query = params.searchParams.get("q") ?? "";
    const page = Number(params.searchParams.get("page")) || 1;
  
    let url = `${baseURL}/?s=${query}&search=advanced`;
  
    if(page > 1) {
      url = `${baseURL}/page/${page}/?s=${query}&search=advanced`;
    }
  
    const rawResponse = await fetch(url);
    const html = await rawResponse.text();
  
    const movies: Array<IMovie> = [];
  
    try {
      const $ = cheerio.load(html);
  
      // Get Last Page
      const paginate = $(".pagination");
      let lastPage = 0;
      paginate.each((i: number, e: any) => {
          $(e).find("a.next.page-numbers").remove();
  
          lastPage = Number($(e).find("a.page-numbers").last().text());
      });
  
  
      // Get all movies
      const movieEl = $("article.item-infinite");
  
      movieEl.each((i: number, e: any) => {
        movies.push({
          title: $(e).find("h2.entry-title a").text(),
          movieId: $(e)
            .find("h2.entry-title a")
            .attr("href")
            ?.replace(baseURL, ""),
          thumbnail_url: $(e).find("img.attachment-medium").attr("src"),
          duration: $(e).find(".gmr-duration-item").text().trim(),
          rating: $(e).find(".gmr-rating-item").text().trim(),
          quality: $(e).find(".gmr-quality-item > a").text() || "TV Show",
          eps_now: $(e).find(".gmr-numbeps").text(),
        });
      });
  
      const data = {
        page,
        lastPage,
        movies,
      };
  
      return NextResponse.json(responseSuccessWithData(data));
    } catch (error) {
      console.log("All Movies Error: ", error);
  
      return NextResponse.json(responseErrorWithMessage());
    }
  }
  