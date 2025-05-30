const UrgenteIcon = ({ color = '#e10000', size = 18 }) => (
  <svg height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35.52" stroke={color} strokeWidth="3" />
    <circle cx="40" cy="40" r="29.65" fill={color} />
    <circle cx="40" cy="57.76" r="3.28" fill="white" />
    <rect x="37" y="17.76" width="6.56" height="31.38" rx="3.25" fill="white" />
  </svg>
);

export default UrgenteIcon;
