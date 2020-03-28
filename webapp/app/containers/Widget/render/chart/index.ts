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

import line from './line'
import bar from './bar'
import scatter from './scatter'
import pie from './pie'
// tree
import tree from './tree'
import area from './area'
import funnel from './funnel'
import map from './map'
// 百度地图
import baidu_map from './baidu_map'
import radar from './radar'
import sankey from './sankey'
import parallel from './parallel'
import wordCloud from './wordCloud'
import waterfall from './waterfall'
import doubleYAxis from './doubleYAxis'
import gauge from './gauge'
import { EChartOption } from 'echarts'
import { IChartProps } from '../../components/Chart'

//关系图
import graph from "containers/Widget/render/chart/graph";

//笛卡尔坐标
import dikaer from "containers/Widget/render/chart/dikaer";
import calendar from "containers/Widget/render/chart/calendar";
import tree_2 from "containers/Widget/render/chart/tree_2";

export default function (type, chartProps: IChartProps, drillOptions?: any): EChartOption {
  switch (type) {
    case 'line': return line(chartProps, drillOptions)
    case 'bar': return bar(chartProps, drillOptions)
    case 'scatter': return scatter(chartProps, drillOptions)
    case 'pie': return pie(chartProps, drillOptions)
    case 'funnel': return funnel(chartProps, drillOptions)
    // case 'area': return area(chartProps)
    case 'radar': return radar(chartProps)
    case 'sankey': return sankey(chartProps)
    case 'parallel': return parallel(chartProps)
    case 'map': return map(chartProps)
    // 百度地图
    case 'baidu_map': return baidu_map(chartProps)
    case 'wordCloud': return wordCloud(chartProps)
    case 'waterfall': return waterfall(chartProps)
    case 'doubleYAxis': return doubleYAxis(chartProps, drillOptions)
    case 'gauge': return gauge(chartProps, drillOptions);
    // tree
    case 'tree': return tree(chartProps, drillOptions);

    // tree_2
    case 'tree_2': return tree_2(chartProps, drillOptions);
    // graph
    case 'graph': return graph(chartProps, drillOptions);
    // dikaer
    case 'dikaer': return dikaer(chartProps, drillOptions);
    // calendar
    case 'calendar': return calendar(chartProps, drillOptions);
  }
}
