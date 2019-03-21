
import * as Router from 'koa-router'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import 'vx-util'
import { productName } from '../../package.json'
import { IDokkitServerConfig } from '../server'

export function renderMainPage (opts: IDokkitServerConfig) {
  return (
    <html lang='en-US'>
      <head>
        <meta charSet='utf8' />
        <title id='title'>{ productName }</title>
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
    const r = new Router()

    const rendered = renderToString(renderMainPage(opts))
    r.get('/*', ctx => {
      ctx.type = 'text/html'
      ctx.body = rendered
    })

    return r
}
