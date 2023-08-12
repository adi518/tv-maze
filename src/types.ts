// imported types have some typos/errors, we fix them here
import { Ishow, Iratring as IRating, IshowSearch } from "tvmaze-api-ts";

export type IShow = Omit<Ishow, "ratring"> & { rating: IRating };

export type IShowResult = IshowSearch & {
  show: IShow;
};

export type IFavorites = {
  [key: number]: IShowResult & { addedAt: number };
};
