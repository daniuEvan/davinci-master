import ChartTypes from './ChartTypes'
import {
  PIVOT_CHART_FONT_FAMILIES,
  PIVOT_DEFAULT_FONT_COLOR,
  CHART_PIE_LABEL_POSITIONS
} from 'app/globalConstants'

import { IChartInfo } from 'containers/Widget/components/Widget'
const graph: IChartInfo = {
  id: ChartTypes.Graph,
  name: 'graph',
  title: '关系图(扩展)',
  icon: 'icon-guanxi1',
  coordinate: 'cartesian',
  rules: [{ dimension: 6, metric: 0 }],
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
      labelPosition: 'left',
      labelFontFamily: PIVOT_CHART_FONT_FAMILIES[0].value,
      labelFontSize: '12',
      labelColor: PIVOT_DEFAULT_FONT_COLOR
    },
    spec: {
      nodeWidth: 20,
      nodeGap: 8,
      themeType: 'round',
      orient: 'horizontal',
      draggable: true
    }
  }
}

export default graph
