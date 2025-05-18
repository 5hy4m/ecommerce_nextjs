import CountUp, { useCountUp } from 'react-countup';
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
import { RefObject, useRef } from 'react';

const commonCounterProps = {
    useEasing: true,
    duration: 2.75,
    onStart: ({ pauseResume }: { pauseResume: Function }) => {
        //Pause Here
        // TODO: make it to resume when it enters viewport
        // pauseResume();
    },
};

export default function TrustSection() {
    const sinceCounterRef = useRef(null);
    const { pauseResume: pauseResumeSinceCounter } = useCountUp({
        ...commonCounterProps,
        ref: sinceCounterRef as unknown as RefObject<HTMLElement>,
        separator: '',
        start: 1975,
        end: 2015,
    });

    const productCounterRef = useRef(null);
    const { pauseResume: pauseResumeProductCounter } = useCountUp({
        ...commonCounterProps,
        ref: productCounterRef as unknown as RefObject<HTMLElement>,
        separator: ',',
        start: 0,
        end: 20000,
    });

    const customerCounterRef = useRef(null);
    const { pauseResume: pauseResumeCustomerCounter } = useCountUp({
        ...commonCounterProps,
        ref: customerCounterRef as unknown as RefObject<HTMLElement>,
        separator: ',',
        start: 0,
        end: 10000,
    });

    return (
        <section className={styles.trust}>
            <Container className={styles.trust_box_container}>
                <h1 onLoad={pauseResumeSinceCounter}>
                    Since
                    <div>
                        <span ref={sinceCounterRef} />
                    </div>
                </h1>

                <div className={styles.service}>
                    <div>
                        SERVICE <br />
                        ALL OVER THE WORLD
                    </div>
                    <WorldIcon height='100px' width='110px' />
                </div>

                <div className={styles.products}>
                    <DiagonalArrowIcon height='40px' width='40px' />

                    <div>
                        PRODUCTS <br />
                        SOLD
                    </div>

                    <ProductIcon height='120px' width='120px' />

                    <Counter countRef={productCounterRef} />
                </div>

                <div className={styles.customers}>
                    <HeartRateIcon width='40px' height='40px' />

                    <div>
                        HAPPY <br />
                        CUSTOMERS
                    </div>

                    <CustomersIcon width='120px' height='120px' />

                    <Counter countRef={customerCounterRef} />
                </div>
            </Container>
        </section>
    );
}
