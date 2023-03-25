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
                <div>Toys</div>
                <div className={styles.image_container}>
                    <Image
                        alt=''
                        src='https://ik.imagekit.io/Hello/elena-mishlanova-735yzlLr0ls-unsplash_Background_Removed.png?updatedAt=1679723152327'
                        placeholder='blur'
                        blurDataURL='https://ik.imagekit.io/Hello/elena-mishlanova-735yzlLr0ls-unsplash_Background_Removed.png?bl-10'
                        fill
                    />
                </div>
            </div>
        </section>
    );
}
