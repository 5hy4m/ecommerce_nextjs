import CountUp from 'react-countup';
import ScrollAnimation from 'react-animate-on-scroll';
import styles from './TrustSection.module.css';
import { WorldIcon } from '@/components/Icons';

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
                >
                    <WorldIcon height={'100px'} width={'100px'} />
                </ScrollAnimation>

                <ScrollAnimation
                    className={styles.products}
                    animateIn='fadeInUp'
                    delay={100}
                ></ScrollAnimation>

                <ScrollAnimation
                    className={styles.service}
                    animateIn='fadeInUp'
                    delay={200}
                ></ScrollAnimation>
            </div>
        </section>
    );
}
