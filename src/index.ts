
import * as minimist from 'minimist'
import { LoggingLevel } from 'vx-util'
import { P_LOG } from './logger'
import { DokkitServer } from './server'

// TODO make this more useful

P_LOG.level = LoggingLevel.VERBOSE
const server = new DokkitServer(minimist(process.argv.slice(2)), { cwd: __dirname })
server.server.listen(3000, console.log)
