
import * as Router from 'koa-router'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import 'vx-util'
import { productName } from '../../package.json'
import { logger } from '../logger.js'
import { IDokkitServerConfig } from '../server'

const LOG = logger('web', 'renderer')

export function renderMainPage (opts: IDokkitServerConfig) {
  LOG.verb('building React element for render...')
  return (
    <html lang='en-US'>
      <head>
        <meta charSet='utf8' />
        <title id='title'>{ productName }</title>
        <link rel='favicon' href='/!/res/favicon.ico' />

        <link rel='stylesheet' href='/!/style/index.css' />

        <script src='/!/vendor/react'     defer />
        <script src='/!/vendor/react-dom' defer />
        <script src='/!/index.js'         defer type='module' />
      </head>
      <body>
        <div id='app'
          data-special-page-prefix={opts.specialPagePrefix}
          data-special-page-case={opts.specialPagePrefixIgnoreCase} >
          Waiting for mount...
        </div>
      </body>
    </html>
  )
}

export function createRendererRouter (opts: IDokkitServerConfig): Router {
  LOG.info('creating renderer router')
  const r = new Router()

  const rendered = renderToString(renderMainPage(opts))
  r.get('/*', ctx => {
    ctx.type = 'text/html'
    ctx.body = rendered
  })

  return r
}
