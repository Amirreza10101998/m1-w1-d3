import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import router from "./blogPosts/index.js"


const server = express();
const port = 3003

server.use(cors());

server.use(express.json());

server.use("/blogPosts", router);

console.table(listEndpoints(server));

server.listen(port, () => console.log(`server running on port: ${port}`))

