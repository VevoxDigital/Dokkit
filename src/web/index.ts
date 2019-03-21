
import * as express from 'express'
import { resolve } from 'path'
import { createAPIRouter, createStaticRouter } from './api'
import { createRendererRouter } from './renderer'

export interface IWebServerOptions {
    /** The base path for the API  */
    apiBase: string

    /** The working directory of the server */
    cwd: string

    /** The base path for static assets */
    publicBase: string

    /** The directory where static assets are found. If relative, resolved from {@link publicDir} */
    publicDir: string

    /** A prefix to use in front of special pages */
    specialPagePrefix: string

    /** Whether or not case should be ignored when checking the special page prefix */
    specialPagePrefixIgnoreCase: boolean
}
export type IWebServerOptionsRequired = 'cwd'

/** Default options for the web server */
export const DEFAULT_OPTIONS: ExcludeFields<IWebServerOptions, IWebServerOptionsRequired> = {
    apiBase: '/-',
    publicBase: '/!',
    publicDir: 'www',
    specialPagePrefix: '_',
    specialPagePrefixIgnoreCase: false
}

/**
 * Creates a new web server
 * @param cwd The working directory of the public files
 */
export function createWebServer (options: Options<IWebServerOptions, IWebServerOptionsRequired>): express.Express {
    const opts: IWebServerOptions = { ...DEFAULT_OPTIONS, ...options }

    const app = express()

    // TODO allow somehow serving from white-listed node modules?
    // this would be mostly for React, but there could be other uses

    // set up routes
    app.use(opts.publicBase, createStaticRouter(resolve(opts.cwd, opts.publicDir)))
    app.use(opts.apiBase, createAPIRouter(opts))

    // everything else gets sent to the app
    app.use('*', createRendererRouter(opts))

    return app
}
