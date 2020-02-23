const startServer = require(`./src/server`);
const connectToDB = require(`./src/db/connect-db`);
const { mongoURI, port } = require("./src/config/config");

startServer(port);
connectToDB(mongoURI);
