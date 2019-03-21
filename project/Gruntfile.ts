
/// <reference types="grunt" />
/// <reference types="vx-util" />

import { join, resolve } from 'path'
import CONFIG from './config'

const root = resolve(__dirname, '..')
const buildPath = resolve(root, CONFIG.build.outdir)
const sourcePath = resolve(root, CONFIG.source.dir)

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
                files: [{
                cwd: sourcePath,
                dest: buildPath,
                expand: true,
                ext: '.js',
                src: [ '**/*.{ts,tsx,js}', '!www/res/**' ]
                }],
                options: {
                ...require('../.babelrc')
                }
            }
        },

        // Directory cleanup
        clean: {
            compile: [
                buildPath
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
            static: {
                files: [{
                    cwd: sourcePath,
                    dest: buildPath,
                    expand: true,
                    src: [ 'www/res/**/*' ]
                }]
            }
        },

        exec: {
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
            }
        },

        sass: {
          compile: {
            files: [{
              cwd: sourcePath,
              dest: buildPath,
              expand: true,
              ext: '.css',
              src: [ 'www/style/*.scss' ]
            }]
          },
          options: {
            implementation: require('node-sass'),
            outputStyle: 'compressed',
            sourceMap: true
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
            verify: {
                options: {
                noEmit: true
                },
                tsconfig: join(root, 'tsconfig.json')
            }
        }
    })

    grunt.registerTask('validate', [ 'ts:verify' ])

    grunt.registerTask('compile', [ 'clean:compile', 'babel:compile', 'sass:compile', 'copy:static' ])
}

module.exports = init
