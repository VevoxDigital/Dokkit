
/// <reference path="./vendor.d.ts" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { App } from './app/App.js'

const app = document.getElementById('app')
if (!app) throw new Error('Main app element is not present')

app.innerHTML = window.location.href
ReactDOM.render(<App />, app)
