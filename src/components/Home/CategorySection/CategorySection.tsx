import styles from './CategorySection.module.css';
import Image from 'next/image';
import { useGlobalContext } from '@/hooks/useGlobalContext';

export default function CategorySection() {
    const { setShowHeader } = useGlobalContext();

    return (
        <section className={styles.category_section}>
            <div className={styles.videogames}>
                <div className={styles.font}>Video games</div>
                <a
                    href='#header'
                    onClick={() => setShowHeader(true)}
                    className={styles.anchor}
                >
                    View all categories
                </a>
                <div className={styles.image_container}>
                    <Image
                        fill
                        alt=''
                        priority
                        src='https://ik.imagekit.io/Hello/Video_Games_Image_fKv1-SGTPi'
                    />
                </div>
            </div>
            <div className={styles.toys}>
                <Image
                    fill
                    alt=''
                    priority
                    src='https://ik.imagekit.io/Hello/foreground_removed.jpg'
                />
                <div className={styles.font}>Toys</div>
                <a
                    href='#header'
                    onClick={() => setShowHeader(true)}
                    className={styles.anchor}
                >
                    View all categories
                </a>
                <div className={styles.toy_image_container}>
                    <Image
                        fill
                        alt=''
                        priority
                        src='https://ik.imagekit.io/Hello/fullscreen_barbie_Background_Removed.png'
                    />
                </div>
            </div>
        </section>
    );
}
