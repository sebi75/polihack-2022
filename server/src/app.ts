import express from 'express'
import * as dotenv from 'dotenv'

import { logger } from './utils'

import bodyParser from 'body-parser'
dotenv.config();

const app: express.Application = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* ROUTES COME HERE */
import { exampleRouter } from './routes'

app.use("/api/example", exampleRouter)

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})