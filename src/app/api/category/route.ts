import { responseErrorWithMessage } from "@/lib/Response";
import SiteConfig from "@/lib/SiteConfig";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

const baseURL = SiteConfig.scrapUrl;

export async function GET() {
  const rawResponse = await fetch(baseURL);
  const html = await rawResponse.text();

  try {
    const $ = cheerio.load(html);

    const categories: Array<{
        name: string;
        slug: string;
    }> = [];

    $("select[name='genre'] option").each((i, el) => {
      categories.push({
        name: $(el).text(),
        slug: $(el).attr("value") || "",
      });
    });

    categories.shift();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("Category Error: ", error);

    return NextResponse.json(responseErrorWithMessage());
  }
}
