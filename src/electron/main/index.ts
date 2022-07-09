import { join } from 'path'
import { request } from 'https'
import { release } from 'os'
import { app, BrowserWindow, ipcMain, shell } from 'electron'

request('https://www.kuaidi100.com/query?type=jd&postid=JDVC14368245107123&id=1&valicode=&temp=0.8435105474707654&phone=12', resp => {
  resp.on('data', (chunk) => {
    console.log(chunk)
  })
})

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here you can add more preload scripts
const splash = join(__dirname, '../preload/splash.js')
// 🚧 Use ['ENV_NAME'] to avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

async function createWindow() {

  win = new BrowserWindow({
    show: false,
    width: 1000,
    height: 800,
    center: true,
    title: 'Store',
    hasShadow: true,
    icon: '../../../public/vite.svg',
    webPreferences: {
      webSecurity: false,
      preload: splash,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  win.menuBarVisible = false
  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../../index.html'))
  } else {
    win.loadURL(url)
  }
  win.on('ready-to-show', () => {
    win.show()
  })
  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

ipcMain.on('exit', (e, code) => {
  app.exit(code)
})
