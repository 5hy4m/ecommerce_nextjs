import Container from 'react-bootstrap/Container';
import styles from './Product.module.css';
import Image from 'next/image';
import {
    getCategories,
    getProductsByCategory,
    getProduct,
} from '../../services/notion';
import { ProductType } from '../../services/notion';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
    CloseIcon,
    NextIcon,
    PrevIcon,
    WhatsAppIcon,
} from '@/components/Icons';
import { CallIcon } from '@/components/Icons';
import { clsx } from 'clsx';
import { IKImage } from 'imagekitio-react';

const domain = process.env.NEXT_PUBLIC_DOMAIN;
const contactNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER;

type ProductProps = {
    product: ProductType;
    url: string;
    categories: string[];
};

type SecondaryImagesProps = {
    images: string[];
    productName: string;
    selectedIndex: number;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
};

type ImageSelector = {
    product: ProductType;
};

type PrevButtonProps = {
    handler: () => void;
};

type NextButtonProps = {
    handler: () => void;
};

type CloseButtonProps = {
    handler: (bool: boolean) => void;
};

type StockPriceContainerProps = {
    product: ProductType;
    type: string;
};

const PrevButton = ({ handler }: PrevButtonProps) => (
    <div onClick={handler} className={styles.prev_overlay}>
        <PrevIcon height='40px' width='40px' />
    </div>
);

const NextButton = ({ handler }: NextButtonProps) => (
    <div onClick={handler} className={styles.next_overlay}>
        <NextIcon height='40px' width='40px' />
    </div>
);

const CloseButton = ({ handler }: CloseButtonProps) => (
    <div onClick={() => handler(false)} className={styles.close_overlay}>
        <CloseIcon height='40px' width='40px' />
    </div>
);

const SecondaryImages = ({
    images,
    selectedIndex,
    productName,
    setSelectedIndex,
}: SecondaryImagesProps) => {
    const handleOnSelect = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        const index = parseInt(target.id);

        setSelectedIndex(index);
    };

    const jsx = [...images].map((image: string, i: number) => (
        <div
            className={
                selectedIndex === i
                    ? styles.secondary_image_container_active
                    : styles.secondary_image_container
            }
            key={`${i}_secondaryImages`}
            onClick={(e) => handleOnSelect(e)}
        >
            <IKImage
                id={`${i}`}
                src={image}
                alt={productName}
                lqip={{
                    active: true,
                    quality: 10,
                    blur: 50,
                }}
            />
        </div>
    ));

    return <div className={styles.secondary_images_container}>{jsx}</div>;
};

const ImageSelector = ({ product }: ImageSelector) => {
    const images = product.imageUrls;
    const imagesCount = images.length;
    const name = product.name;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showOverlay, setOverlay] = useState(false);

    const showArrows = images.length > 1;

    const handleNextImage = () =>
        selectedIndex + 1 >= imagesCount
            ? setSelectedIndex(0)
            : setSelectedIndex(selectedIndex + 1);

    const handlePreviousImage = () =>
        selectedIndex - 1 < 0
            ? setSelectedIndex(imagesCount - 1)
            : setSelectedIndex(selectedIndex - 1);

    return (
        <div className={styles.images_container}>
            {showOverlay && (
                <div className={styles.zoom_overlay}>
                    <div className={styles.zoomed_image_container}>
                        <IKImage
                            className={styles.card_img + ' card-img'}
                            src={images[selectedIndex]}
                            alt={product.name}
                            lqip={{
                                active: true,
                                quality: 10,
                                blur: 50,
                            }}
                        />

                        <CloseButton handler={setOverlay} />

                        {showArrows ? (
                            <>
                                <NextButton handler={handleNextImage} />

                                <PrevButton handler={handlePreviousImage} />
                            </>
                        ) : null}
                    </div>
                </div>
            )}
            <div className={styles.primary_image_container}>
                <IKImage
                    onClick={() => setOverlay(true)}
                    src={images[selectedIndex]}
                    alt={name}
                    lqip={{
                        active: true,
                        quality: 10,
                        blur: 50,
                    }}
                />

                {showArrows ? (
                    <>
                        <PrevButton handler={handlePreviousImage} />

                        <NextButton handler={handleNextImage} />
                    </>
                ) : null}
            </div>
            <SecondaryImages
                images={images}
                selectedIndex={selectedIndex}
                productName={name}
                setSelectedIndex={setSelectedIndex}
            />
        </div>
    );
};

const StockPriceContainer = ({ product, type }: StockPriceContainerProps) => {
    const { asPath } = useRouter();

    const handleContact = () => {
        const message = `whatsapp://send?phone=${contactNumber}&text=Hi, I would like to buy this product \n ${domain}${asPath}`;
        window.location.href = message;
    };

    const handleCall = () => {
        const message = `tel:${contactNumber}`;
        window.location.href = message;
    };

    return (
        <div
            className={clsx({
                [styles.non_mobile_stock_price_container]: type !== 'mobile',
                [styles.mobile_stock_price_container]: type === 'mobile',
            })}
        >
            <div className={styles.price}>₹ {product.rupees}</div>

            <div className={styles.stock}>
                Stocks available: {product.stock}
            </div>

            <div className={styles.buttons_container}>
                <Button
                    onClick={handleContact}
                    className={styles.contact_button}
                    variant='outline-success'
                >
                    <b>Make offer on </b>
                    <WhatsAppIcon height='25px' width='25px' />
                </Button>

                <Button
                    onClick={handleCall}
                    className={styles.call_button}
                    variant='outline-primary'
                >
                    <b>Call </b>
                    <CallIcon height='20px' width='15px' />
                </Button>
            </div>
        </div>
    );
};

export default function Product({ product, categories }: ProductProps) {
    const { asPath } = useRouter();

    const handleShareButton = () => {
        const whatsAppShareMessage = `whatsapp://send?text=${product.name} Please click on the below link\n ${domain}${asPath}`;
        window.location.href = whatsAppShareMessage;
    };

    return (
        <main>
            <Header categories={categories} />

            <Container className={styles.container}>
                <section className={styles.images_section}>
                    <ImageSelector product={product} />
                </section>

                <section className={styles.details_section}>
                    <Container className={styles.details_container}>
                        <div className={styles.details}>
                            <h1 className={styles.name}>{product.name}</h1>

                            <StockPriceContainer
                                type='mobile'
                                product={product}
                            />

                            <div className={styles.description}>
                                <pre>{product.description}</pre>
                            </div>
                        </div>
                        <StockPriceContainer
                            type='nonMobile'
                            product={product}
                        />
                    </Container>
                </section>

                <div
                    onClick={handleShareButton}
                    className={styles.whatsapp_share}
                >
                    Share
                    <WhatsAppIcon height='25px' width='25px' />
                </div>
            </Container>
            <Footer />
        </main>
    );
}

export async function getStaticProps(props: any) {
    const {
        params: { product },
    } = props;

    console.time('[Product] getCategories');
    const categories = await getCategories();
    console.timeEnd('[Product] getCategories');

    console.time('[Product] getProduct');
    const productObject = await getProduct(product);
    console.timeEnd('[Product] getProduct');

    return {
        props: { product: productObject, categories },
    };
}

export async function getStaticPaths() {
    console.time('[Product] getCategoriesPaths');
    const categories: string[] = await getCategories();
    console.timeEnd('[Product] getCategoriesPaths');

    const productPromises = categories.map((category) =>
        getProductsByCategory(category),
    );

    console.time('[Product] getAllProducts');
    const settledPromises: any = await Promise.allSettled(productPromises);
    console.timeEnd('[Product] getAllProducts');

    let products = [] as any;
    settledPromises.forEach((promise: any) => {
        promise.value.forEach((product: any) => {
            products = [...products, { params: { product: product.url } }];
        });
    });

    return {
        paths: products,
        fallback: false,
    };
}
