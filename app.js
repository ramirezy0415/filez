import express from "express";
const app = express();
export default app;
import { getFiles } from "./db/client.js";

app.route("/files").get(async (req, res) => {
  try {
    const result = await getFiles();

    if (!result) {
      res.status(500).json({ error: "Unable to get files" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});
