
import * as express from 'express'
import { readFileSync } from 'fs'
import * as mime from 'mime'
import { join, resolve } from 'path'
import { IWebServerOptions } from '..'

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
 * @param opts The web server options
 */
export function createPublicRouter (opts: IWebServerOptions): express.Router {

  // pre-load vendored files
  const vendored = process.env.NODE_ENV ? VENDOR_PRODUCTION : VENDOR_DEVELOPMENT
  const vendoredFiles: IDictionary<string> = { }
  for (const name of Object.keys(vendored)) {
    vendoredFiles[name] = readFileSync(join(__dirname, '../../../node_modules', name, vendored[name])).toString()
  }

  const r = express.Router()

  // static files
  r.use(express.static(resolve(opts.cwd, opts.publicDir)))

  // vendored files
  r.get('/vendor/:id', (req, res, next) => {
    const ven = vendoredFiles[req.params.id]
    if (ven) res.type(mime.getType(vendored[req.params.id]) || 'text/plain').send(ven)
    else next()
  })

  // else fails, 404
  r.use((_req, res) => res.status(404).send(''))
  return r
}

export function createAPIRouter (_opts: IWebServerOptions): express.Router {
  const r = express.Router()

  r.use((_req, res) => res.status(404).send(''))
  return r
}
