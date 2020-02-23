require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const routes = require("./routes/routes");

const isDev = process.env.NODE_ENV !== "production";

const { apiPATH, apiVersion } = require("./config/config");

const startServer = port => {
  isDev &&
    app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );

  app
    .use(express.urlencoded({ extended: false })) // Добавляем query в url
    .use(express.json()) // Добавляем body в req
    .use(cors("*"))
    .disable("x-powered-by")
    .use(`/${apiPATH}/${apiVersion}`, routes)
    .use("/", (req, res) =>
      res.json({
        status: "success",
        message: `Basic url for api is /${apiPATH}/${apiVersion}`
      })
    )

    .listen(port, () => {
      console.log(`App listening on http://localhost:${port}`);
    });
};

module.exports = startServer;
