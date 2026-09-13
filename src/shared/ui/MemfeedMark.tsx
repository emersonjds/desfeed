import Svg, { Path } from 'react-native-svg'

type MemfeedMarkProps = {
  size?: number
  color?: string
}

// A marca do Memfeed é um feed empilhado que volta ao topo, e não existe glifo equivalente no
// Ant Design — `retweet` e `all-inclusive` são aproximações que descaracterizam a marca.
export const MemfeedMark = ({ size = 24, color = '#10b981' }: MemfeedMarkProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 10h7M5 14.5h4.5M5 19h7"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 19a6 6 0 0 0 0-12h-2"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.5 4.5 10 7l2.5 2.5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
