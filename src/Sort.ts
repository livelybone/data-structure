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
  const pivot = arr[getMiddleIndex(arr)]

  const pointers = { left, right }
  while (pointers.left <= pointers.right) {
    while (compareFn(arr[pointers.left], pivot) !== Compare.BIGGER_THAN) {
      pointers.left += 1
    }
    while (compareFn(arr[pointers.right], pivot) !== Compare.LESS_THAN) {
      pointers.right -= 1
    }
    if (pointers.left < pointers.right) {
      swap(arr, pointers.left, pointers.right)
      pointers.left += 1
      pointers.right -= 1
    }
  }

  if (pointers.left > right) {
    return undefined
  }
  return pointers.left
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

export function quickSort1<T = number>(
  arr: T[],
  compareFn: CompareFn<T> = defaultCompareFn,
) {
  return quick(arr, 0, arr.length - 1, compareFn)
}

export function quickSort<T = number>(
  arr: T[],
  compareFn: CompareFn<T> = defaultCompareFn,
): T[] {
  if (arr.length < 2) return arr
  if (arr.length === 2) {
    return compareFn(arr[0], arr[1]) === Compare.LESS_THAN
      ? arr
      : swap(arr, 0, 1)
  }

  const pivot = arr[getMiddleIndex(arr)]

  const pointers = [0, arr.length - 1]

  do {
    for (; pointers[0] <= pointers[1]; pointers[0] += 1) {
      if (compareFn(arr[pointers[0]], pivot) !== Compare.LESS_THAN) break
    }
    for (; pointers[1] >= pointers[0]; pointers[1] -= 1) {
      if (compareFn(arr[pointers[1]], pivot) !== Compare.BIGGER_THAN) break
    }
    if (pointers[0] < pointers[1]) {
      swap(arr, pointers[0], pointers[1])
      pointers[0] += 1
      pointers[1] -= 1
    }
  } while (pointers[0] <= pointers[1])

  if (pointers[0] >= arr.length || pointers[1] < 0) {
    return arr
  }

  return [
    ...quickSort(arr.slice(0, pointers[0]), compareFn),
    ...quickSort(arr.slice(pointers[0]), compareFn),
  ]
}
