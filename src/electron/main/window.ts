import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

export function buildDefaultOptions(preload: string, contextIsolation: boolean): BrowserWindowConstructorOptions {
  return {
    show: false,
    title: 'store',
    webPreferences: {
      preload,
      contextIsolation,
      nodeIntegration: contextIsolation,
    },
  }
}

export function createWindow(preload: string, contextIsolation: boolean): BrowserWindow {
  return new BrowserWindow(buildDefaultOptions(preload, contextIsolation))
}