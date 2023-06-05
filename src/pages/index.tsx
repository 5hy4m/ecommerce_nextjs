import Head from 'next/head';
import styles from './Home.module.css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { CategorySection } from '../components/Home/CategorySection';
import { TrustSection } from '../components/Home/TrustSection';
import { getAllCategories } from '@/services/notion/parser';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import { useEffect } from 'react';

export type Categories = { [category: string]: string[] };
export type Filters = { [filter: string]: string[] };

type HomeProps = {
    categories: Categories;
    filters: Filters;
};

export default function Index({ categories, filters }: HomeProps) {
    const { setCategories, setFilters } = useGlobalContext();

    useEffect(() => {
        setCategories(categories);
        setFilters(filters);
    }, []);

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
                <Header />
                <div className={styles.homepage}>
                    <section className={styles.introduction}>
                        <b>
                            We sell
                            <br />
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
    console.time('[Category] getAllCategories');
    const { categories, filters } = await getAllCategories();
    console.timeEnd('[Category] getAllCategories');

    return {
        props: { categories, filters },
    };
}
