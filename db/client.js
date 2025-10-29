import pg from "pg";
const db = new pg.Client(process.env.DATABASE_URL);
export default db;

export async function insertFolder({ name }) {
  try {
    const query = `
    INSERT INTO folders(name)
    VALUES($1)
    RETURNING *;
    `;
    const values = [name];
    console.log("Inserting: ", name);
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function insertFile({ name, size, folder_id }) {
  try {
    const query = `
    INSERT INTO files(name, size, folder_id)
    VALUES($1, $2, $3)
    RETURNING *;
    `;
    const values = [name, size, folder_id];
    console.log("Inserting: ", name, size, folder_id);
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFiles() {
  try {
    const query = `
    SELECT fi.*, fo.name AS folder_name FROM files AS fi
    LEFT JOIN folders AS fo
    ON fi.folder_id = fo.id;
    `;
    const { rows: files } = await db.query(query);
    return files;
  } catch (error) {
    console.error(error);
  }
}

export async function getFolders() {
  try {
    const query = `
      SELECT * FROM folders;
    `;
    const { rows: folders } = await db.query(query);
    return folders;
  } catch (error) {
    console.error(error);
  }
}

export async function getFolderById(id) {
  try {
    const query = `
      SELECT *,
      (
        SELECT json_agg(files)
        FROM files
        WHERE files.folder_id = folders.id
      ) AS file_list
      FROM folders
      WHERE id = $1;
    `;
    const values = [id];
    const {
      rows: [folder],
    } = await db.query(query, values);
    return folder;
  } catch (error) {
    console.error(error);
  }
}
