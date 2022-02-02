require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
import bodyparser from "koa-bodyparser";
import mongoose from "mongoose";

import api from "./api";
import createFakeData from "./createFakeData";

const app = new Koa();
const router = new Router();

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDb");
    createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

router.use("/api", api.routes());

app.use(bodyparser());

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log("listening to port 3030");
});
