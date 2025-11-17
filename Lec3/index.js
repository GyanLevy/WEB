import { model } from "./model.js"
import { Site } from "./controller/site.js"

(new Site('.content')).render(model)