import './ui/styles.css'
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
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

export type JsonEditorRef = {
  updateData: (data: Record<string, any>) => void
}

const JsonEditor = forwardRef<JsonEditorRef, JsonEditorProps>((props, ref) => {
  const [editObject, setEditObject] = useState<any>(JSON.parse(JSON.stringify(props.data)))
  
  useEffect(() => {
      props.onChange(editObject)
  }, [editObject])

  useImperativeHandle(ref, () => ({
    updateData: (data: Record<string, any>) => {
      setEditObject(JSON.parse(JSON.stringify(data)))
    }
  }))

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
})

export default JsonEditor
