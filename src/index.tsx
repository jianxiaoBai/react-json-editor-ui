import './styles/index.less'
import './ui/styles.css'
import React, { useEffect, useState } from 'react'
import JsonView from './components/JsonView'

export type JsonEditorProps = {
  width?: number | string
  data: Record<string, any>
  optionsMap?: Record<
    string,
    Array<{
      value: string
      label?: string
    }>
  >
  onChange: (data: any) => void
}

function JsonEditor(props: JsonEditorProps) {
  const [editObject, setEditObject] = useState<any>(JSON.parse(JSON.stringify(props.data)))
  useEffect(() => {
    props.onChange(editObject)
  }, [editObject])

  return (
    <div className="jsonEditorContainer" style={{ width: props.width ?? 500 }}>
      <JsonView
        {...{
          editObject,
          setEditObject,
          optionsMap: props.optionsMap,
        }}
      />
    </div>
  )
}

export default JsonEditor
