import { IconProps } from './type';

const FacebookIcon = ({ color = '#898989', size = 18 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 80" height={size}>
    <g transform="translate(0 5)">
      <path
        id="f"
        fill={color}
        d="M43.48,57.5v-20.53h6.89l1.03-8h-7.92v-5.11c0-2.32.64-3.89,3.97-3.89h4.23v-7.16c-.73-.1-3.25-.31-6.17-.31-6.11,0-10.29,3.73-10.29,10.57v5.9h-6.91v8h6.91v20.53h8.26Z"
      />
    </g>
  </svg>
);

export default FacebookIcon;
