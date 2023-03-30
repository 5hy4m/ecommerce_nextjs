import CountUp from 'react-countup';
import styles from '../TrustSection.module.css';

export const Counter = ({ count }: { count: number }) => (
    <div className={styles.count}>
        <CountUp separator=',' duration={5.75} start={0} end={count} />
        <sup>+</sup>
    </div>
);
