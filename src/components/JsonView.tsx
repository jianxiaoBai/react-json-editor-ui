import { AutoComplete, Input, InputNumber, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import {
  DataType,
  getPlaceholder,
  getQuoteAddress,
  getTypeString,
  typeMap,
} from '../common'
import AddItem from './AddItem'
import { ConfigContext } from '../store'
import ArrayView from './ArrayView'
import ToolsView from './Tools'
import CollapsePart from './Collapse'
import { JsonEditorProps } from '..'

function JsonView(props: JsonEditorProps) {
  const { editObject, setEditObject, optionsMap } = useContext(ConfigContext)
  const [allowMap, setAllowMap] = useState<Record<string, boolean>>({})

  useEffect(() => {
    props.onChange(editObject)
  }, [editObject])

  const syncData = (data: Record<string, any>) => {
    setEditObject({ ...data })
  }

  const onClickDelete = (key: string, sourceData: any) => {
    if (Array.isArray(sourceData)) {
      sourceData.splice(+key, 1)
    } else {
      Reflect.deleteProperty(sourceData, key)
    }
    syncData(editObject)
  }

  const onChangeType = (type: DataType, fieldValue: any) => {
    const newEditObject = getQuoteAddress(fieldValue, typeMap[type], editObject)
    syncData(newEditObject)
  }

  const onChangeKey = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentKey: string,
    source: Record<string, any>
  ) => {
    const newValue: Record<string, any> = {}
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (key === currentKey) {
          newValue[event.target.value] = source[key]
        } else {
          newValue[key] = source[key]
        }
      }
    }
    const newTotalData = getQuoteAddress(source, newValue, editObject)
    syncData(newTotalData)
  }

  const onChangeValue = (
    value: any,
    key: string,
    source: Record<string, any>
  ) => {
    source[key] = value
    syncData(editObject)
  }

  const getValue = (
    fieldValue: any,
    fieldKey: string,
    sourceData: any,
    deepLevel: number,
    parentUniqueKey: string
  ) => {
    const thatType = getTypeString(fieldValue)
    switch (thatType) {
      case DataType.ARRAY:
        return (
          <ArrayView
            fieldValue={fieldValue}
            fieldKey={fieldKey}
            sourceData={sourceData}
            deepLevel={deepLevel}
            parentUniqueKey={parentUniqueKey}
            getValue={getValue}
          />
        )
      case DataType.OBJECT:
        return (
          <span>
            {renderJsonConfig(fieldValue, deepLevel + 1, parentUniqueKey)}
          </span>
        )
      case DataType.STRING:
        const currentOptions = optionsMap[fieldKey] ?? []
        return (
          <AutoComplete
            style={{ width: 100 }}
            size="small"
            options={currentOptions}
            value={fieldValue}
            onChange={(value: string) =>
              onChangeValue(value, fieldKey, sourceData)
            }
            filterOption={(inputValue, option) =>
              `${option!.value}`
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        )
      case DataType.NUMBER:
        return (
          <InputNumber
            size="small"
            style={{ width: '100px' }}
            placeholder={fieldValue}
            value={fieldValue}
            onBlur={event => {
              onChangeValue(+event.target.value, fieldKey, sourceData)
            }}
          />
        )
      case DataType.BOOLEAN:
        return (
          <Select
            size="small"
            style={{ width: '100px' }}
            defaultValue={true}
            onChange={(value: boolean) => {
              onChangeValue(value, fieldKey, sourceData)
            }}
          >
            <Select.Option value={true} label="true">
              true
            </Select.Option>
            <Select.Option value={false} label="false">
              false
            </Select.Option>
          </Select>
        )
    }
  }
  const onChangeAllow = (uniqueKey: string) => {
    allowMap[uniqueKey] = !allowMap[uniqueKey]
    setAllowMap({ ...allowMap })
  }

  const renderJsonConfig = (
    sourceData: any,
    deepLevel: number = 1,
    parentUniqueKey: string = `${deepLevel}`
  ) => {
    const keyList = Object.keys(sourceData)
    if (!keyList.length) {
      return (
        <div style={{ marginLeft: '20px' }}>
          <AddItem
            uniqueKey={'defaultKay'}
            deepLevel={deepLevel}
            sourceData={sourceData}
          />
        </div>
      )
    }
    return (
      <div className="blockContent">
        <div style={{ marginTop: '10px' }}>
          {keyList.map((fieldKey, index) => {
            const uniqueKey = `${parentUniqueKey}-${index}`
            const fieldValue = sourceData[fieldKey]
            return (
              <div key={uniqueKey} className="indexLine">
                <CollapsePart uniqueKey={uniqueKey} fieldValue={fieldValue} />
                <span className="jsonKey">
                  <Input
                    size="small"
                    style={{ width: '100px' }}
                    placeholder={fieldKey}
                    value={fieldKey}
                    onChange={event => onChangeKey(event, fieldKey, sourceData)}
                  />
                </span>
                <b>{getPlaceholder(fieldValue)}</b>
                {!allowMap[uniqueKey] && (
                  <span className="jsonValue">
                    {getValue(
                      fieldValue,
                      fieldKey,
                      sourceData,
                      deepLevel,
                      uniqueKey
                    )}
                  </span>
                )}
                <span className="toolsView">
                  {
                    <ToolsView
                      fieldValue={fieldValue}
                      fieldKey={fieldKey}
                      sourceData={sourceData}
                    />
                  }
                </span>
              </div>
            )
          })}
        </div>
        <div>
          <AddItem
            key={parentUniqueKey}
            uniqueKey={parentUniqueKey}
            deepLevel={deepLevel}
            sourceData={sourceData}
          />
        </div>
      </div>
    )
  }

  return (
    <ConfigContext.Provider
      value={{
        editObject,
        setEditObject,
        optionsMap,

        onChangeType,
        onClickDelete,
        onChangeAllow,
        allowMap,
      }}
    >
      <div className="container">{renderJsonConfig(editObject)}</div>
    </ConfigContext.Provider>
  )
}

export default JsonView
