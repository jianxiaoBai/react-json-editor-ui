## React Json Edit

> React-based visual json editor.

![](/images/example.png)
## Getting Started

### Install

```
npm i react-json-editor-ui -S
```

### Props

| key        | description                                       | required | default |
| ---------- | ------------------------------------------------- | -------- | ------- |
| width      | The container width                               | false    | 500     |
| data       | The editor uses data                              | true     | null    |
| onChange   | Callback the data                                 | true     | null    |
| optionsMap | When a match for auto-complete on the input value | false    | null    |

### Example:

```jsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import JsonEditor from 'react-json-editor-ui'
import 'react-json-editor-ui/dist/react-json-editor-ui.cjs.development.css'

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
    <JsonEditor
      data={editObject}
      onChange={data => {
        setEditObject(data)
      }}
      optionsMap={{
        color: [
          { value: 'red', label: 'Red' },
          { value: 'blue', label: 'Blue' },
        ],
        city: [
          { value: 'beijing', label: 'Beijing' },
          { value: 'shanghai', label: 'Shanghai' },
        ],
      }}
    />
  )
}
export default App

```