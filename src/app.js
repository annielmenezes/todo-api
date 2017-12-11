import { createWriteStream } from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes";
import { connect } from "../config/database";

const app = express();
const accessLogStream = createWriteStream(
  path.join(__dirname, "../logs/access.log"),
  { flags: "a" }
);
const register = (...middlewares) => app =>
  middlewares.forEach(middleware => app.use(middleware));
const configureExpress = () => {
  register(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    morgan("combined", { stream: accessLogStream }),
    routes
  )(app);
  return app;
};

export default () => connect().then(configureExpress);
