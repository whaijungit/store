import os from 'os'
import path from 'path'
import { promises } from 'fs'

let success = true

class ProductionServices {
  static dir = {
    store: path.resolve(os.homedir() + '/store/'),
    images: path.resolve(os.homedir() + '/images/')
  }
  static async createDir() {
    if (success === false) return
    try {
      await promises.mkdir(this.dir.store)
      await promises.mkdir(this.dir.images)
      success = false
    } catch (error) { }
  }
  static get filename() {
    return path.resolve(this.dir.store + '/production.json')
  }
  static async writeImage(filename: string): Promise<string> {
    const extname = path.extname(filename)
    const images = path.resolve(this.dir.images)
    const buffer = await promises.readFile(filename)
    console.log(images)
    const filenamePath = images + '/' + Date.now() + extname
    console.log(filenamePath)
    await promises.writeFile(filenamePath, buffer)
    return filenamePath
  }
  static async getContent<T>(filename: string): Promise<T[]> {
    let list: T[] = []
    try {
      const content = await promises.readFile(filename, 'utf8')
      list = JSON.parse(content)
    } catch (error) {
    }
    finally {
      return list
    }
  }
  static async save(production: Production): Promise<boolean> {
    const productions = await this.fetch()
    productions.push(production)
    await promises.writeFile(this.filename, JSON.stringify(productions))
    return true
  }
  static async remove(id: string) {
    let productions = await this.fetch()
    const item = productions.find(item => item.id === id)!
    if (productions.length) {
      productions = productions.filter(pro => pro.id !== id)
      await promises.writeFile(this.filename, JSON.stringify(productions))
      await promises.unlink(item.poster)
    }
    return true
  }
  static async fetch(): Promise<Production[]> {
    return await this.getContent<Production>(this.filename)
  }
  static async removes(productions: Production[]) {
    let list = await this.fetch()
    for (const production of list) {
      for (const item of productions) {
        if (item.id === production.id) {
          await this.remove(item.id)
        }
      }
    }
    return true
  }
  static async edit(filename: string, id: string, newState: Production) {
    let list = await this.fetch()
    const result = list.find(item => item.id == id)
    if (result) {
      newState = { ...result, ...newState, id: result.id }
      list = list.map((item) => {
        if (item.id === id) {
          item = newState
        }
        return item
      })
      await promises.writeFile(this.filename, JSON.stringify(list), 'utf-8')
      if (!(filename === newState.poster)) {
        await promises.unlink(filename)
      }
      return true
    }
    return false
  }
}

ProductionServices.createDir()

export default ProductionServices