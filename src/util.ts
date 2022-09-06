export const getQuoteAddress = (
  oldElement: any,
  newElement: any,
  currentData: {
    [keyof: string]: any
  }
) => {
  if (oldElement === currentData) {
    return newElement
  }
  for (const key in currentData) {
    if (Object.prototype.hasOwnProperty.call(currentData, key)) {
      const element = currentData[key]
      if (oldElement === element) {
        currentData[key] = newElement
      } else if (typeof element === 'object' && element) {
        getQuoteAddress(oldElement, newElement, element)
      }
    }
  }
  return currentData
}

export const typeList: string[] = [
  'string',
  'number',
  'boolean',
  'object',
  'array',
]

export const typeMap: { [keyof: string]: any } = {
  string: '',
  boolean: true,
  number: 0,
  object: {},
  array: [],
}

export const getTypeString = (element: any) => {
  return (
    Object.prototype.toString
      .call(element)
      .match(/\w+/g)?.[1]
      .toLowerCase() ?? ''
  )
}
