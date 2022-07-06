declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    readonly VITE_DEV_SERVER_HOST: string
    readonly VITE_DEV_SERVER_PORT: string
  }
}


declare interface StoreResult<T> {
  item?: T
  data: T[]
  type: string
  total: number
  status: boolean
  message: string
}