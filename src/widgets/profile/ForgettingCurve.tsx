import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { memfeedColor, memfeedFont } from '../../shared/theme'

const HORIZON_DAYS = 30
const CHART_HEIGHT = 110
const PLOT_TOP = 10
const PLOT_BOTTOM = 8
const NATURAL_STABILITY_DAYS = 2.5
const MARKER_DAYS = [1, 7, 15, 21, 30]

type ForgettingCurveProps = {
  retentionPercent: number
  chartWidth: number
}

const retentionAt = (day: number, stabilityDays: number): number =>
  Math.exp(-day / stabilityDays)

// A curva do Memfeed é a mesma exponencial do esquecimento com a estabilidade que o FSRS
// alcançou: dado que o aluno retém `retentionPercent` no dia 30, S = -30 / ln(retenção).
const stabilityFromRetention = (retentionPercent: number): number => {
  const retention = Math.min(Math.max(retentionPercent, 1), 99.9) / 100
  return -HORIZON_DAYS / Math.log(retention)
}

const plotY = (retention: number): number =>
  PLOT_TOP + (1 - retention) * (CHART_HEIGHT - PLOT_TOP - PLOT_BOTTOM)

const curvePoints = (stabilityDays: number, width: number): string[] =>
  Array.from({ length: HORIZON_DAYS + 1 }, (_, day) => {
    const x = (day / HORIZON_DAYS) * width
    return `${x.toFixed(1)} ${plotY(retentionAt(day, stabilityDays)).toFixed(1)}`
  })

const buildPath = (stabilityDays: number, width: number): string =>
  `M ${curvePoints(stabilityDays, width).join(' L ')}`

const styles = StyleSheet.create({
  axis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  axisLabel: {
    fontFamily: memfeedFont.medium,
    fontSize: 10,
    color: memfeedColor.textMuted,
  },
  axisLabelStrong: {
    fontFamily: memfeedFont.bold,
    fontSize: 10,
    color: memfeedColor.primaryDeep,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendSolid: {
    width: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: memfeedColor.primary,
  },
  legendDashed: {
    width: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: memfeedColor.border,
  },
  legendText: {
    fontFamily: memfeedFont.medium,
    fontSize: 11,
    color: memfeedColor.textMuted,
  },
  plot: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: memfeedColor.surfaceSoft,
  },
})

export const ForgettingCurve = ({ retentionPercent, chartWidth }: ForgettingCurveProps) => {
  const stability = stabilityFromRetention(retentionPercent)
  const memfeedPath = buildPath(stability, chartWidth)
  const naturalPath = buildPath(NATURAL_STABILITY_DAYS, chartWidth)
  // A área preenchida é a distância entre as duas curvas: o que a revisão espaçada segurou.
  const gapPath = `${memfeedPath} L ${curvePoints(NATURAL_STABILITY_DAYS, chartWidth)
    .slice()
    .reverse()
    .join(' L ')} Z`

  return (
    <View>
      <View style={styles.plot}>
        <Svg width={chartWidth} height={CHART_HEIGHT}>
          <Path d={gapPath} fill={memfeedColor.primary} fillOpacity={0.14} />
          <Path
            d={naturalPath}
            stroke={memfeedColor.border}
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="none"
          />
          <Path
            d={memfeedPath}
            stroke={memfeedColor.primary}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
          {MARKER_DAYS.map((day) => (
            <Circle
              key={day}
              cx={(day / HORIZON_DAYS) * chartWidth}
              cy={plotY(retentionAt(day, stability))}
              r={3.5}
              fill={memfeedColor.surface}
              stroke={memfeedColor.primary}
              strokeWidth={2}
            />
          ))}
        </Svg>
      </View>

      <View style={styles.axis}>
        {MARKER_DAYS.map((day) => (
          <Text key={day} style={day === HORIZON_DAYS ? styles.axisLabelStrong : styles.axisLabel}>
            {day === HORIZON_DAYS
              ? `Dia 30 · ${Math.round(retentionPercent)}%`
              : `Dia ${day}`}
          </Text>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={styles.legendSolid} />
          <Text style={styles.legendText}>Com revisão do Memfeed</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={styles.legendDashed} />
          <Text style={styles.legendText}>Sem revisar nada</Text>
        </View>
      </View>
    </View>
  )
}

export const useChartWidth = (horizontalPadding: number): number => {
  const { width } = useWindowDimensions()
  return Math.max(200, width - horizontalPadding)
}
