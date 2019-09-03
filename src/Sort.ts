/* eslint-disable no-param-reassign */
import { Compare, CompareFn, defaultCompareFn, swap } from './Utils'

function getMiddleIndex(arr: any[]) {
  return Math.floor(arr.length / 2)
}

function partition<T>(
  arr: T[],
  left: number,
  right: number,
  compareFn: CompareFn<T>,
) {
  const pivot = arr[Math.floor((left + right) / 2)]

  while (left <= right) {
    while (compareFn(arr[left], pivot) === Compare.LESS_THAN) {
      left += 1
    }
    while (compareFn(arr[right], pivot) === Compare.BIGGER_THAN) {
      right -= 1
    }
    if (left <= right) {
      if (compareFn(arr[left], arr[right]) !== Compare.EQUAL) {
        swap(arr, left, right)
      }
      left += 1
      right -= 1
    }
  }

  return left
}

function quick<T>(
  arr: T[],
  left: number,
  right: number,
  compareFn: CompareFn<T>,
) {
  if (arr.length > 1) {
    const index = partition<T>(arr, left, right, compareFn)
    if (index !== undefined) {
      if (index - 1 > left) {
        quick(arr, left, index - 1, compareFn)
      }
      if (index < right) {
        quick(arr, index, right, compareFn)
      }
    }
  }

  return arr
}

export function quickSort<T = number>(
  arr: T[],
  compareFn: CompareFn<T> = defaultCompareFn,
) {
  return quick(arr, 0, arr.length - 1, compareFn)
}

export function quickSort1<T = number>(
  arr: T[],
  compareFn: CompareFn<T> = defaultCompareFn,
): T[] {
  if (arr.length < 2) return arr
  if (arr.length === 2) {
    return compareFn(arr[0], arr[1]) !== Compare.BIGGER_THAN
      ? arr
      : swap(arr, 0, 1)
  }

  const pivot = arr[getMiddleIndex(arr)]

  const pointers = [0, arr.length - 1]

  do {
    while (compareFn(arr[pointers[0]], pivot) === Compare.LESS_THAN) {
      pointers[0] += 1
    }
    while (compareFn(arr[pointers[1]], pivot) === Compare.BIGGER_THAN) {
      pointers[1] -= 1
    }
    if (pointers[0] <= pointers[1]) {
      if (compareFn(arr[pointers[0]], arr[pointers[1]]) !== Compare.EQUAL) {
        swap(arr, pointers[0], pointers[1])
      }
      pointers[0] += 1
      pointers[1] -= 1
    }
  } while (pointers[0] <= pointers[1])

  return quickSort1(arr.slice(0, pointers[0]), compareFn).concat(
    quickSort1(arr.slice(pointers[0]), compareFn),
  )
}

export function BubbleSort<T = number>(
  arr: T[],
  compareFn: CompareFn = defaultCompareFn,
) {
  let i = 0
  while (i < arr.length) {
    let j = i + 1
    while (j < arr.length) {
      if (compareFn(arr[i], arr[j]) === Compare.BIGGER_THAN) swap(arr, i, j)
      j += 1
    }
    i += 1
  }
  return arr
}
