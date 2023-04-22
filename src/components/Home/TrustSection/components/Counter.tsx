import { RefObject } from 'react';
import styles from '../TrustSection.module.css';

export const Counter = ({ countRef }: { countRef: RefObject<HTMLElement> }) => (
    <div className={styles.count}>
        <span ref={countRef}></span>
        <sup>+</sup>
    </div>
);
