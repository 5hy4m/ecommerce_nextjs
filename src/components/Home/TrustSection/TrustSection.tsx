import CountUp from 'react-countup';
import ScrollAnimation from 'react-animate-on-scroll';
import styles from './TrustSection.module.css';

export default function TrustSection() {
    return (
        <section className={styles.trust}>
            <h1>
                Since{' '}
                <CountUp separator='' duration={5.75} start={1975} end={2015} />
            </h1>
            <div className={styles.trust_box_container}>
                <ScrollAnimation
                    className={styles.customers}
                    animateIn='fadeInUp'
                    animateOnce={true}
                ></ScrollAnimation>

                <ScrollAnimation
                    className={styles.products}
                    animateOnce={true}
                    animateIn='fadeInUp'
                ></ScrollAnimation>

                <ScrollAnimation
                    className={styles.service}
                    animateOnce={true}
                    animateIn='fadeInUp'
                ></ScrollAnimation>
            </div>
        </section>
    );
}
