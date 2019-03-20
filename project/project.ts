
import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import * as mkdirp from 'mkdirp'
import { dirname, join } from 'path'
import 'vx-util'
import * as pkg from '../package.json'
import CONFIG from './config'

const { name, version, workspaces = [] } = pkg

const commitBuffer = execSync('git rev-parse HEAD')
const commit = commitBuffer.toString().trim().substring(0, 8).toUpperCase()

const scopeIndex = name.indexOf('/')
const scope = name.substring(1, scopeIndex)

for (const workspacePath of workspaces) {
  const workspaceName = workspacePath.substring(4).replace(/\//g, '-')
  process.stdout.write(`loading ${workspacePath}... `)

  const workspaceJSONFile = join(__dirname, '..', workspacePath, 'package.json')

  let workspacePackageData: PackageJSON.IPackage | null = null
  try {
    workspacePackageData = JSON.parse(readFileSync(workspaceJSONFile, 'utf8'))
    process.stdout.write('found existing package... ')
  } catch (error) {
    if (!error.message.match(/^ENOENT/)) {
      process.stderr.write('Failed to load initial JSON file, skipping\n')
      process.stderr.write(error.stack + '\n')
      continue
    }
  }

  // set up scripts
  const scripts: IDictionary<string> = CONFIG.workspace.keys.scripts[workspaceName] || { }
  scripts.start = scripts.start || 'node .'

  // tslint:disable:object-literal-sort-keys
  const newPackageKeys: PackageJSON.IPackage = {
    name: `@${scope}/${workspaceName}`,
    version: `${version}+${workspaceName}.${commit}`,
    scripts,
    main: CONFIG.workspace.keys.main[workspaceName] || 'index'
  }
  // tslint:enable:object-literal-sort-keys

  // copy unique keys
  const uniqueKeyset = CONFIG.workspace.keys.unique[workspaceName]
  if (uniqueKeyset) {
    for (const uniqueKey of Object.keys(uniqueKeyset)) newPackageKeys[uniqueKey] = uniqueKeyset[uniqueKey]
  }

  // copy in verbatim keys
  for (const verbatimKey of CONFIG.workspace.keys.verbatim) newPackageKeys[verbatimKey] = pkg[verbatimKey]

  // if the package previously existed, preserve depenencies
  if (workspacePackageData) {
    for (const existingPackageKey of Object.keys(workspacePackageData)) {
      if (existingPackageKey.match(/[Dd]ependencies$/)) {
        newPackageKeys[existingPackageKey] = workspacePackageData[existingPackageKey]
      }
    }
  }

  // write out the new file
  try {
    mkdirp.sync(dirname(workspaceJSONFile))
    writeFileSync(
      workspaceJSONFile,
      JSON.stringify(newPackageKeys, null, 2) + '\n',
      'utf8')
    process.stdout.write('done\n')
  } catch (error) {
    process.stderr.write('Failed to write new package, skipping\n')
    process.stderr.write(error.stack + '\n')
  }
}
