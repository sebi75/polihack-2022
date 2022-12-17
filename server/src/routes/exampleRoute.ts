import express from 'express'

const exampleRouter = express.Router();

exampleRouter.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json({
        message: "Hello world!"
    })
})

export default exampleRouter