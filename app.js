import express from "express";
const app = express();
export default app;
import {
  getFiles,
  getFolders,
  getFolderById,
  insertFile,
} from "./db/client.js";

app.use(express.json());

app.route("/files").get(async (req, res) => {
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

app.route("/folders").get(async (req, res) => {
  try {
    const result = await getFolders();

    if (!result) {
      return res.status(500).json({ error: "Unable to get folders" });
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
      return res
        .status(404)
        .json({ error: `Folder with id ${id} does not exist.` });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
});

app.route("/folders/:id/files").post(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, size } = req.body;

    if (!name || !size) {
      return res.status(400).json({ error: `Bad Request` });
    }

    const folder = await getFolderById(id);
    if (!folder) {
      return res
        .status(404)
        .json({ error: `Folder with id ${id} does not exist.` });
    }

    const result = await insertFile({ name, size, folder_id: id });
    if (!result) {
      return res.status(404).json({ error: `Failed to insert new file` });
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
});
