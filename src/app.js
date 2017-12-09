import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import { connect } from "../config/database";

const app = express();
const register = (...middlewares) => app =>
  middlewares.forEach(middleware => app.use(middleware));

const configureExpress = () => {
  register(bodyParser.json(), routes)(app);
  return app;
};

export default () => connect().then(configureExpress);
