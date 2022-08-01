import express from "express";
import { PORT } from "./config/index.js";
import connection from "./utils/connection.js";
const app = express();
import routes from "./routes/routes.js";

app.use(express.json()); // by default express or nodejs cannot understand json format
// app.use("api/v1",routes)
// localhost:8000/api/v1/register
app.use(routes);


connection(); // db connection
app.listen(PORT,() => console.log(`Listening on port no ${PORT}`)); // localhost


// app.listen(PORT,
//     async() => {
//         console.log(`Listening on port no ${PORT}`)
//         await connection()
//     }
// );
