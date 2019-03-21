
const app = document.getElementById('app')
if (!app) throw new Error('Main app element is not present')

app.innerHTML = window.location.href
