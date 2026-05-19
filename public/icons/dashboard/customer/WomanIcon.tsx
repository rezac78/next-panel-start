import { type SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {}

const WomanIcon = (props: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#C58649"
        d="M12 2.75A6.245 6.245 0 0 1 18.25 9a6.245 6.245 0 0 1-5.58 6.214l-.67.071-.67-.071A6.245 6.245 0 0 1 5.75 9 6.245 6.245 0 0 1 12 2.75"
      />
    </svg>
  );
};
export  default WomanIcon;
