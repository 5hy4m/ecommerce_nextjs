import CountUp, { useCountUp } from 'react-countup';
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
import { useRef } from 'react';

const commonCounterProps = {
    useEasing: true,
    duration: 2.75,
    onStart: ({ pauseResume }: { pauseResume: Function }) => {
        //Pause Here
        pauseResume();
    },
};

export default function TrustSection() {
    const sinceCounterRef = useRef(null);
    const { pauseResume: pauseResumeSinceCounter } = useCountUp({
        ...commonCounterProps,
        ref: sinceCounterRef,
        separator: '',
        start: 1975,
        end: 2015,
    });

    const productCounterRef = useRef(null);
    const { pauseResume: pauseResumeProductCounter } = useCountUp({
        ...commonCounterProps,
        ref: productCounterRef,
        separator: ',',
        start: 0,
        end: 20000,
    });

    const customerCounterRef = useRef(null);
    const { pauseResume: pauseResumeCustomerCounter } = useCountUp({
        ...commonCounterProps,
        ref: customerCounterRef,
        separator: ',',
        start: 0,
        end: 10000,
    });

    return (
        <section className={styles.trust}>
            <Container className={styles.trust_box_container}>
                <h1 onLoad={pauseResumeSinceCounter}>
                    Since
                    <ScrollAnimation
                        afterAnimatedIn={(_) => {
                            // Resume Here
                            pauseResumeSinceCounter();
                            return {};
                        }}
                        animateIn='fadeInUp'
                        animateOnce={true}
                    >
                        <span ref={sinceCounterRef} />
                    </ScrollAnimation>
                </h1>

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
                    initiallyVisible={false}
                    animateOnce={true}
                    afterAnimatedIn={(_) => {
                        pauseResumeProductCounter();
                        return {};
                    }}
                >
                    <DiagonalArrowIcon height='40px' width='40px' />

                    <div>
                        PRODUCTS <br />
                        SOLD
                    </div>

                    <ProductIcon height='120px' width='120px' />

                    <Counter countRef={productCounterRef} />
                </ScrollAnimation>

                <ScrollAnimation
                    className={styles.customers}
                    animateIn='fadeInUp'
                    delay={200}
                    animateOnce={true}
                    afterAnimatedIn={(visibility) => {
                        pauseResumeCustomerCounter();
                        return {};
                    }}
                >
                    <HeartRateIcon width='40px' height='40px' />

                    <div>
                        HAPPY <br />
                        CUSTOMERS
                    </div>

                    <CustomersIcon width='120px' height='120px' />

                    <Counter countRef={customerCounterRef} />
                </ScrollAnimation>
            </Container>
        </section>
    );
}
