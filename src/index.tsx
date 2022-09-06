import 'antd/dist/antd.min.css'
import './assets/styles/index.less'
import React, { useEffect, useState } from 'react'
import { ConfigContext } from './store'
import cloneDeep from 'lodash.clonedeep'
import JsonView from './JsonView'

export type JsonEditorProps = {
  data: Record<string, any>
  onChange: (data: any) => void
}

function JsonEditor(props: JsonEditorProps) {
  const [editObject, setEditObject] = useState<any>(cloneDeep(props.data))
  useEffect(() => {
    props.onChange(editObject)
  }, [editObject])

  return (
    <ConfigContext.Provider
      value={{
        editObject,
        setEditObject,
      }}
    >
      <JsonView {...props}></JsonView>
    </ConfigContext.Provider>
  )
}

export default JsonEditor
