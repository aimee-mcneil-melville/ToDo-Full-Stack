import express from "express";
import { join } from "node:path";

const server = express();

server.use(express.json());
server.use(express.static(join("server", "public")));

server.get("*", (req, res) => {
  res.sendFile(join(__dirname, "public/index.html"));
});

export default server;
