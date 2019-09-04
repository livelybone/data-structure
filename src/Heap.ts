import { Compare, CompareFn, defaultCompareFn, swap } from './Utils'

export class MinHeap<T = number> {
  readonly compareFn: CompareFn<T>

  readonly heap: T[] = []

  constructor(compareFn: CompareFn<T>) {
    this.compareFn = compareFn || defaultCompareFn
  }

  getLeftChildIndex(index: number) {
    const i = 2 * index + 1
    if (i >= this.heap.length) return undefined
    return i
  }

  getRightChildIndex(index: number) {
    const i = 2 * index + 2
    if (i >= this.heap.length) return undefined
    return i
  }

  getParentIndex(index: number) {
    if (index === 0) return undefined
    return Math.floor((index - 1) / 2)
  }

  swap(i1: number, i2: number) {
    swap(this.heap, i1, i2)
  }

  insert(val: T) {
    this.heap.push(val)
    let index = this.heap.length - 1
    let parentIndex

    // If parentIndex is not equal to undefined and val is not less than parent value
    // swap position of val and it's parent
    while ((parentIndex = this.getParentIndex(index)) !== undefined) {
      if (this.compareFn(val, this.heap[parentIndex]) === Compare.LESS_THAN) {
        this.swap(index, parentIndex)
        index = parentIndex
      } else break
    }
    return this.heap
  }

  getMinValue() {
    return this.heap[0]
  }

  extract(index: number = 0) {
    const min = this.heap[index]
    const leftIndex = this.getLeftChildIndex(index)
    const rightIndex = this.getRightChildIndex(index)
    if (leftIndex && rightIndex) {
      if (
        this.compareFn(this.heap[leftIndex], this.heap[rightIndex]) ===
        Compare.LESS_THAN
      ) {
        this.heap[index] = this.extract(leftIndex)
      } else {
        this.heap[index] = this.extract(rightIndex)
      }
    } else if (leftIndex) {
      this.heap[index] = this.extract(leftIndex)
    } else if (rightIndex) {
      this.heap[index] = this.extract(rightIndex)
    } else {
      this.heap.splice(index, 1)
    }
    return min
  }

  buildWithArray(arr: T[]) {
    arr.forEach(val => this.insert(val))
    return this.heap
  }

  sort(arr: T[]) {
    this.buildWithArray(arr)
    console.log('heap', this.heap)
    return arr.reduce((ar: T[]) => {
      ar.push(this.extract())
      return ar
    }, [])
  }
}
