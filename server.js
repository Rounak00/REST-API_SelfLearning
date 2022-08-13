import express from "express";
import { PORT } from "./config";
import connection from "./utils/connection";
const app = express();
import routes from "./routes/routes";
import errorHandler from './middleware/errorHandler'
import cookieparser from 'cookie-parser';
import cors from 'cors';
import path from 'path';


global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieparser());
app.use(express.json()); // by default express or nodejs cannot understand json format
// app.use("api/v1",routes)
// localhost:8000/api/v1/register
// app.use(routes);

app.get("/", (req, res) => {
    res.json({
        msg: "test",
        lisence: "MIT"
    })
})



app.use(routes);

// error handler
app.use(errorHandler);

app.listen(PORT,
    async() => {
        console.log(`Listening on port no ${PORT}`)
        await connection()
    }
);
