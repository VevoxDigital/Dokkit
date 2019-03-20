
/// <reference types="grunt" />
/// <reference types="vx-util" />

import { join, resolve } from 'path'
import { workspaces } from '../package.json'
import CONFIG from './config'

const root = resolve(__dirname, '..')
const tempPath = resolve(root, CONFIG.build.tmpdir)
const buildPath = resolve(root, CONFIG.build.outdir)
const compiledPath = resolve(buildPath, CONFIG.build.subdirs.compiled)
const sourcePath = resolve(root, CONFIG.source.dir)
const helperPath = join(root, 'project', 'helper')

/**
 * The primary grunt config, invoked by Grunt
 * @param grunt The grunt module
 */
function init (grunt: IGrunt): void {
  // Pre-configuration
  require('time-grunt')(grunt)
  require('load-grunt-tasks')(grunt)

  // Basic configuration
  grunt.initConfig({
    // Transpilation
    babel: {
      compile: {
        files: {
          cwd: sourcePath,
          dest: compiledPath,
          expand: true,
          ext: '.js',
          src: [ '**/*.{ts,js}' ]
        },
        options: {
          ...require('../.babelrc')
        }
      }
    },

    // Directory cleanup
    clean: {
      compile: [
        compiledPath,
        join(tempPath, CONFIG.build.subdirs.compiled)
      ],
      coverage: [
        '.nyc_output',
        'coverage'
      ],
      output: [
        buildPath
      ],
      temp: [
        '.cache',
        '.temp',
        '.tmp',
        '.tscache',
        '**/+(yarn|npm)*.log'
      ]
    },

    // Direct file copies
    copy: {
      compiledPackages: {
        files: [
          {
            cwd: sourcePath,
            dest: compiledPath,
            expand: true,
            src: CONFIG.source.copy
          },
          {
            cwd: join(helperPath, 'compiled'),
            dest: compiledPath,
            expand: true,
            src: '**/*'
          }
        ]
      }
    },

    exec: {
      installCompiledDeps: {
        cmd: 'yarn --production',
        cwd: compiledPath,
        stderr: 'inherit',
        stdout: 'inherit'
      },
      nyc: {
        cmd: 'nyc mocha',
        cwd: root,
        options: {
          env: {
            DEBUG: '',
            NODE_ENV: 'test'
          }
        },
        stdout: 'inherit'
      },
      update: {
        cmd: 'yarn run tsexec .',
        cwd: root,
        stdout: 'inherit'
      }
    },

    todo: {
      all: {
        options: {
          file: join(root, 'report.md')
        },
        src: [
          '*.{js,ts}',
          'project/**',
          'src/**',
          '!node_modules'
        ]
      }
    },

    ts: {
      types: {
        options: {
          baseUrl: './src',
          declaration: true,
          declarationDir: join(buildPath, 'types'),
          emitDeclarationOnly: true,
          rootDir: './src'
        }
      },
      verify: {
        options: {
          noEmit: true
        },
        tsconfig: join(root, 'tsconfig.json')
      }
    }
  })

  grunt.registerTask('validate', [ 'ts:verify' ])
}

module.exports = init
