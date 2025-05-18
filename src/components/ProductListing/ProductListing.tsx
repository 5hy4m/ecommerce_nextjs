import React from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import styles from './ProductListing.module.css';
import Link from 'next/link';
import BreadCrumbs from './BreadCrumbs';

interface Props {
    products: any;
}

function ProductListing({ products }: Props) {
    return (
        <Container className={styles.container}>
            <BreadCrumbs />

            <Col className={styles.cards_layout}>
                {products.map((product: any, i: number) => (
                    <Link
                        href={`/product/${product.url}`}
                        key={`Products_${i}`}
                    >
                        <div className={styles.card_container}>
                            <Card className={styles.card}>
                                <div className={styles.img_container}>
                                    <img
                                        loading='lazy'
                                        className={
                                            styles.card_img + ' card-img'
                                        }
                                        src={product.imageUrls[0]}
                                        alt={product.name}
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
    );
}

export default ProductListing;
