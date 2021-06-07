/*
 * @Description: 双向链表
 * @Date: 2021-06-07 18:58:08 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-07 21:38:46 +0800
 * @LastEditors: JackChou
 */
class Node {
  constructor(data, pre, next = null) {
    this.data = data
    this.pre = null
    this.next = null
  }
}
export class DoubleLinkList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  // 添加
  append(element) {
    const node = new Node(element)
    if (this.length === 0) {
      this.head = node
    } else {
      let current = this.head
      // 查找末尾 node
      while (current.next) {
        current = current.next
      }
      current.next = node
      node.pre = current
    }
    this.tail = node
    this.length += 1
    return true
  }

  insert(element, position = this.length) {
    if (position < 0 || position > this.length) {
      return false
    }
    const node = new Node(element)
    if (this.length === 0) {
      this.head = node
      this.tail = node
    } else {
      if (position === 0) {
        // node 作为第一个节点 将其 next 指向原来的第一个节点
        node.next = this.head
        // 原来第一个节点的 pre 执行 node
        this.head.pre = node
        // node 作为第一个节点
        this.head = node
      } else if (position === this.length) {
        // 在末尾位置追加
        return this.append(element)
      } else {
        let current = this.head
        let index = 0
        // NOTE 下标从 0 开始
        while (index < position) {
          current = current.next
          index += 1
        }
        node.next = current
        current.pre.next = node
      }
    }
    this.length += 1
    return true
  }

  // 删除
  remove(element) {}
  removeAt(position) {}
  clear() {
    this.head = null
    this.length = 0
  }

  // 改
  update(position, element) {}
  // 查
  get(position) {}
  indexOf(element) {}
  /**
   * 向前遍历
   */
  forward() {}
  /**
   * 向后遍历
   */
  backward() {}

  isEmpty() {
    return this.length === 0
  }

  size() {
    return this.length
  }

  /**
   * 向前遍历,输出字符串
   */
  forwardString(separator = ',') {
    let str = ''
    let current = this.tail
    while (current) {
      str += separator + JSON.stringify(current.data)
      current = current.prev
    }
    return str === '' ? str : str.slice(1)
  }

  /**
   * 向后遍历,输出字符串
   */
  backwardSting(separator = ',') {
    let str = ''
    let current = this.head
    while (current) {
      str += separator + JSON.stringify(current.data)
      current = current.next
    }
    return str === '' ? str : str.slice(1)
  }

  toString(separator = ',') {
    return this.backwardSting(separator)
  }
}
