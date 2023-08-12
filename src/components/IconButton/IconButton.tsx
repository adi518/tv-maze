import styles from "./IconButton.module.css";

// we usually don't implement trivial components, but for the sake of the task,
// we avoid importing `@mui/material/IconButton`, which I also found out (later)
// doesn't play nice with SWC (https://swc.rs/).

// https://stackoverflow.com/a/62568833/4106263

export function IconButton({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.iconButton} {...props}>
      {children}
    </button>
  );
}
