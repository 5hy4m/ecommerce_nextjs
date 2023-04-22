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
            <Container className={styles.trust_box_container}>
                <CountUp separator='' duration={2.75} start={1975} end={2015}>
                    {({ countUpRef, start }) => (
                        <h1>
                            Since
                            <ScrollAnimation
                                afterAnimatedIn={(visibility) => {
                                    if (visibility.inViewport) start();
                                    return {};
                                }}
                                animateIn='fadeInUp'
                                animateOnce={true}
                            >
                                <span ref={countUpRef} />
                            </ScrollAnimation>
                        </h1>
                    )}
                </CountUp>

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

                <CountUp separator=',' duration={2.75} start={0} end={10000}>
                    {({ countUpRef, start }) => (
                        <ScrollAnimation
                            className={styles.products}
                            animateIn='fadeInUp'
                            delay={100}
                            animateOnce={true}
                            afterAnimatedIn={(visibility) => {
                                if (visibility.onScreen) start();
                                return {};
                            }}
                        >
                            <DiagonalArrowIcon height='40px' width='40px' />

                            <div>
                                PRODUCTS <br />
                                SOLD
                            </div>

                            <ProductIcon height='120px' width='120px' />

                            <Counter countRef={countUpRef} />
                        </ScrollAnimation>
                    )}
                </CountUp>

                <CountUp separator=',' duration={2.75} start={0} end={10000}>
                    {({ countUpRef, start }) => (
                        <ScrollAnimation
                            className={styles.customers}
                            animateIn='fadeInUp'
                            delay={200}
                            animateOnce={true}
                            afterAnimatedIn={(visibility) => {
                                if (visibility.inViewport) start();
                                return {};
                            }}
                        >
                            <HeartRateIcon width='40px' height='40px' />

                            <div>
                                HAPPY <br />
                                CUSTOMERS
                            </div>

                            <CustomersIcon width='120px' height='120px' />

                            <Counter countRef={countUpRef} />
                        </ScrollAnimation>
                    )}
                </CountUp>
            </Container>
        </section>
    );
}
