
import * as express from 'express'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { IWebServerOptions } from '.'

export function renderMainPage (opts: IWebServerOptions) {
    return (
        <html lang='en-US'>
            <head>
                <title>Yay!</title>
            </head>
        </html>
    )
}

export function createRendererRouter (opts: IWebServerOptions): express.Router {
    const r = express.Router()

    const rendered = renderToString(renderMainPage(opts))
    r.use('/', (_req, res) => {
        res.render(rendered)
    })

    return r
}
