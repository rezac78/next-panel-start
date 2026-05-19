import { type SVGProps } from 'react';

interface IProps extends SVGProps<SVGSVGElement> {}

const ExitIcon = (props: IProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='none'
            viewBox='0 0 32 32'
            stroke='currentColor'
            {...props}>
            <g strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'>
                <path d='M11.867 10.08c.413-4.8 2.88-6.76 8.28-6.76h.174c5.96 0 8.346 2.387 8.346 8.347v8.68c0 5.96-2.387 8.346-8.347 8.346h-.173c-5.36 0-7.826-1.933-8.266-6.653M2.667 16H19.84' />
                <path d='M16.867 11.533 21.334 16l-4.467 4.467' />
            </g>
        </svg>
    );
};
export default ExitIcon;
