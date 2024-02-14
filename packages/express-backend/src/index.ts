import express from "express";
import cors from "cors";
import 'dotenv/config'

import { RideView } from "./views/rides";
import { DiningView } from "./views/dining";
import { EventView } from "./views/events";
import { ProfileView } from "./views/profile";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/rides", RideView.getRides);

app.get("/api/dining", DiningView.getRestaurants);

app.post("/api/dining/orders/new", DiningView.createOrder);

app.get("/api/dining/orders/get", DiningView.getOrder);

app.get("/api/events", EventView.getEvents);

app.get("/api/profile/get", ProfileView.getProfile);

app.post("/api/profile/login", ProfileView.login);

app.post("/api/profile/edit", ProfileView.editProfile);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});