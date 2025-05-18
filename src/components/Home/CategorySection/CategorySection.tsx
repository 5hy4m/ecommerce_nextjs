import styles from './CategorySection.module.css';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import Link from 'next/link';

export default function CategorySection() {
    const { setShowHeader } = useGlobalContext();

    const categoryRedirection = () =>
        window?.innerWidth < 575 ? setShowHeader(true) : window.scrollTo(0, 0);

    return (
        <section className={styles.category_section}>
            <div className={styles.videogames}>
                <div className={styles.font}>Video games</div>
                <a
                    onClick={() => categoryRedirection()}
                    className={styles.anchor}
                >
                    View all categories
                </a>
                <Link
                    href={'/listing/VideoGames'}
                    className={styles.image_container}
                >
                    <img src='https://ik.imagekit.io/Hello/Video_Games_Image_fKv1-SGTPi' />
                </Link>
            </div>
            <div className={styles.toys}>
                <img src='https://ik.imagekit.io/Hello/foreground_removed.jpg' />
                <div className={styles.font}>Toys</div>
                <a
                    onClick={() => categoryRedirection()}
                    className={styles.anchor}
                >
                    View all categories
                </a>
                <Link
                    href={'/listing/Toys'}
                    className={styles.toy_image_container}
                >
                    <img src='https://ik.imagekit.io/Hello/fullscreen_barbie_Background_Removed.png' />
                </Link>
            </div>
        </section>
    );
}
