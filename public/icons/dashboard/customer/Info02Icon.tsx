import { type SVGProps } from 'react';

interface IProps extends SVGProps<SVGSVGElement> {}

export const Info02Icon = (props: IProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            {...props}>
            <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m0-5v-6' />
            <path fill='#BABABA' d='M12 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2' />
        </svg>
    );
};
export default Info02Icon;
