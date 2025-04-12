import React from 'react'
import { Select, Icons } from '../ui'
const { MinusSquareOutlined } = Icons
import {
  DataType,
  getTypeString,
} from '../common'
import { ConfigContext } from '../store'

function ToolsView(props: {
  fieldValue: any
  fieldKey: string
  uniqueKey: string
  sourceData: any
}) {
  return (
    <ConfigContext.Consumer>
      {({ onChangeType, onClickDelete }) => (
        <span className="tools">
          <span>
            <Select
              size="small"
              style={{ width: '100px' }}
              onChange={value => onChangeType(value, props.uniqueKey)}
              value={getTypeString(props.fieldValue)}
            >
              {Object.values(DataType).map(item => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </span>
          <span className="iconSubtraction">
            <MinusSquareOutlined
              style={{ color: '#E74C3C' }}
              onClick={() => onClickDelete(props.fieldKey, props.sourceData)}
            />
          </span>
        </span>
      )}
    </ConfigContext.Consumer>
  )
}
export default ToolsView
