import CountUp from 'react-countup';
import ScrollAnimation from 'react-animate-on-scroll';
import styles from './TrustSection.module.css';
import {
    CustomersIcon,
    DiagonalArrowIcon,
    HeartRateIcon,
    ProductIcon,
    WorldIcon,
} from '@/components/Icons';
import Container from 'react-bootstrap/Container';
import { Counter } from './components/Counter';

export default function TrustSection() {
    return (
        <section className={styles.trust}>
            <h1>
                Since
                <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>
                    <CountUp
                        separator=''
                        duration={5.75}
                        start={1975}
                        end={2015}
                    />
                </ScrollAnimation>
            </h1>

            <div className={styles.trust_box_container}>
                <ScrollAnimation
                    className={styles.service}
                    animateIn='fadeInUp'
                    animateOnce={true}
                >
                    <div>
                        SERVICE <br />
                        ALL OVER THE WORLD
                    </div>
                    <WorldIcon height='100px' width='110px' />
                </ScrollAnimation>

                <ScrollAnimation
                    className={styles.products}
                    animateIn='fadeInUp'
                    delay={100}
                    animateOnce={true}
                >
                    <DiagonalArrowIcon height='40px' width='40px' />

                    <div>
                        PRODUCTS <br />
                        SOLD
                    </div>

                    <ProductIcon height='120px' width='120px' />

                    <Counter count={10000} />
                </ScrollAnimation>

                <ScrollAnimation
                    className={styles.customers}
                    animateIn='fadeInUp'
                    delay={200}
                    animateOnce={true}
                >
                    <HeartRateIcon width='40px' height='40px' />

                    <div>
                        HAPPY <br />
                        CUSTOMERS
                    </div>

                    <CustomersIcon width='120px' height='120px' />

                    <Counter count={5000} />
                </ScrollAnimation>
            </div>
        </section>
    );
}
