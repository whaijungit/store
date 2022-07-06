import { join } from 'path'

export const filename = join(__dirname, '../../index.html')
export const splash = join(__dirname, '../preload/splash.js')

// development
export const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
