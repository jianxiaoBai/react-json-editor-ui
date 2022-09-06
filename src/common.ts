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
