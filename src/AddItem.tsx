import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Col, Input, Select, Space } from 'antd';
import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import { useContext, useState } from 'react';
import { ConfigContext } from './store';
import { typeList, typeMap } from './util';
import Aaa from './assets/styles/index.less';
const AddItem = (props: {
  uniqueKey: string;
  sourceData: any;
  deepLevel: number;
}) => {
  const { setEditObject, editObject } = useContext(ConfigContext);
  const { uniqueKey, sourceData } = props;
  const isArray = Array.isArray(sourceData);
  const [templateData, setTemplateData] = useState<any>({});
  const [showIncreaseMap, setShowIncreaseMap] = useState<any>({});
  const onClickIncrease = (key: string, value: boolean) => {
    showIncreaseMap[key] = value;
    templateData[key] = {};
    setTemplateData({
      ...templateData,
    });
    setShowIncreaseMap({
      ...showIncreaseMap,
    });
  };
  const changeInputKey = (uniqueKey: string, event: any) => {
    templateData[uniqueKey]['key'] = event.target.value;
    setTemplateData({ ...templateData });
  };
  const changeInputValue = (uniqueKey: string, event: any) => {
    templateData[uniqueKey]['value'] = event.target.value;
    setTemplateData({ ...templateData });
  };
  const onChangeTempType = (uniqueKey: any, type: any) => {
    templateData[uniqueKey]['type'] = type;
    templateData[uniqueKey]['value'] = typeMap[type];
    setTemplateData({
      ...templateData,
    });
  };
  const onConfirmIncrease = (uniqueKey: any, sourceData: any) => {
    const { key: aKey, value } = cloneDeep(templateData[uniqueKey]);
    if (isArray) {
      sourceData.push(value);
    } else {
      sourceData[aKey] = value;
    }
    setEditObject({ ...editObject });
    onClickIncrease(uniqueKey, false);
  };
  return (
    <div className={Aaa.addItem} key={uniqueKey}>
      {showIncreaseMap[uniqueKey] ? (
        <Space>
          {!isArray && (
            <div>
              <Input
                style={{ width: '100px' }}
                onChange={event => changeInputKey(uniqueKey, event)}
              ></Input>
            </div>
          )}
          <div>
            <Select
              style={{ width: '100px' }}
              onChange={value => onChangeTempType(uniqueKey, value)}
              defaultValue={'string'}
            >
              {typeList.map(item => (
                <Select.Option
                  value={item}
                  key={item}
                  style={{ width: '100px' }}
                >
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          {!['object', 'array'].includes(templateData[uniqueKey]['type']) && (
            <div>
              <Input
                style={{ width: '100px' }}
                onChange={event => changeInputValue(uniqueKey, event)}
              ></Input>
            </div>
          )}
          <div>
            <Space>
              <Button
                size="small"
                type="primary"
                onClick={() => onConfirmIncrease(uniqueKey, sourceData)}
              >
                Confirm
              </Button>
              <Button
                size="small"
                onClick={() => onClickIncrease(uniqueKey, false)}
              >
                Cancel
              </Button>
            </Space>
          </div>
        </Space>
      ) : (
        <Col span={8}>
          <PlusSquareOutlined
            style={{ color: '#1E88E5' }}
            onClick={() => onClickIncrease(uniqueKey, true)}
          />
        </Col>
      )}
    </div>
  );
};
export default AddItem;
