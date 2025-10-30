import express from "express";
const fileRouter = express.Router();

export default fileRouter;
import { getFiles } from "../db/client.js";

fileRouter.route("/").get(async (req, res) => {
  try {
    const result = await getFiles();

    if (!result) {
      return res.status(500).json({ error: "Unable to get files" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});
