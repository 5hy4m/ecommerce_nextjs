import Container from "react-bootstrap/Container";
import styles from "./Product.module.css";
import Image from "next/image";
import {
  getCategories,
  getProductsByCategory,
  getProduct,
} from "../../services/notion";
import { ProductType } from "../../services/notion";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";

const domain = process.env.NEXT_PUBLIC_DOMAIN;

type ProductProps = {
  product: ProductType;
  url: string;
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
      <Image id={`${i}`} src={image} alt={productName} fill></Image>
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
            <Image src={images[selectedIndex]} alt={name} fill></Image>
            <Image
              onClick={() => setOverlay(false)}
              alt="Close"
              height="30"
              width="30"
              src="/close.png"
              className={styles.close_overlay}
            />
            <Image
              onClick={handleNextImage}
              alt="Next"
              height="40"
              width="40"
              src="/next.png"
              className={styles.next_overlay}
            />
            <Image
              onClick={handlePreviousImage}
              alt="Previous"
              height="40"
              width="40"
              src="/back.png"
              className={styles.prev_overlay}
            />
          </div>
        </div>
      )}
      <div
        className={styles.primary_image_container}
        onClick={() => setOverlay(true)}
      >
        <Image src={images[selectedIndex]} alt={name} fill></Image>
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

export default function Product({ product }: ProductProps) {
  const { asPath } = useRouter();

  const handleShareButton = () => {
    const whatsAppShareMessage = `whatsapp://send?text=${product.name} Please click on the below link\n ${domain}${asPath}`;
    window.location.href = whatsAppShareMessage;
  };

  return (
    <Container className={styles.container}>
      <section className={styles.images_section}>
        <ImageSelector product={product} />
      </section>

      <section className={styles.details_section}>
        <h1 className={styles.name}>{product.name}</h1>

        <div className={styles.stock_price_container}>
          <div className={styles.price}>₹ {product.rupees}</div>

          <Button variant="outline-warning" className={styles.stock}>
            Stocks available: {product.stock}
          </Button>
        </div>

        <span className={styles.description}>{product.description}</span>

        <Button className={styles.contact_button} variant="outline-success">
          <b>Contact us on </b>
          <Image alt="whatsapp" height={25} width={25} src="/whatsapp.png" />
        </Button>
      </section>

      <div onClick={handleShareButton} className={styles.whatsapp_share}>
        Share
        <Image alt="whatsapp" height={25} width={25} src="/whatsapp.png" />
      </div>
    </Container>
  );
}

export async function getStaticProps(props: any) {
  const {
    params: { product },
  } = props;

  console.time("getProduct");
  const productObject = await getProduct(product);
  console.timeEnd("getProduct");

  return {
    props: { product: productObject },
  };
}

export async function getStaticPaths() {
  console.time("getCategoriesPaths");
  const categories: string[] = await getCategories();
  console.timeEnd("getCategoriesPaths");

  const productPromises = categories.map((category) =>
    getProductsByCategory(category)
  );

  console.time("getAllProducts");
  const settledPromises: any = await Promise.allSettled(productPromises);
  console.timeEnd("getAllProducts");

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
