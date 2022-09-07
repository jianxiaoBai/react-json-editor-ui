## React Json Edit

React-based visual json editor.

## Getting Started

### Install

```
npm i react-json-editor-ui -S
```

### Props

|key|description|
|--|--|
|data|The editor uses data|
|onChange|Callback the data|
|optionsMap|When a match for auto-complete on the input value|

### Example:

```jsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import JsonEditor from 'react-json-edit'

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

```