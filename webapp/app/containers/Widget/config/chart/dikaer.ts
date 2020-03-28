import ChartTypes from './ChartTypes'
import {
  PIVOT_CHART_FONT_FAMILIES,
  PIVOT_DEFAULT_FONT_COLOR,
  CHART_PIE_LABEL_POSITIONS
} from 'app/globalConstants'

import { IChartInfo } from 'containers/Widget/components/Widget'
const dikaer: IChartInfo = {
  id: ChartTypes.Dikaer,
  name: 'dikaer',
  title: '笛卡尔坐标系(扩展)',
  icon: 'icon-dikaerzuobiao',
  coordinate: 'cartesian',
  rules: [{ dimension: 1, metric: 1 }],
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
      showLabel: true,
      labelPosition: 'left',
      labelFontFamily: PIVOT_CHART_FONT_FAMILIES[0].value,
      labelFontSize: '12',
      labelColor: PIVOT_DEFAULT_FONT_COLOR
    },
    spec: {
      nodeWidth: 20,
      nodeGap: 8,
      themeType: 'right',
      orient: 'horizontal',
      draggable: true
    }
  }
}

export default dikaer
