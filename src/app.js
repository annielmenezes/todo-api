import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
const register = (...middlewares) => app =>
  middlewares.forEach(middleware => app.use(middleware));

register(bodyParser.json(), routes)(app);

export default app;
