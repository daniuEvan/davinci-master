import React from 'react'
import { Row, Col, Select, InputNumber } from 'antd'

import { onSectionChange } from './util'
import { ISpecConfig } from '../types'
import {  chartGraphScaleOptions } from '../../constants'
import styles from '../../../Workbench.less'

interface ISpecSectionDikaerProps {
  spec: ISpecConfig
  title: string
  onChange: (value: string | number, propPath: string | string[]) => void
}

function SpecSectionDikaer (props: ISpecSectionDikaerProps) {
  const { spec, title, onChange } = props
  const { themeType} = spec

  return (
    <div className={styles.paneBlock}>
      <h4>{title}</h4>
      {/*<div className={styles.blockBody}>*/}
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

export default SpecSectionDikaer
