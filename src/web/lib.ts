
import * as Koa from 'koa'
import * as Router from 'koa-router'

/**
 * Creates a fallback handler for the given status
 * @param status The status to use, defaults to 404
 */
export function createFallbackHandler (status: number = 404): Koa.Middleware {
  return ctx => {
    ctx.status = status
    ctx.body = ''
  }
}

/**
 * Registers a fallback handler to a router
 * @param router The router to register to
 * @param status The status of the handler
 */
export function registerFallbackHandler (router: Router, status?: number): void {
  router.all('/*', createFallbackHandler(status))
}
