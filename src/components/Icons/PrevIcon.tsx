import { IconProps } from './types';

export const PrevIcon = ({ height, width }: IconProps) => {
    return (
        <svg
            fill='#000000'
            version='1.1'
            baseProfile='tiny'
            id='Layer_1'
            width={width}
            height={height}
            viewBox='0 0 42 42'
        >
            <polygon
                fillRule='evenodd'
                points='31,38.32 13.391,21 31,3.68 28.279,1 8,21.01 28.279,41 '
            />
        </svg>
    );
};
