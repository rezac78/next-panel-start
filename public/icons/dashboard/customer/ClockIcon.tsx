import { type SVGProps } from 'react';

interface IProps extends SVGProps<SVGSVGElement> {}

const ClockIcon = (props: IProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='none'
            viewBox='0 0 20 20'
            stroke='currentColor'
            {...props}>
            <g strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'>
                <path d='M18.334 10c0 4.6-3.734 8.333-8.334 8.333A8.336 8.336 0 0 1 1.667 10C1.667 5.4 5.4 1.667 10 1.667S18.334 5.4 18.334 10' />
                <path d='m13.091 12.65-2.583-1.542c-.45-.266-.817-.908-.817-1.433V6.258' />
            </g>
        </svg>
    );
};
export default ClockIcon;
