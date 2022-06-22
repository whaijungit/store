import { OperationResult, OperationType } from '@/view/common'

class StoreServices {
  static async set<T>(key: LOCA_KEY, recrod: T): Promise<SetListResult<T>> {
    let arrList = await this.get<T>(key)
    return this.switchKeys(key, recrod, arrList)
  }
  static async get<T>(key: LOCA_KEY): Promise<T[]> {
    const result = localStorage.getItem(key)
    if (result) {
      return JSON.parse(result) as unknown as T[]
    }
    return []
  }
  static async switchKeys<T>(key: LOCA_KEY, recrod: T, arrList: T[]): Promise<SetListResult<T>> {
    let status: boolean = true
    switch (key) {
      case 'store':
        for (const item of arrList) {
          if ((item as any).series === (recrod as any).series) {
            status = false
          }
        }
        if (status) {
          arrList.push(recrod)
          localStorage.setItem('store', JSON.stringify(arrList))
        }
        break;
      case 'pop_store':
        arrList.push(recrod)
        localStorage.setItem('pop_store', JSON.stringify(arrList))
        this.updateStore(key, recrod as unknown as PopProduction)
        break;
      case 'production':
        arrList.push(recrod)
        localStorage.setItem('production', JSON.stringify(arrList))
        break
      case 'push_store':
        arrList.push(recrod)
        localStorage.setItem('push_store', JSON.stringify(arrList))
        this.updateStore(key, recrod as unknown as PushProduction)
        break;
      case 'series':
        for (const item of arrList) {
          if (item === recrod) {
            status = false
          }
        }
        if (status) {
          arrList.push(recrod)
          localStorage.setItem('series', JSON.stringify(arrList))
        }
        break;
    }
    return {
      data: arrList,
      status,
      total: arrList.length
    }
  }
  static async updateStore(key: 'pop_store' | 'push_store', recrod: PushProduction | PopProduction) {
    const storeList = await this.get<Store>('store')
    const findSeries = (series1: string, series2: string) => {

    }
    const newState = storeList.map(item => {
      if (Array.isArray(recrod.production)) {
        for (const produciton of recrod.production) {
          if (produciton.series === item.series) {
            if (key === 'pop_store') {
              item.number -= recrod.number
              item.number <= 0 ? item.number = 0 : void 0
            } else {
              item.number += recrod.number
            }
          }
        }
      } else {
        if (item.series === recrod.production.series) {
          if (key === 'pop_store') {
            item.number -= recrod.number
            item.number <= 0 ? item.number = 0 : void 0
          } else {
            item.number += recrod.number
          }
        }
      }

      return item
    })
    localStorage.setItem('store', JSON.stringify(newState))
  }
  static async filter(key: 'pop_store' | 'push_store', condition: ConditionTimer): Promise<FindResult<(PushProduction | Production)[]>> {
    const results: (PushProduction | Production)[] = []
    switch (key) {
      case 'push_store':
        const pushList = await this.get<PushProduction>('push_store')
        for (const item of pushList) {
          if (item.timer.deay >= condition.bd && item.timer.deay <= condition.ed) {
            results.push(item)
          }
        }
        break;
      case 'pop_store':
        const popList = await this.get<PushProduction>('push_store')
        for (const item of popList) {
          if (item.timer.deay >= condition.bd && item.timer.deay <= condition.ed) {
            results.push(item)
          }
        }
        break;
    }
    return {
      data: results,
      status: results.length ? true : false,
      total: results.length
    }
  }

  static async edit(key: LOCA_KEY, id: string, production: StoreProduction): Promise<OperationResult<StoreProduction>> {
    console.log(key, id, production)
    const result: OperationResult<StoreProduction> = {
      status: false,
      type: OperationType.edit,
      total: 0,
      data: []
    }
    const list = await this.get<StoreProduction>(key)

    switch (key) {
      case 'production':
        for (let product of list) {
          if (product.id === id) {
            for (const key in production) {
              product[key] = production[key]
            }
          }
        }
        result.status = true
        localStorage.setItem('production', JSON.stringify(list))
        break;
    }
    return result
  }

  static async delete(key: LOCA_KEY, recrod: StoreProduction): Promise<boolean> {
    let arrList = await this.get<StoreProduction>(key)

    if (key === 'production') {
      arrList = arrList.filter(item => item.id !== recrod.id)
      localStorage.setItem('production', JSON.stringify(arrList))
      return true
    }
    if (!arrList.length) {
      return false
    }
    return true
  }
}


export default StoreServices;