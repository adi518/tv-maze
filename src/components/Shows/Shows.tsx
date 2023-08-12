import { useMemo } from "react";
import styles from "./Shows.module.css";
import { Favorites } from "../Favorites/Favorites.tsx";
import { ShowsList } from "../ShowsList/ShowsList.tsx";
import type { IShowResult, IFavorites } from "../../types.ts";
import { useLocalStorage } from "usehooks-ts";

export function Shows({ data }: { data: IShowResult[] }) {
  const [favoritesStorage, setFavoritesStorage] = useLocalStorage<IFavorites>(
    "favorites",
    {}
  );

  const favorites = useMemo(
    () => Object.values(favoritesStorage).sort((a, b) => a.addedAt - b.addedAt),
    [favoritesStorage]
  );

  function handleFavorite(item: IShowResult) {
    setFavoritesStorage((currItems) => {
      const newState = { ...currItems };

      const { id } = item.show;

      if (currItems[id]) {
        delete newState[id];
      } else {
        newState[id] = { ...item, addedAt: Date.now() };
      }

      return newState;
    });
  }

  return (
    <div className={styles.shows}>
      <div className={styles.card}>
        <h2>Search Results</h2>
        {data.length > 0 ? (
          <ShowsList data={data} onFavorite={handleFavorite} />
        ) : (
          "No Results"
        )}
      </div>
      <div className={styles.card}>
        <h2>{favorites.length ? "My Favorites" : "No Favorites Yet 😔"}</h2>
        <Favorites data={favorites} onRemove={handleFavorite} />
      </div>
    </div>
  );
}
