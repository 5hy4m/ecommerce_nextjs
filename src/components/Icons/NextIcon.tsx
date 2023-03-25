import { IconProps } from './types';

export const NextIcon = ({ height, width }: IconProps) => {
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
                fill-rule='evenodd'
                points='11,38.32 28.609,21 11,3.68 13.72,1 34,21.01 13.72,41 '
            />
        </svg>
    );
};
