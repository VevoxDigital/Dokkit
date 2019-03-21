
import * as minimist from 'minimist'
import { DokkitServer } from './server'

// TODO make this more useful

const server = new DokkitServer(minimist(process.argv.slice(2)), { cwd: __dirname })
server.server.listen(3000, console.log)
