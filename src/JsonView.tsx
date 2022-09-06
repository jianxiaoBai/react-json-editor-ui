import { Input, InputNumber, Select } from 'antd';
import React, { useContext, useEffect } from 'react';
import { getQuoteAddress, getTypeString, typeMap } from './util';
import AddItem from './AddItem';
import { ConfigContext } from './store';
import { JsonEditorProps } from '.';
import ArrayView from './ArrayView';
import ToolsView from './Tools';
import Aaa from './assets/styles/index.less';
function JsonView(props: JsonEditorProps) {
  const { editObject, setEditObject } = useContext(ConfigContext);

  useEffect(() => {
    props.onChange(editObject);
  }, [editObject]);

  const syncData = (data: Record<string, any>) => {
    setEditObject({ ...data });
  };

  const onClickDelete = (key: string, sourceData: any) => {
    if (Array.isArray(sourceData)) {
      sourceData.splice(+key, 1);
    } else {
      Reflect.deleteProperty(sourceData, key);
    }
    syncData(editObject);
  };

  const onChangeType = (type: string, fieldValue: any) => {
    const newEditObject = getQuoteAddress(
      fieldValue,
      typeMap[type],
      editObject
    );
    syncData(newEditObject);
  };

  const onChangeKey = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentKey: string,
    source: Record<string, any>
  ) => {
    const newValue: Record<string, any> = {};
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (key === currentKey) {
          newValue[event.target.value] = source[key];
        } else {
          newValue[key] = source[key];
        }
      }
    }
    const newTotalData = getQuoteAddress(source, newValue, editObject);
    syncData(newTotalData);
  };

  const onChangeValue = (
    value: any,
    key: string,
    source: Record<string, any>
  ) => {
    source[key] = value;
    syncData(editObject);
  };

  const getValue = (
    fieldValue: any,
    fieldKey: string,
    sourceData: any,
    deepLevel: number,
    deepLevelJoin: string
  ) => {
    const thatType = getTypeString(fieldValue);
    switch (thatType) {
      case 'array':
        return (
          <span style={{ marginBottom: '10px' }}>
            <b>Array[{fieldValue.length}]:</b>
            <ArrayView
              fieldValue={fieldValue}
              fieldKey={fieldKey}
              sourceData={sourceData}
              deepLevel={deepLevel}
              deepLevelJoin={deepLevelJoin}
              getValue={getValue}
            />
          </span>
        );
      case 'object':
        return (
          <span style={{ marginBottom: '10px' }}>
            <b>Object{`{${Object.keys(fieldValue).length}}`}:</b>
            {renderJsonConfig(fieldValue, deepLevel + 1, deepLevelJoin)}
          </span>
        );
      case 'string':
        return (
          <Input
            style={{ width: '100px' }}
            placeholder={fieldValue}
            value={fieldValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeValue(event.target.value, fieldKey, sourceData)
            }
          />
        );
      case 'null':
      case 'number':
        return (
          <InputNumber
            style={{ width: '100px' }}
            placeholder={fieldValue}
            value={fieldValue}
            onChange={(value: number) => {
              onChangeValue(value, fieldKey, sourceData);
            }}
          />
        );
      case 'boolean':
        return (
          <Select
            style={{ width: '100px' }}
            defaultValue={true}
            onChange={(value: boolean) => {
              onChangeValue(value, fieldKey, sourceData);
            }}
          >
            <Select.Option value={true} label="true">
              true
            </Select.Option>
            <Select.Option value={false} label="false">
              false
            </Select.Option>
          </Select>
        );
    }
  };
  const renderJsonConfig = (
    sourceData: any,
    deepLevel: number = 0,
    deepLevelJoin: string = `${deepLevel}`
  ) => {
    const keyList = Object.keys(sourceData);
    if (!keyList.length) {
      return (
        <div style={{ marginLeft: '20px' }}>
          <AddItem
            uniqueKey={'defaultKay'}
            deepLevel={deepLevel}
            sourceData={sourceData}
          />
        </div>
      );
    }
    return (
      <div className={Aaa.blockContent}>
        <div style={{ marginTop: '10px' }}>
          {keyList.map((fieldKey, index) => {
            const uniqueKey = `${deepLevelJoin}-${index}`;
            const fieldValue = sourceData[fieldKey];
            return (
              <div key={uniqueKey} className={Aaa.indexLine}>
                <span className={Aaa.jsonKey}>
                  <Input
                    style={{ width: '100px' }}
                    placeholder={fieldKey}
                    value={fieldKey}
                    onChange={event => onChangeKey(event, fieldKey, sourceData)}
                  />
                </span>
                <span className={Aaa.jsonValue}>
                  {getValue(
                    fieldValue,
                    fieldKey,
                    sourceData,
                    deepLevel,
                    deepLevelJoin
                  )}
                </span>
                <span className={Aaa.toolsView}>
                  {
                    <ToolsView
                      fieldValue={fieldValue}
                      fieldKey={fieldKey}
                      sourceData={sourceData}
                    />
                  }
                </span>
              </div>
            );
          })}
        </div>
        <div>
          <AddItem
            key={deepLevelJoin}
            uniqueKey={deepLevelJoin}
            deepLevel={deepLevel}
            sourceData={sourceData}
          />
        </div>
      </div>
    );
  };

  return (
    <ConfigContext.Provider
      value={{
        editObject,
        setEditObject,
        onChangeType,
        onClickDelete,
      }}
    >
      <div>{renderJsonConfig(editObject)}</div>
    </ConfigContext.Provider>
  );
}

export default JsonView;
