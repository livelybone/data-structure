import { BinarySearchTree, Node } from './BinarySearchTree'
import { CompareFn, defaultCompareFn } from './Utils'

enum BlanceFator {
  UnbalancedLeft,
  SlightlyUnbalancedLeft,
  Balanced,
  SlightlyUnbalancedRight,
  UnbalancedRight,
}

export class AVLTree<T> extends BinarySearchTree<T> {
  constructor(compareFn: CompareFn<T> = defaultCompareFn) {
    super(compareFn)
  }

  getNodeHeight(node: Node<T> | undefined): number {
    if (!node) return 0
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    )
  }

  getBlanceFactor(node: Node<T>): BlanceFator {
    const leftHeight = this.getNodeHeight(node.left)
    const rightHeight = this.getNodeHeight(node.right)
    const diffHeight = leftHeight - rightHeight
    if (diffHeight >= 2) return BlanceFator.UnbalancedLeft
    if (diffHeight === 1) return BlanceFator.SlightlyUnbalancedLeft
    if (diffHeight === 0) return BlanceFator.Balanced
    if (diffHeight === -1) return BlanceFator.SlightlyUnbalancedRight
    return BlanceFator.SlightlyUnbalancedRight
  }

  getGrandParent(node: Node<T>) {
    return node.parent && node.parent.parent
  }

  // @ts-ignore
  insert(key: T) {
    const node = super.insert(key)
    if (node) {
      const grandParent = this.getGrandParent(node)
      if (grandParent) {
        // eslint-disable-next-line no-empty
        if (this.getBlanceFactor(grandParent) === BlanceFator.UnbalancedLeft) {
        }
      }
    }
  }
}
