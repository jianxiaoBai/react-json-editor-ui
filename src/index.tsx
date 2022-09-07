import 'antd/dist/antd.min.css'
import './styles/index.less'
import React, { useEffect, useState } from 'react'
import { ConfigContext } from './store'
import cloneDeep from 'lodash.clonedeep'
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
  const [editObject, setEditObject] = useState<any>(cloneDeep(props.data))
  const [optionsMap] = useState<any>(cloneDeep(props.optionsMap))
  useEffect(() => {
    props.onChange(editObject)
  }, [editObject])

  return (
    <ConfigContext.Provider
      value={{
        editObject,
        setEditObject,
        optionsMap,
      }}
    >
      <JsonView {...props}></JsonView>
    </ConfigContext.Provider>
  )
}

export default JsonEditor
