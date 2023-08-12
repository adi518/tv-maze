import styles from "./ShowsList.module.css";
import { IShowResult } from "../../types.ts";
import { Show } from "../Show/Show.tsx";

export function ShowsList({
  data,
  isFavorite,
  onFavorite,
}: {
  data: IShowResult[];
  isFavorite?: boolean;
  onFavorite?: (show: IShowResult) => void;
}) {
  return (
    <div className={styles.showsList}>
      {data?.map((item) => (
        <Show
          key={item.show.id}
          {...item}
          isFavorite={isFavorite}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
}
