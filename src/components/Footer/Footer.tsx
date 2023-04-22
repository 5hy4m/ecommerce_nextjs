import styles from './Footer.module.css';

const contactNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER;

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className={styles.footer}>
            <div>
                Contact us on{' '}
                <a href={`tel:${contactNumber}`}>{contactNumber}</a> to sell
                goods.
                <br />© {currentYear} UniqGoods
            </div>
        </div>
    );
};
