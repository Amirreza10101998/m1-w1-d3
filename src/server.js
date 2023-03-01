import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import router from "./blogPosts/index.js"
import { notFound, forbidden, cathcAllErrorHandler, unauthorized, badRequest } from "./blogPosts/errorHandlers.js";


const server = express();
const port = 3003

server.use(cors());

server.use(express.json());

server.use("/blogPosts", router);

/*----------Error Handlers----------*/
server.use(notFound);
server.use(forbidden);
server.use(cathcAllErrorHandler);
server.use(unauthorized);
server.use(badRequest)

console.table(listEndpoints(server));

server.listen(port, () => console.log(`server running on port: ${port}`))

