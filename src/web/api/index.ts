
import * as express from 'express'
import { IWebServerOptions } from '..'

export function createStaticRouter (p: string): express.Router {
    const r = express.Router()
    r.use(express.static(p))
    r.use((_req, res) => res.status(404).send(''))
    return r
}

export function createAPIRouter (_opts: IWebServerOptions): express.Router {
    const r = express.Router()

    r.use((_req, res) => res.status(404).send(''))
    return r
}
