import Svg, { Path } from 'react-native-svg'

type InfinityMarkProps = {
  size?: number
  color?: string
}

// A marca do Desfeed é um laço de infinito, e não existe glifo equivalente no conjunto do
// Ant Design — `all-inclusive` e `retweet` são aproximações que descaracterizam a marca.
// O traço acompanha o peso dos ícones da barra (2.2 em 24) para não destoar ao lado deles.
export const InfinityMark = ({ size = 24, color = '#10b981' }: InfinityMarkProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.2 8.4c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6c1.4 0 2.4-.8 3.4-1.9L15 9.3c1-1.1 2-1.9 3.4-1.9 2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6c-1.4 0-2.4-.8-3.4-1.9l-4.4-4.4C9.6 9.2 8.6 8.4 7.2 8.4Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
