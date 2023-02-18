import Link from "next/link";
import styles from "@/styles/Home.module.css";

export const Category = () => {
  return;
  <Link
    href="products/gameboy"
    className={styles.card}
    rel="noopener noreferrer"
  >
    <h2 className={inter.className}>
      GameBoy <span>-&gt;</span>
    </h2>
    <p className={inter.className}>
      Find in-depth information about Next.js features and&nbsp;API.
    </p>
  </Link>;
};
