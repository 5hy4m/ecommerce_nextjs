import styles from './CategorySection.module.css';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import { IKImage } from 'imagekitio-react';

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
                    <IKImage
                        src='https://ik.imagekit.io/Hello/Video_Games_Image_fKv1-SGTPi'
                        transformation={[
                            {
                                height: '900',
                                width: '900',
                            },
                        ]}
                        lqip={{
                            active: true,
                            quality: 10,
                            blur: 50,
                        }}
                    />
                </div>
            </div>
            <div className={styles.toys}>
                <IKImage
                    src='https://ik.imagekit.io/Hello/foreground_removed.jpg'
                    lqip={{
                        active: true,
                        quality: 10,
                        blur: 50,
                    }}
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
                    <IKImage
                        src='https://ik.imagekit.io/Hello/fullscreen_barbie_Background_Removed.png'
                        transformation={[
                            {
                                height: '900',
                                width: '900',
                            },
                        ]}
                        lqip={{
                            active: true,
                            quality: 10,
                            blur: 50,
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
