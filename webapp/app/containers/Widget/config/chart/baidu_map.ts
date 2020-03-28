import ChartTypes from './ChartTypes'
import {
  PIVOT_CHART_FONT_FAMILIES,
  PIVOT_DEFAULT_FONT_COLOR,
  CHART_LABEL_POSITIONS,
  CHART_VISUALMAP_POSITIONS,
  CHART_LEGEND_POSITIONS,
  CHART_LINES_SYMBOL_TYPE
} from 'app/globalConstants'
const defaultTheme = require('assets/json/echartsThemes/macarons.project.json')
const defaultThemeColors = defaultTheme.theme.color

import { IChartInfo } from 'containers/Widget/components/Widget'

const baidu_map: IChartInfo = {
  id: ChartTypes.baidu_map,
  name: 'baidu_map',
  title: '百度地图(扩展)',
  icon: 'icon-baidumap',
  coordinate: 'cartesian',
  rules: [{ dimension: [3, 9999], metric: 1 }],
  dimetionAxis: 'col',
  data: {
    cols: {
      title: '列',
      type: 'category'
    },
    rows: {
      title: '行',
      type: 'category'
    },
    metrics: {
      title: '指标',
      type: 'value'
    },
    filters: {
      title: '筛选',
      type: 'all'
    }
  },
  style: {
    label: {
      showLabel: false,
      labelPosition: CHART_LABEL_POSITIONS[0].value,
      labelFontFamily: PIVOT_CHART_FONT_FAMILIES[0].value,
      labelFontSize: '12',
      labelColor: PIVOT_DEFAULT_FONT_COLOR
    },
    visualMap: {
      showVisualMap: true,
      visualMapPosition: CHART_VISUALMAP_POSITIONS[0].value,
      fontFamily: PIVOT_CHART_FONT_FAMILIES[0].value,
      fontSize: '12',
      visualMapDirection: 'vertical',
      visualMapWidth: 20,
      visualMapHeight: 150,
      startColor: defaultThemeColors[0],
      endColor: defaultThemeColors[2]
    },
    legend: {
      showLegend: true,
      legendPosition: CHART_LEGEND_POSITIONS[0].value,
      selectAll: true,
      fontFamily: PIVOT_CHART_FONT_FAMILIES[0].value,
      fontSize: '12',
      color: PIVOT_DEFAULT_FONT_COLOR
    },
    spec: {
      layerType: 'map',
      effectType: 'scatter',
      bubbleType: 'system',
      bubbleValue: 8,
      themeType: 'simpleWind',
      lonValue: 107,
      latValue: 35,
      zoomValue: 5,
      symbolType: CHART_LINES_SYMBOL_TYPE[0].value
    }
  }
}

export default baidu_map
