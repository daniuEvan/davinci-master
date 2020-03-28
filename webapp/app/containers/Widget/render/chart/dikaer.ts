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

  try{



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

  const labelOption = {
    label: getLabelOption('sankey', label, metrics)
  }


  let seriesObj = {}
  const seriesArr = []
  let legendData = []


  //构造数据
  // let name = ''
  // let p_name = ''

  //取字段
  console.log(data)
  console.log(cols)
  console.log(metrics)
  // 取数据
  const agg = metrics[0].agg;
  const metricName = decodeMetricName(metrics[0].name);

  const name = cols[0]['name']

  let axisData = [];
  let value = [];
  data.forEach((col)=>{
    axisData.push(col[name]);
    value.push(col[`${agg}(${metricName})`]);
    }
  )
  //end 构造数据
  // legendData.push(dataDict)
  var links = value.map(function (item, i) {
    return {
      source: i,
      target: i + 1
    };
  });
  console.log(axisData)
  console.log(value)
  // links.pop();
  let option = {
    title: {
      text: '笛卡尔坐标系'
    },
    tooltip: {},
    xAxis: {
      type : 'category',
      boundaryGap : false,
      data : axisData
    },
    yAxis: {
      type : 'value'
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        coordinateSystem: 'cartesian2d',
        symbolSize: 30,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        data: value,
        links: links,
        lineStyle: {
          color: '#123456'
        },
        ...labelOption
      }
    ]
  };

  return option
  }
  catch (e) {
    return {'null':''}
  }
}


