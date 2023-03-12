import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styles from './Home.module.css';
import { getCategories } from '../services/notion';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

type HomeProps = {
    categories: string[];
};

export default function Home({ categories }: HomeProps) {
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
                <Container></Container>
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
