import ChartTypes from './ChartTypes'
import {
  PIVOT_CHART_FONT_FAMILIES,
  PIVOT_DEFAULT_FONT_COLOR,
  CHART_PIE_LABEL_POSITIONS
} from 'app/globalConstants'

import { IChartInfo } from 'containers/Widget/components/Widget'
const tree_2: IChartInfo = {
  id: ChartTypes.Tree_2,
  name: 'tree_2',
  title: '多关系树形图(扩展)',
  icon: 'icon-shuxingtubiao',
  coordinate: 'cartesian',
  rules: [{ dimension: 3, metric: 1 }],
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

export default tree_2
