import { createWebServer } from './web'

// TODO make this more useful

const app = createWebServer({ cwd: __dirname })
app.listen(3000)
