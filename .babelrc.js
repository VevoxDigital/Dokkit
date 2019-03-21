
const presets = [
  [ '@babel/env', {
    targets: {
      node: true
    }
  }],
  '@babel/typescript',
  '@babel/react'
]
const plugins = [
  '@babel/proposal-class-properties',
  '@babel/proposal-object-rest-spread',
  [ 'transform-es2015-modules-commonjs', {
    noInterop: true
  }]
]

exports = module.exports = {
  comments: false,
  compact: true,
  env: {
    test: {
      plugins: [ 'istanbul' ]
    }
  },
  plugins,
  presets,
  sourceMaps: true
}
