import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import JsonEditor from '../.';
// import './reset.css';
const App = () => {
  const [editObject, setEditObject] = React.useState<any>({
    field: 'assignee',
    list: [1, 2, 3],
    from: {
      name: 'zhangsan',
      type: 'crazy person',
    },
    tmpFromAccountId: null,
  });

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: '550px',
            border: '1px solid black',
            padding: '10px',
          }}
        >
          <JsonEditor
            data={editObject}
            onChange={data => {
              setEditObject(data);
            }}
          />
        </div>
        <div
          style={{
            width: '600px',
            border: '1px solid black',
            padding: '10px',
          }}
        >
          <pre>{JSON.stringify(editObject, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
