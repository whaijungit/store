import fs from 'fs'
import os from 'os'
import { resolve } from 'path'
import { BrowserWindow, ipcMain, ipcRenderer } from 'electron'
import { IpcRequestEventName, IpcResponseEventName } from '@/common/ipc-channle'

const createStore = async (dir: string) => {
  const staticPath = resolve(os.homedir() + dir)
  try {
    await fs.promises.mkdir(staticPath)
  } catch {
    return staticPath
  }
  return staticPath
}

export async function upload(win: BrowserWindow) {

  ipcMain.on('upload-image', async (event, data: { filename: string, extname: string, content: Buffer }) => {
    // 1. 写入文件
    const folderPath = await createStore('/.store-assets') + '/' + Date.now() + data.extname
    let filename = resolve(folderPath)
    await fs.promises.writeFile(filename, data.content)
    // 2. 写入成功触发
    win.webContents.send('upload-success', filename)
  })
}


export async function save(win: BrowserWindow) {
  ipcMain.on(IpcRequestEventName.SAVE_PRODUCTION, async (e, data) => {
    const storeage = await createStore('/store/')
    const list: any[] = []
    const productionPath = resolve(storeage, 'production.json')
    const json = await fs.promises.readFile(productionPath, 'utf-8')
    if (json) {
      const result = JSON.parse(json) as any[]
      list.push(...result, data)
    }
    else {
      list.push(data)
    }
    await fs.promises.writeFile(productionPath, JSON.stringify(list), { encoding: 'utf-8' })
    console.log(list)
    setTimeout(() => {
      ipcRenderer.send(IpcResponseEventName.SAVE_STATUS_PRODUCTION, { data: list, totla: list.length, type: '新增', item: data })
      console.log('operation success..')
    }, 1);
  })
}
