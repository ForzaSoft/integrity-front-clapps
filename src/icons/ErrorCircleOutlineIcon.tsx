import { IconProps } from './type';

const ErrorCircleOutlineIcon = ({ color = '#dc3545', size = 18 }: IconProps) => (
  <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" fill="none" />
    <path d="M12 7v7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill={color} />
  </svg>
);

export default ErrorCircleOutlineIcon;
