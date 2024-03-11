// import express, { Router } from "express";
import serverless from "serverless-http";

import { app } from "./../../src/index";

// const api = express();

// const router = Router();
// router.get("/test", (req, res) => res.send("Hello World!"));

// api.use("/api/", router);

export const handler = serverless(app);
