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

function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis * 1000;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
}


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




  // console.log(cols);
  // console.log(metrics);
  if(data.length !== 0){
    try{
      let classArr = [];
      data.forEach((item)=>{
        if ( !classArr.includes(item['class']) ) {
          classArr.push(item['class'])
        }
      });
      // 判断类别长度
      if (classArr.length !==2 ) {
        return
      }

      const labelOption = {
        label: getLabelOption('sankey', label, metrics)
      }

      // 分类
      var data1 = [];
      var data2 = [];
      data.forEach((item)=>{
        item['class']===classArr[0] ? data1.push(item) : data2.push(item)

      });

      let Data1 = {};
      let Data2 = {};

      let seriesObj = {};
      const seriesArr = [];
      let legendData = [];

      //构造数据
      //取字段  取数据
      const agg = metrics[0].agg;
      const metricName = decodeMetricName(metrics[0].name);

      // 遍历两个数组
      data1.forEach((col)=>{
          if (col['p_name'] === "") {
            Data1['name'] = col['name'];
            Data1['value'] = col[`${agg}(${metricName})`];
            Data1['children'] = buildData(col['name'], data1)
          }
        }
      );

      data2.forEach((col)=>{
          if (col['p_name'] === "") {
            Data2['name'] = col['name'];
            Data2['value'] = col[`${agg}(${metricName})`];
            Data2['children'] = buildData(col['name'], data2)
          }
        }
      );
      //end 构造数据



      let option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        legend: {
          top: '2%',
          left: '3%',
          orient: 'vertical',
          data: [{
            name: 'tree1',
            icon: 'rectangle'
          },
            {
              name: 'tree2',
              icon: 'rectangle'
            }],
          borderColor: '#c23531'
        },
        series:[
          {
            type: 'tree',
            name: 'tree1',
            data: [Data1],
            top: '5%',
            left: '7%',
            bottom: '2%',
            right: '60%',
            symbolSize: 7,
            label: {
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
            animationDurationUpdate: 750,
            ...labelOption
          },
          {
            type: 'tree',
            name: 'tree2',
            data: [Data2],
            top: '20%',
            left: '60%',
            bottom: '22%',
            right: '18%',
            symbolSize: 7,
            label: {
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
            animationDurationUpdate: 750,
            ...labelOption
          },

        ]
      };
      return option
    }
    catch (e) {
      var err= [];
      err.push(e);
      console.log('----------------------------------------------11111111');
      return {"null":0}
    }

  }else{
    return {"null":0}
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


