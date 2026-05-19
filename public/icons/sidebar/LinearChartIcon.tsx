import { type SVGProps } from 'react';

interface IProps extends SVGProps<SVGSVGElement> {}

export const LinearChartIcon = (props: IProps) => {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none' viewBox='0 0 32 32' {...props}>
            <path d='M4 29.333h24M7.467 11.173H5.333c-.733 0-1.333.6-1.333 1.334V24c0 .733.6 1.333 1.333 1.333h2.134c.733 0 1.333-.6 1.333-1.333V12.507c0-.734-.6-1.334-1.333-1.334m9.599-4.253h-2.133c-.733 0-1.333.6-1.333 1.333V24c0 .733.6 1.333 1.333 1.333h2.133c.734 0 1.334-.6 1.334-1.333V8.253c0-.733-.6-1.333-1.334-1.333m9.6-4.253h-2.133c-.734 0-1.334.6-1.334 1.333v20c0 .733.6 1.333 1.334 1.333h2.133c.733 0 1.333-.6 1.333-1.333V4c0-.733-.6-1.333-1.333-1.333' />
        </svg>
    );
};
