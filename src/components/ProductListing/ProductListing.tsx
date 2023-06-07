import React from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import styles from './ProductListing.module.css';
import Link from 'next/link';
import { IKImage } from 'imagekitio-react';

interface Props {
    listing: string;
    products: any;
}

function ProductListing({ listing, products }: Props) {
    return (
        <Container>
            <h1 className={styles.h1}>{listing}</h1>
            <Col className={styles.cards_layout}>
                {products.map((product: any, i: number) => (
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
    );
}

export default ProductListing;
