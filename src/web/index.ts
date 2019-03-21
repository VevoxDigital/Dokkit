
import 'colors'
import * as Koa from 'koa'
import * as mount from 'koa-mount'
import * as serve from 'koa-static'
import { resolve } from 'path'
import { logger } from '../logger'
import { IDokkitServerConfig } from '../server'
import { createPublicRouter } from './api'
import { createRendererRouter } from './renderer'

const LOG = logger('web')

/**
 * Creates a new web server
 * @param cwd The working directory of the public files
 */
export function createWebServer (opts: IDokkitServerConfig): Koa {
  const app = new Koa()

  app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start

    let status = '' + ctx.status
    const statusGroup = Math.floor(ctx.status / 100)
    switch (statusGroup) {
      case 1:
      case 3:
        status = status.cyan
        break
      case 2:
        status = status.green
        break
      case 4:
        status = status.yellow
        break
      case 5:
        status = status.red
        break
    }
    LOG.debug('%s %s: [%s]%s - %dms', ctx.method, status, ctx.type, ctx.url, ms)
  })

    // router for public files
  app.use(mount(opts.publicBase, serve(resolve(opts.cwd, opts.publicDir))))
  app.use(createPublicRouter(opts).routes())

    // everything else gets sent to the app
  app.use(createRendererRouter(opts).routes())

  return app
}
