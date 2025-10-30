import express from "express";
const folderRouter = express.Router();
export default folderRouter;
import { getFolderById, getFolders, insertFile } from "../db/client.js";

folderRouter.route("/").get(async (req, res) => {
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

folderRouter.route("/:id").get(async (req, res) => {
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

folderRouter.route("/:id/files").post(async (req, res) => {
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
