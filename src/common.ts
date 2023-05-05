export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
}

export const typeMap: Record<DataType, any> = {
  [DataType.STRING]: '',
  [DataType.BOOLEAN]: true,
  [DataType.NUMBER]: 0,
  [DataType.OBJECT]: {},
  [DataType.ARRAY]: [],
}

export const getTypeString = (element: any): string => {
  return Object.prototype.toString
    .call(element)
    .match(/\w+/g)?.[1]
    .toLowerCase() as string
}

const setNewValue: any = (
  keys: string[],
  obj: any,
  newElement: any,
) => {
  const index: any = keys.shift()
  const objKeys: string[] = Object.keys(obj)
  if (keys.length) {
    return setNewValue(keys, obj[objKeys[index]], newElement)
  }
  obj[objKeys[index]] = newElement
}

export const getQuoteAddress = (
         newElement: any,
         uniqueKey: string,
         currentData: {
           [keyof: string]: any
         },
) => {
  // because first index is root index, don't find it.
  const indexKeys = uniqueKey.split('-').slice(1)
  setNewValue(indexKeys, currentData, newElement, currentData)
  return currentData
}

export const isObject = (value: any) => {
  return value && typeof value === 'object'
}

export const getPlaceholder = (value: any) => {
  if (!isObject(value)) return null
  const currentType = getTypeString(value)
  if (currentType === DataType.ARRAY) {
    return `Array [${value.length}]`
  } else {
    return `Object {${Object.keys(value).length}}`
  }
}
