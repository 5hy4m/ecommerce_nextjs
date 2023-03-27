import CountUp from 'react-countup';
import ScrollAnimation from 'react-animate-on-scroll';
import styles from './TrustSection.module.css';
import {
    CustomersIcon,
    DiagonalArrowIcon,
    ProductIcon,
    WorldIcon,
} from '@/components/Icons';

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
                    className={styles.customers}
                    animateIn='fadeInUp'
                    animateOnce={true}
                >
                    <div>
                        SERVICE
                        <br />
                        ALL OVER THE WORLD
                    </div>
                    <WorldIcon height={'50px'} width={'50px'} />
                </ScrollAnimation>

                <ScrollAnimation
                    className={styles.products}
                    animateIn='fadeInUp'
                    delay={100}
                    animateOnce={true}
                >
                    <DiagonalArrowIcon height='40px' width={'40px'} />

                    <div>
                        PRODUCTS <br />
                        SOLD
                    </div>

                    <ProductIcon height='120px' width={'120px'} />

                    <div className={styles.sold_count}>
                        <CountUp
                            separator=','
                            duration={5.75}
                            start={0}
                            end={10000}
                        />
                        <sup>+</sup>
                    </div>
                </ScrollAnimation>

                <ScrollAnimation
                    className={styles.service}
                    animateIn='fadeInUp'
                    delay={200}
                    animateOnce={true}
                >
                    <div>
                        HAPPY <br />
                        CUSTOMERS
                    </div>

                    <CustomersIcon width='120px' height='120px' />

                    <div className={styles.customers_count}>
                        <CountUp
                            separator=','
                            duration={5.75}
                            start={0}
                            end={10000}
                        />
                        <sup>+</sup>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
