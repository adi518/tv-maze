import { IShowResult } from "../../types.ts";
import { ShowsList } from "../ShowsList/ShowsList.tsx";

export function Favorites({
  data,
  onRemove,
}: {
  data: IShowResult[];
  onRemove: (show: IShowResult) => void;
}) {
  return <ShowsList data={data} onFavorite={onRemove} isFavorite />;
}
