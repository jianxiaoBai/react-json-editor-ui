import { MinusSquareOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import React from 'react'
import { ConfigContext } from './store'
import { getTypeString, typeList } from './util'

function ToolsView(props: {
  fieldValue: any
  fieldKey: string
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
              onChange={value => onChangeType(value, props.fieldValue)}
              defaultValue={getTypeString(props.fieldValue)}
            >
              {typeList.map(item => (
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
