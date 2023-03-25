import styles from './CategorySection.module.css';
import Image from 'next/image';

export default function CategorySection() {
    return (
        <section className={styles.category_section}>
            <div className={styles.videogames}>
                <div>Video Games</div>
                <div className={styles.image_container}>
                    <Image
                        alt=''
                        src='https://ik.imagekit.io/Hello/Video_Games_Image_fKv1-SGTPi?updatedAt=1679719049704'
                        placeholder='blur'
                        blurDataURL='https://ik.imagekit.io/Hello/Video_Games_Image_fKv1-SGTPi?bl-10'
                        fill
                    />
                </div>
            </div>
            <div className={styles.toys}>
                <Image
                    alt=''
                    src='https://ik.imagekit.io/Hello/foreground_removed.jpg'
                    placeholder='blur'
                    blurDataURL='https://ik.imagekit.io/Hello/abstract-blur-green-nature.jpg?bl-10'
                    fill
                />

                <div>Toys</div>
                <div className={styles.toy_image_container}>
                    <Image
                        alt=''
                        src='https://ik.imagekit.io/Hello/fullscreen_barbie_Background_Removed.png?updatedAt=1679731652908'
                        placeholder='blur'
                        blurDataURL='https://ik.imagekit.io/Hello/fullscreen_barbie_Background_Removed.png?bl-10'
                        fill
                    />
                </div>
            </div>
        </section>
    );
}
