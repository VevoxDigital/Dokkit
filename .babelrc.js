
const presets = [
  [ '@babel/env', {
    targets: {
      node: true
    }
  }],
  '@babel/typescript'
]
const plugins = [
  '@babel/proposal-class-properties',
  '@babel/proposal-object-rest-spread'
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
