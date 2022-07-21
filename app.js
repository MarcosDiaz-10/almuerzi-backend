
import {config} from "dotenv";
config()

import Server from "./models/server.model.js"

const server = new Server();

server.listen()


export default server;