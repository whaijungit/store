
enum OperationType {
  add = '新增',
  init = 'init',
  edit = '编辑',
  delete = '删除',
}
interface Operation<T> {
  /**
   * 操作类型
   */
  type: OperationType
  /**
   * 操作是否成功
   */
  status: boolean
  /**
   * 当前以存储的数据
   */
  data: T[]
  /**
   * 数据总量
   */
  /**
   * 操作是否成功
   */
  message: string
  /**
   * 当前操作的项
   */
  item: T | T[]
}

const result: Operation<any> = {
  data: [],
  message: '',
  status: false,
  item: undefined,
  type: OperationType.init,
}

class Store {
  /**
   * 设置一个键 存储这个对象到这个键里面
   * @param key 键
   * @param item 存储的对象
   * @returns {StoreList<Operation<T>>}
   */
  static async set<T>(key: LOCA_KEY, item: T): Promise<Operation<T>> {
    let arrList = await this.get<T>(key)
    switch (key) {
      case 'production':
        arrList.push(item)
        result.type = OperationType.add
        result.item = item
        return await this.save('production', arrList)
      case 'pop_store':
        arrList.push(item)
        result.type = OperationType.add
        result.item = item
        return this.save('pop_store', arrList)
      case 'push_store':
        result.type = OperationType.add
        result.item = item
        return await this.save('push_store', arrList)

      case 'store':
        result.type = OperationType.add
        result.item = item
        return await this.save('store', arrList)
      default:
        return result
    }
  }
  /**
   * 保存到本地locaStorage
   * @param key 键
   * @param list 当前键的集合
   * @returns {StoreList<Operation<T>>}
   */
  static async save<T>(key: LOCA_KEY, list: T[]): Promise<Operation<T>> {
    try {
      localStorage.setItem(key, JSON.stringify(list))
      result.data = list
      result.status = true
    }
    catch (err) {
      result.status = false
      result.message = 'stackoverflow'
    }
    return result
  }
  /**
   * 给定一个本地存储的键得到该数据的数组
   * @param key 键
   * @returns {Promise<T[]>}
   */
  static async get<T>(key: LOCA_KEY): Promise<T[]> {
    let list = localStorage.getItem(key)
    if (list) {
      return JSON.parse(list) as T[]
    }
    return []
  }

  static async delete<T>(prop: keyof T, key: LOCA_KEY, item: T | T[]): Promise<Operation<T>> {
    let list = await this.get<T>(key)
    if (Array.isArray(item)) {
      for (const production of list) {
        for (const itemProduction of item) {
          if (itemProduction[prop] === production[prop]) {
            list = list.filter(item => item[prop] !== production[prop])
            result.item = item
            result.type = OperationType.delete
          }
        }
      }
    }
    else {
      list = list.filter(production => production[prop] !== item[prop])
      result.item = item
      result.type = OperationType.delete
    }
    await this.save(key, list)
    return result
  }
  static async edit<T>(key: LOCA_KEY, id: keyof T, item: T): Promise<Operation<T>> {
    const list = await this.get<T>(key)
    for (const production of list) {
      if ((production as any)[id] === id) {
        result.status = true
        result.item = item
        for (const key in item) {
          production[key] = item[key]
        }
      }
    }
    await this.save<T>(key, list)
    return result
  }
}

export default Store