
import * as Koa from 'koa'
import * as mount from 'koa-mount'
import * as serve from 'koa-static'
import { resolve } from 'path'
import { IDokkitServerConfig } from '../server'
import { createPublicRouter } from './api'
import { createRendererRouter } from './renderer'

/**
 * Creates a new web server
 * @param cwd The working directory of the public files
 */
export function createWebServer (opts: IDokkitServerConfig): Koa {
    const app = new Koa()

    // router for public files
    app.use(mount(opts.publicBase, serve(resolve(opts.cwd, opts.publicDir))))
    app.use(createPublicRouter(opts).routes())

    // everything else gets sent to the app
    app.use(createRendererRouter(opts).routes())

    return app
}
