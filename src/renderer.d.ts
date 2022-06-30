declare var api: API

type API = ElectronAPI & NativeAPI

interface ElectronAPI {
  ipcRenderer: () => import('electron').IpcRenderer
  clipboard: () => import('electron').Clipboard
}

interface NativeAPI {
  fs: typeof import('fs')
  os: typeof import('os')
  path: typeof import('path')
}

interface Window {
  electronAPI: ElectronAPI
  nodeAPI: NativeAPI
}