
import { readFileSync } from 'fs'
import { createSecureServer } from 'http2'
import * as Koa from 'koa'
import * as minimist from 'minimist'
import { join } from 'path'
import { Server } from 'tls'
import { FileManager } from '../io'
import { logger } from '../logger'
import { createWebServer } from '../web'

const LOG = logger('server')

export interface IDokkitServerConfig {
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

export type IDokkitServerConfigRequired = 'cwd'

/**
 * The main dokkit server
 */
export class DokkitServer {

  public static readonly DEFAULT_OPTIONS: ExcludeFields<IDokkitServerConfig, IDokkitServerConfigRequired> = {
    apiBase: '/-',
    publicBase: '/!',
    publicDir: 'www',
    specialPagePrefix: '_',
    specialPagePrefixIgnoreCase: false
  }

  /** The express app */
  public readonly app: Koa

  /** The HTTP server */
  public readonly server: Server

  /** This server's config */
  public readonly config: IDokkitServerConfig

  /** Command-line arguments passed to this server */
  public readonly args: minimist.ParsedArgs

  public readonly files: FileManager

  public constructor (args: minimist.ParsedArgs, config: Options<IDokkitServerConfig, IDokkitServerConfigRequired>) {
    this.args = args
    this.config = { ...DokkitServer.DEFAULT_OPTIONS, ...config }
    LOG.debug('init server with config: %O', this.config)

    this.files = new FileManager(this)

    this.app = this.createExpressServer()
    this.server = this.createHTTPServer()
  }

  /**
   * Creates a new HTTP server from the current app
   */
  public createHTTPServer (): Server {
    LOG.info('creating and hooking HTTP server(s)...')
    return createSecureServer({
      allowHTTP1: true,
      // TODO make this path more configurable
      cert: readFileSync(join(this.config.cwd, '../ssl/server.crt')),
      key: readFileSync(join(this.config.cwd, '../ssl/server.key'))
    }, this.app.callback())
  }

  /**
   * Creates a new express server from the current config
   */
  public createExpressServer (): Koa {
    LOG.info('creating Koa handler...')
    return createWebServer(this.config)
  }

}
