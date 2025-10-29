import express from "express";
const app = express();
export default app;
import { getFiles, getFolders, getFolderById } from "./db/client.js";

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

app.route("/folders").get(async (req, res) => {
  try {
    const result = await getFolders();

    if (!result) {
      res.status(500).json({ error: "Unable to get folders" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});

app.route("/folders/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getFolderById(id);

    if (!result) {
      res.status(404).json({ error: `Folder with id ${id} does not exist.` });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});
