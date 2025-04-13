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

### Ref Methods

| method     | description                                       | params                      |
| ---------- | ------------------------------------------------- | --------------------------- |
| updateData | Update the editor data programmatically           | data: Record<string, any>   |

### Example:

```jsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import JsonEditor, { JsonEditorRef } from 'react-json-editor-ui'

const App = () => {
  const editorRef = React.useRef<JsonEditorRef>(null)
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
    others: {
      id: 1246,
      joinTime: '2017-08-20. 10:20',
      description: 'another',
    },
  })
  
  // Example of updating data programmatically using ref
  const updateEditorData = () => {
    if (editorRef.current) {
      editorRef.current.updateData({
        name: 'updated name',
        age: 25,
        // ... other properties
      })
    }
  }

  return (
    <JsonEditor
      ref={editorRef}
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

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2013-present