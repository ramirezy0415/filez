-- TODO
DROP TABLE IF EXISTS files CASCADE;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, 
    size INT NOT NULL,
    folder_id INT NOT NULL,
    UNIQUE (name, folder_id),
    FOREIGN KEY (folder_id) REFERENCES folders(id)
)