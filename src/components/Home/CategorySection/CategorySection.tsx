import styles from './CategorySection.module.css';
import Image from 'next/image';

export default function CategorySection() {
    return (
        <section className={styles.category_section}>
            <div className={styles.videogames}>
                <div className={styles.font}>Video games</div>
                <a className={styles.anchor}>View all categories</a>
                <div className={styles.image_container}>
                    <Image
                        fill
                        alt=''
                        priority
                        src='https://ik.imagekit.io/Hello/Video_Games_Image_fKv1-SGTPi?updatedAt=1679719049704'
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
                <a className={styles.anchor}>View all categories</a>
                <div className={styles.toy_image_container}>
                    <Image
                        priority
                        alt=''
                        fill
                        src='https://ik.imagekit.io/Hello/fullscreen_barbie_Background_Removed.png?updatedAt=1679731652908'
                    />
                </div>
            </div>
        </section>
    );
}
