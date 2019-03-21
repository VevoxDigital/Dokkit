import { GlobalLogger, Logger } from 'vx-util'

export const P_LOG = GlobalLogger.init('dokkit')

export function logger (prefix: string, ...prefixes: string[]): Logger {
  const log = P_LOG.child(prefix)
  return prefixes.length ? log.child(prefixes[0], ...prefixes.slice(1)) : log
}
