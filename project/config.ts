
import 'vx-util'

// tslint:disable:no-object-literal-type-assertion
const CONFIG = {
  /** Build configuration */
  build: {
    /** The root output dir */
    outdir: 'lib',

    /** Temporary directory */
    tmpdir: '.tmp'
  },

  /** Licensing information */
  licensing: {
    /** Extensions to apply licensing to */
    extensions: [ '.js', '.mjs' ]
  },

  /** Source data */
  source: {
    /** Files to copy as-is from source */
    copy: [ '*/package.json' ],

    /** Source directory */
    dir: 'src'
  },

  /** Workspace configuration */
  workspace: {
    /** Package key information for workspace projects */
    keys: {
      /** Main scripts for each package */
      main: { } as IDictionary<string>,

      /** Development scripts for individual packages */
      scripts: { } as IDictionary<IDictionary<string>>,

      /** Keys unique to specific workspaces */
      unique: { } as IDictionary<IDictionary<string>>,

      /** Keys that are copied verbatim from the root package */
      verbatim: [
        'description',
        'author',
        'contributors',
        'repository',
        'license',
        'private'
      ]
    }
  }
}

export default CONFIG
