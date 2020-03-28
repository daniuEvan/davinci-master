import React from 'react'

import { ISpecConfig } from './types'
import {
  LineSection,
  PieSection,
  TreeSection,
  Tree_2Section,
  GraphSection,
  DikaerSection,
  CalendarSection,
  FunnelSection,
  MapSection,
  MapSection_baidu,
  ParallelSection,
  SankeySection,
  DoubleYAxisSection
} from './specs'

interface ISpecSectionProps {
  name: string
  title: string
  config: ISpecConfig
  onChange: (value: string | number, propPath: string[]) => void
  isLegendSection: boolean
}

export class SpecSection extends React.PureComponent<ISpecSectionProps, {}> {
  private static readonly BasePropPath = ['spec']

  private specChange = (
    value: string | number,
    propPath: string | string[]
  ) => {
    this.props.onChange(value, SpecSection.BasePropPath.concat(propPath))
  }

  public render () {
    const { name, title, config, isLegendSection } = this.props
    let renderHtml: JSX.Element
    switch (name) {
      case 'line':
        renderHtml = <LineSection spec={config} title={title} onChange={this.specChange} />
        break
      case 'pie':
        renderHtml = <PieSection spec={config} title={title} onChange={this.specChange} />
        break
      // tree
      case 'tree':
        renderHtml = <TreeSection spec={config} title={title} onChange={this.specChange} />
        break
      case 'tree_2':
        renderHtml = <Tree_2Section spec={config} title={title} onChange={this.specChange} />
        break
      // graph 关系图
      case 'graph':
        renderHtml = <GraphSection spec={config} title={title} onChange={this.specChange} />
        break
      // kadier
      case 'dikaer':
        renderHtml = <DikaerSection spec={config} title={title} onChange={this.specChange} />
        break
      // calendar
      case 'calendar':
        renderHtml = <CalendarSection spec={config} title={title} onChange={this.specChange} />
        break
      case 'funnel':
        renderHtml = <FunnelSection spec={config} title={title} onChange={this.specChange} />
        break
      case 'map':
        renderHtml = <MapSection spec={config} title={title} isLegendSection={isLegendSection} onChange={this.specChange} />
        break
      case 'baidu_map':
        renderHtml = <MapSection_baidu spec={config} title={title} isLegendSection={isLegendSection} onChange={this.specChange} />
        break
      case 'parallel':
        renderHtml = <ParallelSection spec={config} title={title} onChange={this.specChange}/>
        break
      case 'sankey':
        renderHtml = <SankeySection spec={config} title={title} onChange={this.specChange}/>
        break
      case 'doubleYAxis':
        renderHtml = <DoubleYAxisSection spec={config} title={title} onChange={this.specChange}/>
        break
      default:
        renderHtml = <div />
        break
    }

    return renderHtml
  }
}

export default SpecSection
