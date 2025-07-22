import { IconProps } from './type';

const XMarkIcon = ({ color = '#898989', size = 18 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 80" height={size}>
    <path stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" d="M20.5,20.5l39,39M20.5,60.5l39-39" />
  </svg>
);

export default XMarkIcon;
