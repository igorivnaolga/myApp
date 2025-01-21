import Svg, { Circle, Path } from 'react-native-svg';
export const CirclePlusSvg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Circle cx={12.5} cy={12.5} r={12} fill="#fff" stroke="#FF6C00" />
    <Path
      fill="#FF6C00"
      fillRule="evenodd"
      d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
      clipRule="evenodd"
    />
  </Svg>
);
