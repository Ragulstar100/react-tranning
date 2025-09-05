
import exp from "express"
import { login } from "./router/login.js";
import cors from 'cors'

const app = exp()

app.use(cors())
app.use(exp.json())

app.use('/login', login)

app.listen(5000, () => {
    console.log("server started")
});