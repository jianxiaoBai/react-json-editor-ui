import { MinusSquareOutlined,CopyOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import React from 'react'
import { ConfigContext } from '../store'
import { getTypeString, DataType } from '../common'

function ToolsView(props: {
  fieldValue: any
  fieldKey: string
  sourceData: any
}) {
  return (
    <ConfigContext.Consumer>
      {({ onChangeType, onClickDelete, onClickCopy, copy }) => (
        <span className="tools">
          <span>
            <Select
              size="small"
              style={{ width: '100px' }}
              onChange={value => onChangeType(value, props.fieldValue)}
              defaultValue={getTypeString(props.fieldValue)}
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
          {copy && (
              <span className="iconCopy">
                <CopyOutlined
                style={{ color: '#3078f6' }}
                onClick={() => onClickCopy(props.fieldKey,props.fieldValue, props.sourceData)}
                />
              </span>
          )}
        </span>
      )}
    </ConfigContext.Consumer>
  )
}
export default ToolsView
