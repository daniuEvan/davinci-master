import React from 'react'
import { Row, Col, Select, InputNumber } from 'antd'

import { onSectionChange } from './util'
import { ISpecConfig } from '../types'
import {  chartGraphScaleOptions } from '../../constants'
import styles from '../../../Workbench.less'

interface ISpecSectioncalendarProps {
  spec: ISpecConfig
  title: string
  onChange: (value: string | number, propPath: string | string[]) => void
}

function SpecSectioncalendar (props: ISpecSectioncalendarProps) {
  const { spec, title, onChange } = props
  const { themeType} = spec

  return (
    <div className={styles.paneBlock}>
      <h4>{title}</h4>

      {/*<div className={styles.blockBody}>*/}
      {/*<h4>标签不可用</h4>*/}
      {/*  <Row gutter={8} type="flex" align="middle" className={styles.blockRow}>*/}
      {/*    <Col span={4}>风格</Col>*/}
      {/*    <Col span={8}>*/}
      {/*      <Select*/}
      {/*        placeholder="风格"*/}
      {/*        className={styles.blockElm}*/}
      {/*        value={themeType}*/}
      {/*        onChange={onSectionChange(onChange, 'themeType')}*/}
      {/*      >*/}
      {/*        {chartGraphScaleOptions}*/}
      {/*      </Select>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}

      {/*</div>*/}
    </div>
  )
}

export default SpecSectioncalendar
