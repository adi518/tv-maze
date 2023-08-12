import { useFetch } from "usehooks-ts";
import { IShowResult } from "./types";

const baseApiUrl = "https://api.tvmaze.com";

export const tvMazeApi = {
  useSearchShows: (query: string) =>
    useFetch<IShowResult[]>(
      query ? `${baseApiUrl}/search/shows?q=${query}` : ""
    ),
};
