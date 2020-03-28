import React from 'react'
import { Row, Col, Select, InputNumber } from 'antd'

import { onSectionChange } from './util'
import { ISpecConfig } from '../types'
import {  chartTreeScaleOptions } from '../../constants'
import styles from '../../../Workbench.less'

interface ISpecSectionTree_2Props {
  spec: ISpecConfig
  title: string
  onChange: (value: string | number, propPath: string | string[]) => void
}

function SpecSectionTree_2 (props: ISpecSectionTree_2Props) {
  const { spec, title, onChange } = props
  const { themeType} = spec

  return (
    <div className={styles.paneBlock}>
      <h4>{title}</h4>
      {/*<div className={styles.blockBody}>*/}
      {/*  <Row gutter={8} type="flex" align="middle" className={styles.blockRow}>*/}

      {/*    <Col span={6}>分支方向</Col>*/}
      {/*    <Col span={10}>*/}
      {/*      <Select*/}
      {/*        placeholder="方向"*/}
      {/*        className={styles.blockElm}*/}
      {/*        value={themeType}*/}
      {/*        onChange={onSectionChange(onChange, 'themeType')}*/}
      {/*      >*/}
      {/*        {chartTreeScaleOptions}*/}
      {/*      </Select>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}

      {/*</div>*/}
    </div>
  )
}

export default SpecSectionTree_2
