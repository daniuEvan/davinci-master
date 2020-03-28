
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
import 'echarts'
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
  // console.log(data);
  // console.log(cols)
  // console.log(themeType)
  const labelOption = {
    label: getLabelOption('sankey', label, metrics)
  }

  let seriesObj = {}
  const seriesArr = []
  let legendData = {}



  try{
  //取数据
  let dataNode = []
  let datalink = []
  var qc = []; // 去重
  data.forEach((col)=>{
    
    var id = col['id'];
    // console.log(id)
    // console.log(qc)
    if (!qc.includes(id)) {  // 去重
      dataNode.push({
        'id':String(col['id']),
        'name': col['name'],
        'symbolSize': parseInt(col['symbolsize']),
        "attributes": {"modularity_class": parseInt(col['class'])}
      })
      qc.push(id)
    }
    datalink.push({
      'source':String(col['source']) ,
      'target':String(col['target']) ,
    })

    }
  )
  //end 构造数据
  legendData = {
    'nodes':dataNode,
    'links':datalink
  }


  var graph = JSON.parse(JSON.stringify(legendData))
  var categories = [];
  for (var i = 0; i < 9; i++) {
    categories[i] = {
      name: '类目' + i
    };
  }

  let option = {};

  switch  (themeType){
    case 'round':
      graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.symbolSize /= 1.5;
        node.label = {
          normal: {
            show: node.symbolSize > 10
          }
        };
        node.category = node.attributes.modularity_class;
      });
      option = {
        title: {
          text: '关系图',
          subtext: 'Circular layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [{
          data: categories.map(function (a) {
            return a.name;
          })
        }],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '关系图',
            type: 'graph',
            // layout: 'circular',
            layout: 'circular',
            circular: {
              rotateLabel: true
            },
            data: graph.nodes,
            links: graph.links,
            categories: categories,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
          }
        ]
      };
      break;
    case 'small':
      graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.symbolSize = 10;
        node.value = node.symbolSize;
        node.category = node.attributes.modularity_class;
        // Use random x, y
        node.x = node.y = null;
        node.draggable = true;
      });
      option = {
        title: {
          text: '关系图',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [{
          // selectedMode: 'single',
          data: categories.map(function (a) {
            return a.name;
          })
        }],
        animation: false,
        series : [
          {
            name: '关系图',
            type: 'graph',
            layout: 'force',
            data: graph.nodes,
            links: graph.links,
            categories: categories,
            roam: true,
            label: {
              position: 'right'
            },
            force: {
              repulsion: 100
            }
          }
        ]
      };
      break;
    case 'small2':

      let d = {} ;  //去重

      graph.nodes.forEach(function (node) {
        delete node.symbolSize;
        // delete node.;
        node.value = node.symbolSize;

        // node.symbolSize /= 1.5;
        node.label = {
          normal: {

          }
        };
        node.category = node.attributes.modularity_class;
        d[node.attributes.modularity_class] = '' //去重
      });
      let categories_list = [];
      let my_categories = [];
      for (var key in d) {
        categories_list.push(key);
        my_categories.push({'name':key.toString(),'keyword':{},'base':key.toString()})

      }
      // if (my_categories===[]) {
      //   my_categories =  [
      //     {
      //       "name": "HTMLElement",
      //       "keyword": {},
      //       "base": "HTMLElement"
      //     },
      //     {
      //       "name": "WebGL",
      //       "keyword": {},
      //       "base": "WebGLRenderingContext"
      //     },
      //     {
      //       "name": "SVG",
      //       "keyword": {},
      //       "base": "SVGElement"
      //     },
      //     {
      //       "name": "CSS",
      //       "keyword": {},
      //       "base": "CSSRule"
      //     },
      //     {
      //       "name": "Other",
      //       "keyword": {}
      //     }
      //   ]
      // }


      console.log(JSON.stringify(my_categories))

      option = {
        legend: {
          data: categories_list
        },
        series: [{
          type: 'graph',
          layout: 'force',
          animation: false,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          draggable: true,
          data: graph.nodes,
          categories: my_categories,
          force: {
            edgeLength: 5,
            repulsion: 40,
            gravity: 0.2
          },
          edges: graph.links
        }]
      };


      break;
    case 'round2':

      graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.symbolSize /= 1.5;
        node.label = {
          normal: {
            show: node.symbolSize > 10
          }
        };
        node.category = node.attributes.modularity_class;
      });
      option = {
        title: {
          text: 'Les Miserables',
          subtext: 'Circular layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [{
          data: categories.map(function (a) {
            return a.name;
          })
        }],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'circular',
            circular: {
              rotateLabel: true
            },
            data: graph.nodes,
            links: graph.links,
            categories: categories,
            roam: true,
            focusNodeAdjacency: true,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 10
              }
            },
          }
        ]
      };
      break;
    case 'middle':
      graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.symbolSize /= 1.5;
        node.label = {
          show: node.symbolSize > 20
        };
        node.category = node.attributes.modularity_class;
      });
      option = {
        title: {
          text: 'Les Miserables',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [{
          // selectedMode: 'single',
          data: categories.map(function (a) {
            return a.name;
          })
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: graph.nodes,
            links: graph.links,
            categories: categories,
            roam: true,
            focusNodeAdjacency: true,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 10
              }
            },
            force: {
              repulsion: 400
            }

          }
        ]
      };

  }
  return option
  }
  catch (e) {
    return {'null':''}
  }
}




