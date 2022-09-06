import { CaretDownOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { isObject } from '../common'
import { ConfigContext } from '../store'

type Props = {
  uniqueKey: string
  fieldValue: any
}

function CollapsePart(props: Props) {
  const { fieldValue, uniqueKey } = props
  const { onChangeAllow, allowMap } = useContext(ConfigContext)
  if (!isObject(fieldValue)) return <span></span>
  return (
    <span
      style={{ marginRight: '5px' }}
      onClick={() => onChangeAllow(uniqueKey)}
    >
      <CaretDownOutlined
        className={`collapse ${!allowMap[uniqueKey] ? 'up' : 'down'}`}
      />
    </span>
  )
}
export default CollapsePart
