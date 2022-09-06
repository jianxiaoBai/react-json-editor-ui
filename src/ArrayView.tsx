import React from 'react';
import AddItem from './AddItem';
import ToolsView from './Tools';
function ArrayView(props: {
  fieldValue: any[];
  fieldKey: string;
  sourceData: any;
  getValue: any;
  deepLevel: number;
  deepLevelJoin: string;
}) {
  return (
    <div className="blockContent">
      <div style={{ marginTop: '10px' }}>
        {props.fieldValue.map((item: any, index: number) => {
          const uniqueKey = `${props.deepLevelJoin}-${index}`;
          return (
            <div className="indexLine" key={uniqueKey}>
              <span style={{ marginRight: '5px' }}>{index + 1}.</span>
              {props.getValue(
                item,
                index,
                props.fieldValue,
                props.deepLevel + 1,
                uniqueKey
              )}
              {
                <ToolsView
                  fieldValue={item}
                  fieldKey={`${index}`}
                  sourceData={props.fieldValue}
                />
              }
            </div>
          );
        })}
      </div>
      <div>
        <AddItem
          key={props.deepLevelJoin}
          uniqueKey={props.deepLevelJoin}
          deepLevel={props.deepLevel}
          sourceData={props.fieldValue}
        />
      </div>
    </div>
  );
}
export default ArrayView;
