/* eslint-disable no-param-reassign,no-return-assign */
import { Compare, CompareFn, defaultCompareFn } from './Utils'

export class Node<T = number> {
  key!: T

  parent?: Node<T>

  left?: Node<T>

  right?: Node<T>

  constructor(key: T, parent?: Node<T>) {
    this.key = key
    this.parent = parent
  }
}

interface Callback<T> {
  (key: T): any
}

enum TraverseType {
  Inorder,
  Preorder,
  Postorder,
}

export class BinarySearchTree<T = number> {
  root?: Node<T>

  compareFn!: CompareFn<T>

  constructor(compareFn: CompareFn<T> = defaultCompareFn) {
    this.compareFn = compareFn
  }

  insertNode(node: Node<T>, key: T): Node<T> | undefined {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left) return this.insertNode(node.left, key)
      node.left = new Node(key, node)
      return node.left
    }
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      if (node.right) return this.insertNode(node.right, key)
      node.right = new Node(key, node)
      return node.right
    }
    return undefined
  }

  /** 返回插入之后的节点 */
  insert(key: T) {
    if (!this.root) {
      this.root = new Node(key)
      return this.root
    }
    return this.insertNode(this.root, key)
  }

  insertArray(keys: T[]) {
    keys.forEach(key => {
      this.insert(key)
    })
  }

  searchNode(node: Node<T> | undefined, key: T): typeof node {
    if (!node) return node
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    }
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    }
    return node
  }

  search(key: T) {
    return this.searchNode(this.root, key)
  }

  /** 寻找以 root 为根节点的子树的最小/最大节点 */
  extremum(type: 'left' | 'right', root: Node<T>) {
    let node = root
    let nextNode
    while ((nextNode = node[type])) {
      node = nextNode
    }
    return node
  }

  min() {
    if (!this.root) return undefined
    return this.extremum('left', this.root)
  }

  max() {
    if (!this.root) return undefined
    return this.extremum('right', this.root)
  }

  remove(key: T) {
    /** 找到对应节点 node */
    const node = this.search(key)
    if (!node) return

    /** 找到以 node 为根的子树中的最小节点，将其替换到 node */
    const min = this.extremum('left', node)

    /** 替换 */
    node.key = min.key
    if (min.parent) {
      /** 移除子树的最小节点 - 将右子节点替换到节点对应的位置 */
      min.parent[min.parent.left === min ? 'left' : 'right'] = min.right
    } else {
      /** 如果最小节点没有父节点，则说明其为根节点，此时只需要将右子节点设置为根节点即可 */
      this.root = min.right
    }
  }

  traverseNode(
    node: Node<T> | undefined,
    callback: Callback<T>,
    type: TraverseType,
  ) {
    if (node) {
      if (type === TraverseType.Preorder) callback(node.key)
      this.traverseNode(node.left, callback, type)
      if (type === TraverseType.Inorder) callback(node.key)
      this.traverseNode(node.right, callback, type)
      if (type === TraverseType.Postorder) callback(node.key)
    }
  }

  inorderTraverse(callback: Callback<T>) {
    this.traverseNode(this.root, callback, TraverseType.Inorder)
  }

  preorderTraverse(callback: Callback<T>) {
    this.traverseNode(this.root, callback, TraverseType.Preorder)
  }

  postorderTraverse(callback: Callback<T>) {
    this.traverseNode(this.root, callback, TraverseType.Postorder)
  }
}
