import Head from 'next/head';
import styles from './Home.module.css';
import { getCategories } from '../services/notion';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { CategorySection } from '../components/Home/CategorySection';
import { TrustSection } from '../components/Home/TrustSection';

type HomeProps = {
    categories: string[];
};

export default function Index({ categories }: HomeProps) {
    return (
        <>
            <Head>
                <title>UniqGoods</title>
                <meta name='description' content='Vintage and Retro games' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <Header categories={categories} />
                <div className={styles.homepage}>
                    <section className={styles.introduction}>
                        <b>
                            We have <br />
                        </b>
                        <h1>
                            Retro{' '}
                            <span className={styles.red_gradient}>Games</span>,
                            Vintage{' '}
                            <span className={styles.yellow_gradient}>Toys</span>
                            , Antique{' '}
                            <span className={styles.purple_gradient}>
                                Items
                            </span>
                            , Collectibles{' '}
                            <span className={styles.green_gradient}>
                                etc...
                            </span>
                        </h1>
                    </section>

                    <CategorySection />

                    <TrustSection />

                    <section className={styles.customers_about_us}></section>
                </div>
                <Footer />
            </main>
        </>
    );
}

export async function getStaticProps() {
    console.time('getCategories');
    const categories = await getCategories();
    console.timeEnd('getCategories');

    return {
        props: { categories },
    };
}
