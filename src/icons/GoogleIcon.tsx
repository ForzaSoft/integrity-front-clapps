import { IconProps } from './type';

const GoogleIcon = ({ color = '#898989', size = 18 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 80" height={size}>
    <g transform="translate(0 5)">
      <path
        fill={color}
        d="M17.5,35c0-12.41,10.09-22.5,22.5-22.5,5.01,0,9.75,1.61,13.72,4.66l-5.23,6.79c-2.45-1.89-5.38-2.88-8.49-2.88-7.68,0-13.93,6.25-13.93,13.93s6.25,13.93,13.93,13.93c6.19,0,11.44-4.05,13.25-9.64h-13.25v-8.57h22.5v4.29c0,12.41-10.09,22.5-22.5,22.5s-22.5-10.09-22.5-22.5Z"
      />
    </g>
  </svg>
);

export default GoogleIcon;
