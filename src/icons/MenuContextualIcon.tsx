import { IconProps } from './type';

const MenuContextualIcon = ({ color = '#898989', size = 18 }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 80" height={size}>
    <g transform="translate(0 5)">
      <path
        fill={color}
        d="M40,10c2.86,0,5.17,2.31,5.17,5.17s-2.31,5.17-5.17,5.17-5.17-2.31-5.17-5.17,2.31-5.17,5.17-5.17ZM40,29.83c2.86,0,5.17,2.31,5.17,5.17s-2.31,5.17-5.17,5.17-5.17-2.31-5.17-5.17,2.31-5.17,5.17-5.17ZM40,49.66c2.86,0,5.17,2.31,5.17,5.17s-2.31,5.17-5.17,5.17-5.17-2.31-5.17-5.17,2.31-5.17,5.17-5.17Z"
      />
    </g>
  </svg>
);

export default MenuContextualIcon;
