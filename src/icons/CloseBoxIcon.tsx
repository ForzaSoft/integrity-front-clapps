import { IconProps } from './type';

const CloseBoxIcon = ({ color = '#e10000', size = 18 }: IconProps) => (
  <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="22" height="22" rx="4" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="0.5" />
    <path d="M16 8L8 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 8l8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CloseBoxIcon;
