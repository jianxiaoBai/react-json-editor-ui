import 'react-app-polyfill/ie11'
import 'react-json-syntax-highlighter/dist/ReactJsonSyntaxHighlighter.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter'

import JsonEditor from '../'

const App = () => {
  const [editObject, setEditObject] = React.useState<any>({
    name: 'may',
    age: null,
    address: [
      'Panyu Shiqiao on Canton',
      'Tianhe',
      {
        city: 'forida meta 11',
      },
    ],
    ohters: {
      id: 1246,
      joinTime: '2017-08-20. 10:20',
      description: 'another',
    },
  })

  return (
    <div>
      {/* <h1 style={{ textAlign: 'center', padding: '50px 0' }}>
        React Json Edit
      </h1> */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: '550px',
            padding: '10px',
            marginRight: '2px',
            boxShadow: '0px 0px 10px #eee',
            borderRadius: '2px',
          }}
        >
          <JsonEditor
            data={editObject}
            onChange={data => {
              setEditObject(data)
            }}
            optionsMap={{
              text: [
                { value: 'light', label: 'Light' },
                { value: 'bamboo', label: 'Bamboo' },
              ],
            }}
          />
        </div>
        <div
          style={{
            width: '550px',
            padding: '10px',
            marginLeft: '2px',
            boxShadow: '0px 0px 10px #eee',
            borderRadius: '2px',
          }}
        >
          <ReactJsonSyntaxHighlighter obj={editObject} />
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
