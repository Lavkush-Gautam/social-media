import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest.js";

const app = express();

await connectDb();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

// 👇 Export, don't listen
export default app;
