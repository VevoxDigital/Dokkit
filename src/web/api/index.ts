
import { readFileSync } from 'fs'
import * as Router from 'koa-router'
import * as mime from 'mime'
import { join } from 'path'
import { IDokkitServerConfig } from '../../server'
import { registerFallbackHandler } from '../lib'

export interface IVenderModules extends Dictionary<string> {
  react: string
  ['react-dom']: string
}

/** Vendor mappings for development */
export const VENDOR_DEVELOPMENT: IVenderModules = {
  react: 'umd/react.development.js',
  ['react-dom']: 'umd/react-dom.development.js'
}

/** Vendor mappings for production */
export const VENDOR_PRODUCTION: IVenderModules = {
  react: 'umd/react.production.min.js',
  ['react-dom']: 'umd/react-dom.production.min.js'
}

/**
 * Creates a router for serving public files
 * @param opts The server config
 */
export function createPublicRouter (opts: IDokkitServerConfig): Router {

  // pre-load vendored files
  const vendored = process.env.NODE_ENV ? VENDOR_PRODUCTION : VENDOR_DEVELOPMENT
  const vendoredFiles: IDictionary<string> = { }
  for (const name of Object.keys(vendored)) {
    vendoredFiles[name] = readFileSync(join(__dirname, '../../../node_modules', name, vendored[name])).toString()
  }

  const r = new Router({ prefix: opts.publicBase })

  // vendored files
  r.get('/vendor/:id', (ctx, next) => {
    const ven = vendoredFiles[ctx.params.id]
    if (ven) {
      ctx.type = mime.getType(vendored[ctx.params.id]) || 'text/plain'
      ctx.body = ven
    } else next()
  })

  registerFallbackHandler(r)
  return r
}

/**
 * Creates a new router for the API
 * @param opts The server config
 */
export function createAPIRouter (opts: IDokkitServerConfig): Router {
  const r = new Router({ prefix: opts.apiBase })

  registerFallbackHandler(r)
  return r
}
