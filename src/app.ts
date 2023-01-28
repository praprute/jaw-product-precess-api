import express from "express";
import routes from "./routes";
import config from "config";
import mysql from "mysql";
import myConnection from "express-myconnection";
import dotenv from "dotenv";
import { Connect } from "./utils/connect";
import log from "./utils/logger";
import swaggerDocs from "./utils/swagger";
import cors from "cors";

dotenv.config();

const PORT = config.get<number>("port");
const Host = config.get<any>("host");
const app = express();

// app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
// app.use("/api", routes);

app.use(
  myConnection(
    mysql,
    {
      host: config.get<any>("host"),
      user: config.get<any>("user"),
      password: config.get<any>("password"),
      port: config.get<number>("port"),
      database: config.get<any>("database"),
      dateStrings: config.get<any>("dateStrings"),
      timezone: config.get<any>("timezone"),
    },
    "pool"
  )
);

app.listen(PORT, async () => {
  log.info(`App is running at http://${Host}:${PORT}`);
  await Connect();
  routes(app);
  swaggerDocs(app, PORT);
});
