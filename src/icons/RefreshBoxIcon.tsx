import { IconProps } from './type';

const RefreshBoxIcon = ({ color = '#898989', size = 18 }: IconProps) => (
  <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="22" height="22" rx="4" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="0.5" />
    <path
      d="M19 12a7 7 0 0 0-7-7 7.74 7.74 0 0 0-5.38 2.18L5 9"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 5v4h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5 12a7 7 0 0 0 7 7 7.74 7.74 0 0 0 5.38-2.18L19 15"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M19 19v-4h-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default RefreshBoxIcon;
