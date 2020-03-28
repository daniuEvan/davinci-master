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
import 'echarts'
import { EChartOption } from 'echarts'
import { getFormattedValue } from '../../components/Config/Format'
import {makeSelectResetLoading} from "containers/Source/selectors";



let range = [];


function fn() {
  
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
  //
  // const {
  //   label,
  //   spec,
  // } = chartStyles
  //
  // const {
  //   labelColor,
  //   labelFontFamily,
  //   labelFontSize,
  //   labelPosition,
  //   showLabel
  // } = label
  //
  // const {
  //   nodeWidth,
  //   themeType,
  //   nodeGap,
  //   orient,
  //   draggable
  // } = spec


  if(data.length !== 0){
    try{
      var echarts = require('echarts');

      //构造数据
      // 取数据
      const agg = metrics[0].agg;
      const metricName = decodeMetricName(metrics[0].name);

      const name = cols[0]['name'];
      const datetime = cols[1]['name'];



      // 时间

      var Year = 0;
      let Mouth = []; // 取第一个月和最后一个月


      // var graphData = [];
      var n = 1;

      data.forEach((col)=>{

          var date = col[datetime];
          var date = new Date(date); //时间对象
          var str = date.getTime(); //转换成时间戳
          col['time'] = str;
        }
      )
      //end 构造数据
      function sortBy(props) {
        return function(a,b) {
          return a[props] - b[props];
        }
      }
      data.sort(sortBy("time"));


      var graphData = [];
      data.forEach((col)=>{
          var date = col[datetime];
          Year = parseInt(date.split('-')[0]) ;
          Mouth.push(date.split('-')[1]);
          // col['day'] = parseInt(date.slice(5,7))*100 + parseInt(date.slice(8,10)) ;
          var date = new Date(date); //时间对象
          var str = date.getTime(); //转换成时间戳
          var value = col[`${agg}(${metricName})`]
          graphData.push([str,value])
        }
      )


      var links = graphData.map(function (item, idx) {
        return {
          source: idx,
          target: idx + 1
        };
      });
      links.pop();

      function getVirtulData(year) {
        year = year || Year;
        var _date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var _data = [];
        for (var time = _date; time < end; time += dayTime) {
          _data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 1000)
          ]);
        }
        return _data;
      }


      Mouth.sort();
      let startMouth = Mouth[0];
      let endMouth = Mouth[Mouth.length - 1];
      // console.log(1111111111111111111)
      // console.log(Year);
      // console.log(startMouth);
      // console.log(endMouth);

      let range = [];
      if (Year === 0 || startMouth === 'undefined' || endMouth === 'undefined' || startMouth === null) {
        range = ['2020-01','2020-01-31']
      } else {
        range = [''+ Year + "-"+ startMouth, ''+ Year + "-"+ endMouth+ '-' + getDayNumByYearMonth(Year, parseInt(endMouth))]
      }

      console.log(range);


      let option = {
        tooltip: {},
        calendar: {
          top: 'middle',
          left: 'center',
          orient: 'vertical',
          cellSize: 40,
          yearLabel: {
            margin: 50,
            textStyle: {
              fontSize: 30
            }
          },
          dayLabel: {
            firstDay: 1,
            nameMap: 'cn'
          },
          monthLabel: {
            nameMap: 'cn',
            margin: 15,
            textStyle: {
              fontSize: 20,
              color: '#999'
            }
          },
          range:range
          //range?range:['2020-02','2020-03-31']
        },
        visualMap: {
          min: 0,
          max: 1000,
          type: 'piecewise',
          left: 'center',
          bottom: 20,
          inRange: {
            color: ['#5291FF', '#C7DBFF']
          },
          seriesIndex: [1],
          orient: 'horizontal'
        },
        series: [{
          type: 'graph',
          // layout:'circular',
          edgeSymbol: ['none', 'arrow'],
          coordinateSystem: 'calendar',
          links: links,
          symbolSize: 15,
          calendarIndex: 0,
          itemStyle: {
            color: 'yellow',
            shadowBlue: 9,
            shadowOffsetX: 1.5,
            shadowOffsetY: 3,
            shadowColor: '#555'
          },
          lineStyle: {
            color: '#D10E00',
            width: 1,
            opacity: 1
          },
          data: graphData,
          z: 20
        }, {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getVirtulData(Year)
        }]
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


function getDayNumByYearMonth(year,month){
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
      break;
    case 2:
      if (isLeapYear(year)) {
        return 29
      }else{
        return 28
      }
  }
}

function isLeapYear(year){
  if(year/4 == 0 && year/100 != 0){
    return true ;
  } else if (year/400 == 0){
    return true ;
  } else{
    return false ;
  }
}
