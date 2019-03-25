import { DokkitServer } from '../server'

/**
 * The main file manager controller for I/O and VCS
 */
export class FileManager {

  public readonly server: DokkitServer

  public constructor (server: DokkitServer) {
    this.server = server
  }

}
