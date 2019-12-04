const http = require("http");
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const Web3Singleton = require("./utils/Web3Singleton");

const port = process.env.PORT || 3000;

const server = http.createServer();
const app = express();

const web3 = Web3Singleton.getInstance();

app.use(express.json());

app.get("/accounts", async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    res.status(200).send(accounts);
});

server.on("request", app);
server.listen(port, () => console.log("Server listening on port %d", port));