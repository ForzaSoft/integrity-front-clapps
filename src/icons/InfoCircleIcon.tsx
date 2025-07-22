import { IconProps } from './type';

const InfoCircleIcon = ({ color = '#6c757d', size = 18 }: IconProps) => (
  <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="12" cy="7" r="1" fill={color} />
    <path d="M12 10v7" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default InfoCircleIcon;
