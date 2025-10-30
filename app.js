import express from "express";
const app = express();
export default app;

import fileRouter from "#api/files";
import folderRouter from "#api/folders";

app.use(express.json());

app.use("/files", fileRouter);
app.use("/folders", folderRouter);
