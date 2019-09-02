/* eslint-disable no-param-reassign */
export enum Compare {
  BIGGER_THAN,
  EQUAL,
  LESS_THAN,
}

export interface CompareFn<T> {
  (a: T, b: T): Compare
}

export function defaultCompareFn(a: any, b: any) {
  if (a === b) return Compare.EQUAL
  return a - b > 0 ? Compare.BIGGER_THAN : Compare.LESS_THAN
}

export function swap(arr: any[], i1: number, i2: number) {
  const temp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = temp
  return arr
}
