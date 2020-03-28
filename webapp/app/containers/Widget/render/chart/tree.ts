/*
 * <<
 * Davinci
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

import {
  IChartProps
} from '../../components/Chart'
import {
  decodeMetricName,
  getChartTooltipLabel,
  getSizeValue,
  getSizeRate
} from '../../components/util'
import {
  getMetricAxisOption,
  getLabelOption,
  getLegendOption,
  getSymbolSize
} from './util'
import { EChartOption } from 'echarts'
import { getFormattedValue } from '../../components/Config/Format'
import {makeSelectResetLoading} from "containers/Source/selectors";

export default function (chartProps: IChartProps, drillOptions?: any) {
  const {
    width,
    height,
    data,  // 数据
    cols,  // 维度字段
    metrics,  // 指标字段
    chartStyles,
    tip
  } = chartProps

  const {
    label,
    spec,
  } = chartStyles

  const {
    labelColor,
    labelFontFamily,
    labelFontSize,
    labelPosition,
    showLabel
  } = label

  const {
    nodeWidth,
    themeType,
    nodeGap,
    orient,
    draggable
  } = spec

  // const labelOption = {
  //   label: {
  //     normal: {
  //       formatter: '{b}',
  //       // position: labelPosition,
  //       show: showLabel,
  //       color: labelColor,
  //       fontFamily: labelFontFamily,
  //       fontSize: labelFontSize
  //     }
  //   },
  //   // type: effectType === 'raindrop' ? 'scatter' : effectType,
  //   // symbol: effectType === 'raindrop' ? 'pin' : ''
  // }
  try{
  const labelOption = {
    label: getLabelOption('sankey', label, metrics)
  }


  let seriesObj = {}
  const seriesArr = []
  let legendData = []


  //构造数据
  let name = ''
  let p_name = ''

  //取字段

  //取数据
  const agg = metrics[0].agg
  const metricName = decodeMetricName(metrics[0].name)
  let dataDict = {}
  data.forEach((col)=>{
    if (col['p_name'] === "") {
      dataDict['name'] = col['name']
      dataDict['value'] = col[`${agg}(${metricName})`]
      dataDict['children'] = buildData(col['name'], data)
    }
    }
  )
  //end 构造数据

  legendData.push(dataDict)


  // 方向设置
  switch (themeType) {
    case 'right':
      seriesObj = {
        type: 'tree',
        data: legendData,
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 7,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9
        },

        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        ...labelOption
      }
      break
    case 'left':
      seriesObj ={
        type: 'tree',

        data: legendData,

        top: '1%',
        left: '15%',
        bottom: '1%',
        right: '7%',

        symbolSize: 7,

        orient: 'RL',

        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        },

        leaves: {
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right'
          }
        },

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
      break
    case 'up':
      seriesObj = {
        type: 'tree',

        data: legendData,

        left: '2%',
        right: '2%',
        top: '20%',
        bottom: '8%',

        symbol: 'emptyCircle',

        orient: 'BT',

        expandAndCollapse: true,

        label: {
          position: 'bottom',
          rotate: 90,
          verticalAlign: 'middle',
          align: 'right'
        },

        leaves: {
          label: {
            position: 'top',
            rotate: 90,
            verticalAlign: 'middle',
            align: 'left'
          }
        },

        animationDurationUpdate: 750
      }
      break
    case 'down':
      seriesObj =  {
        type: 'tree',

        data: legendData,

        left: '2%',
        right: '2%',
        top: '8%',
        bottom: '20%',

        symbol: 'emptyCircle',

        orient: 'vertical',

        expandAndCollapse: true,

        label: {
          position: 'top',
          rotate: -90,
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 9
        },

        leaves: {
          label: {
            position: 'bottom',
            rotate: -90,
            verticalAlign: 'middle',
            align: 'left'
          }
        },

        animationDurationUpdate: 750
      }
      break
    case 'round':
      seriesObj =  {
        type: 'tree',

        data: legendData,

        top: '18%',
        bottom: '14%',

        layout: 'radial',

        symbol: 'emptyCircle',

        symbolSize: 7,

        initialTreeDepth: 3,

        animationDurationUpdate: 750

      }
      break
    case 'poly':
      seriesObj = {
        type: 'tree',
        id: 0,
        name: 'tree1',
        data: legendData,

        top: '10%',
        left: '8%',
        bottom: '22%',
        right: '20%',

        symbolSize: 7,

        edgeShape: 'polyline',
        edgeForkPosition: '63%',
        initialTreeDepth: 3,

        lineStyle: {
          width: 2
        },

        label: {
          backgroundColor: '#fff',
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        },

        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
      break
  }

  seriesArr.push(seriesObj)


  const tooltip: EChartOption.Tooltip = {
    trigger: 'item',
    triggerOn:'mousemove'
  }

  return {
    tooltip,
    // legend: getLegendOption(legend, legendData),
    series: seriesArr
  }
}
catch (e) {
  return {'null':''}
}
}


// 递归生成数据结构
function buildData(p_name,items) {
  let children = []
  items.forEach((item)=>{
    if (item['p_name'] === p_name ) {
      children.push(
        {'name': item['name'],
          'value': item['sum(value)'],
          'children': buildData(item['name'], items)
        }
      )
    }
  }
  );
  return children
}


