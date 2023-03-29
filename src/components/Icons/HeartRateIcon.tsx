import { IconProps } from './types';

export const HeartRateIcon = ({ height, width }: IconProps) => {
    return (
        <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
            <g id='SVGRepo_bgCarrier' stroke-width='0' />

            <g
                id='SVGRepo_tracerCarrier'
                stroke-linecap='round'
                stroke-linejoin='round'
            />

            <g id='SVGRepo_iconCarrier'>
                {' '}
                <path
                    d='M20.9982 9C21.0328 7.7106 20.558 6.41009 19.574 5.42602C17.6726 3.52466 14.5899 3.52466 12.6885 5.42602L12 6.11456L11.3115 5.42602C9.4101 3.52466 6.32738 3.52466 4.42602 5.42602C2.52466 7.32738 2.52466 10.4101 4.42602 12.3115L12 19.8854L13.8935 17.9919'
                    stroke='#000000'
                    stroke-width='0.72'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                />{' '}
                <path
                    d='M9 12.6667H11.6667L13.6667 10L15.6667 15.3333L17.6667 12.6667H21'
                    stroke='#000000'
                    stroke-width='0.72'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                />{' '}
            </g>
        </svg>
    );
};
