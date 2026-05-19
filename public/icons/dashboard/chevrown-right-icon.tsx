import { type SVGProps } from 'react';

interface IProps extends SVGProps<SVGSVGElement> {}

const ChevrownRightIcon = (props: IProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='11'
            height='23'
            fill='none'
            viewBox='0 0 11 23'
            stroke='currentColor'
            {...props}>
            <path d='m.75 21.87 8.693-8.693a2.65 2.65 0 0 0 0-3.734L.75.75' />
        </svg>
    );
};
export default ChevrownRightIcon;
