import { getAllCategories, getProductsByCategory } from '@/services/notion';
import { ProductType } from '@/services/notion';
import Link from 'next/link';
import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './Category.module.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { IKImage } from 'imagekitio-react';
import { Categories, Filters } from '..';

type CategoryProps = {
    category: string;
    products: ProductType[];
    categories: Categories;
    filters: Filters;
};

export default function Category({
    category,
    products,
    categories,
    filters,
}: CategoryProps) {
    return (
        <main>
            <Header categories={categories} filters={filters} />
            <Container>
                <h1 className={styles.h1}>{category}</h1>
                <Col className={styles.cards_layout}>
                    {products.map((product: any, i) => (
                        <Link
                            href={`/product/${product.url}`}
                            key={`Products_${i}`}
                        >
                            <div className={styles.card_container}>
                                <Card className={styles.card}>
                                    <div className={styles.img_container}>
                                        <IKImage
                                            loading='lazy'
                                            className={
                                                styles.card_img + ' card-img'
                                            }
                                            transformation={[
                                                {
                                                    quality: '10',
                                                },
                                            ]}
                                            src={product.imageUrls[0]}
                                            alt={product.name}
                                            lqip={{
                                                active: true,
                                                quality: 10,
                                                blur: 50,
                                            }}
                                        />
                                    </div>
                                    <Card.Body className={styles.card_body}>
                                        <h2>
                                            ₹{' '}
                                            {new Intl.NumberFormat('en-IN', {
                                                maximumSignificantDigits: 3,
                                            }).format(product.rupees)}
                                        </h2>
                                        <span>{product.name}</span>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Link>
                    ))}
                </Col>
            </Container>
            <Footer />
        </main>
    );
}

export async function getStaticProps(props: { params: CategoryProps }) {
    const {
        params: { category },
    } = props;

    console.time('[Category] getCategories');
    const { categories, filters } = await getAllCategories();
    console.timeEnd('[Category] getCategories');

    console.time('getProductsByCategory');
    const products = await getProductsByCategory(category);
    console.timeEnd('getProductsByCategory');

    return {
        props: { category, products, categories, filters },
    };
}

export async function getStaticPaths() {
    console.time('[Category] getCategories');
    const { categories, filters } = await getAllCategories();
    console.timeEnd('[Category] getCategories');

    const paths = Object.keys(categories).map((name: string) => ({
        params: {
            category: name,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}
