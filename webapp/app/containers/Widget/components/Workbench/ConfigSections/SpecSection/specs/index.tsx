import React from 'react'
import loadable from 'utils/loadable'
import { Skeleton } from 'antd'

const fallback = <Skeleton paragraph={{ rows: 4 }} />

export const LineSection = loadable(() => import('./Line'), { fallback })

export const PieSection = loadable(() => import('./Pie'), { fallback })

export const FunnelSection = loadable(() => import('./Funnel'), { fallback })

export const MapSection = loadable(() => import('./Map'), { fallback })

// 百度地图
export const MapSection_baidu = loadable(() => import('./baidu_map'), { fallback })

export const ParallelSection = loadable(() => import('./Parallel'), { fallback })

export const SankeySection = loadable(() => import('./Sankey'), { fallback })

export const DoubleYAxisSection = loadable(() => import('./DoubleYAxis'), { fallback })

//tree
export const TreeSection = loadable(() => import('./tree'), { fallback })
export const Tree_2Section = loadable(() => import('./tree_2'), { fallback })

//graph
export const GraphSection = loadable(() => import('./graph'), { fallback })

//dikaer
export const DikaerSection = loadable(() => import('./dikaer'), { fallback })

//calendar
export const CalendarSection = loadable(() => import('./calendar'), { fallback })
