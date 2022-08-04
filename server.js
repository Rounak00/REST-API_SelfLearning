import express from "express";
import { PORT } from "./config/index.js";
import connection from "./utils/connection.js";
const app = express();
import routes from "./routes/routes.js";
import errorHandler from './middleware/errorHandler.js'
import cookieparser from 'cookie-parser';

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
