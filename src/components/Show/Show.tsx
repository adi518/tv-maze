import styles from "./Show.module.css";
import { IShowResult } from "../../types.ts";
import { ReactComponent as HeartIcon } from "../../assets/heart.svg";
import { ReactComponent as HeartRedIcon } from "../../assets/heart-red.svg";
import { IconButton } from "../IconButton/IconButton.tsx";

export function Show({
  show,
  onFavorite,
  isFavorite,
  ...restProps
}: IShowResult & {
  isFavorite?: boolean;
  onFavorite?: (show: IShowResult) => void;
}) {
  const { name, image, rating, genres } = show;

  return (
    <div className={styles.show}>
      <div className={styles.imageContainer}>
        {/* the typing for `image` and `image.original` is wrong, should be nullable for both */}
        {image?.original ? (
          <img src={image.original} alt={name} />
        ) : (
          <NoImage />
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.header}>{name}</div>
        {rating.average}
        <div className="mt-auto">{genres.join(" | ")}</div>
      </div>
      <div className={styles.actions}>
        <IconButton onClick={() => onFavorite?.({ show, ...restProps })}>
          {isFavorite ? <HeartRedIcon /> : <HeartIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export function NoImage() {
  return (
    <div className={styles.noImage}>
      No
      <br />
      Image
    </div>
  );
}
