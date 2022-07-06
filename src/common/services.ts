import os from 'os'
import path from 'path'
import { promises } from 'fs'

let success = true

export async function getAssetsDir() {
  const store = path.resolve(os.homedir() + '/store/');
  const images = path.resolve(store + '/images/');
  await (async () => {
    try {
      if (success) {
        promises.mkdir(store)
        promises.mkdir(images)
      }
      success = false
      return true
    } catch (error) {
      return false
    }
  })()
  return {
    store,
    images
  }
}

export async function writeImage(filename: string): Promise<void> {
  const extname = path.extname(filename)
  const images = await getAssetsDir().then(assets => assets.images)
  const buffer = await promises.readFile(filename)
  await promises.writeFile(path.resolve(images + '/') + Date.now() + extname, buffer)
}

async function getContent<T>(filename: string): Promise<T[]> {
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

export async function saveProduction(production: Production): Promise<boolean> {
  const filename = await getAssetsDir().then(assets => assets.store + '/production.json')
  const productions = await getContent<Production>(filename)
  productions.push(production)
  await promises.writeFile(filename, JSON.stringify(productions))
  return true
}

export async function getProduction(): Promise<Production[]> {
  const filename = await getAssetsDir().then(assets => assets.store + '/production.json')
  return await getContent<Production>(filename)
}

export async function removeProduction(id: string) {
  const filename = await getAssetsDir().then(assets => assets.store + '/production.json')
  let productions = await getContent<Production>(filename)
  const item = productions.find(item => item.id === id)!
  if (productions.length) {
    productions = productions.filter(pro => pro.id !== id)
    await promises.writeFile(filename, JSON.stringify(productions))
    await promises.unlink(item.poster)
  }
  return true
}

export async function removeProductions(productions: Production[]) {
  const filename = await getAssetsDir().then(assets => assets.store + '/production.json')
  let list = await getContent<Production>(filename)
  for (const production of list) {
    for (const item of productions) {
      if (item.id === production.id) {
        await removeProduction(item.id)
      }
    }
  }
  return true
}