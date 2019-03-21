
import * as express from 'express'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import 'vx-util'
import { IWebServerOptions } from '.'
import { productName } from '../../package.json'

export function renderMainPage (opts: IWebServerOptions) {
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

export function createRendererRouter (opts: IWebServerOptions): express.Router {
    const r = express.Router()

    const rendered = renderToString(renderMainPage(opts))

    r.get('/', (_req, res) => {
        res.send(rendered)
    })

    return r
}