/*
 * @Description: 哈希表
 * @Date: 2021-06-08 21:58:57 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-10 19:31:17 +0800
 * @LastEditors: JackChou
 */
/**
 数组问题：
 1. 插入成本高
 2. 基于下标查找效率高，根据元素内容查找效率低
 3. 删除效率低

 哈希表的缺点
 1. 数据无序
 2. key不允许重复
// NOTE 哈希表如何解决冲突？
① 链地址法
② 开发地址法
// NOTE 霍纳法则

好的哈希函数的特点：
1. 快速计算hashCode
2. 能让元素分布均匀，否则查找元素效率会低
 */
export function hashFunction(str = '', size) {
  let hashCode = 0
  const strArray = [...str]
  // 霍纳法则
  strArray.forEach((_, i) => {
    hashCode = 37 * hashCode + str.charCodeAt(i)
  })
  return hashCode % size
}
export class HashTable {
  constructor() {
    this.storage = []
    // 哈希表的元素个数
    this.count = 0
    // loadFactor>=0.75, 对数组进行扩容
    // loadFactor < 0.25 缩容
    this.limit = 7
  }

  /**
   * 添加或者修改
   * @param {string} key 健
   * @param {any} value 值
   * @returns {boolean} true | false
   */
  put(key, value) {
    const index = hashFunction(key, this.limit)
    // 哈希在此用到
    const _bucket = this.storage[index]
    if (!_bucket) {
      // 使用链地址发解决冲突
      // bucket = []
      this.storage[index] = []
    }
    const bucket = this.storage[index]
    let i = 0
    let changed = false
    while (i < bucket.length) {
      const item = bucket[i]
      const [_key] = item
      if (_key === key) {
        item[1] = value
        changed = true
        break
      }
      i += 1
    }
    if (changed) return true
    //  添加操作
    bucket.push([key, value])
    // 元素加一
    this.count += 1
    return true
  }

  /**
   * 删除元素
   * @param {string} key 键
   * @returns {boolean} true | false
   */
  remove(key) {
    const index = hashFunction(key, this.limit)
    const bucket = this.storage[index]
    if (!bucket || bucket.length === 0) return false
    let i = 0
    let removed = false
    while (i < bucket.length) {
      if (key === bucket[i][0]) {
        bucket.splice(i, 1)
        removed = true
        break
      }
      i += 1
    }
    if (removed) this.count -= 1
    return removed
  }

  clear() {
    this.storage = []
    this.count = 0
    return true
  }

  /**
   * 获取元素
   * @param {string} key 键
   */
  get(key) {
    const index = hashFunction(key, this.limit)
    const bucket = this.storage[index]
    // 没有元素
    if (!bucket || bucket.length === 0) return null
    // 线性查询
    const result = bucket.find(item => {
      const [_key] = item
      if (_key === key) return true
    })
    return result[1] ?? null
  }

  /**
   * 是否为空
   * @returns {boolean} true | false
   */
  isEmpty() {
    return this.count === 0
  }

  size() {
    return this.count
  }
}
