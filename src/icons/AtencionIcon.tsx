import { IconProps } from './type';

const AtencionIcon = ({ color = '#ffc107', size = 18 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 80" height={size}>
    <g transform="translate(0 5)">
      <path
        d="M40 12L66 56H14L40 12Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M40 24V42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="48" r="1.5" fill={color} />
    </g>
  </svg>
);

export default AtencionIcon;
