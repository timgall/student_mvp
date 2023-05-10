import express from "express";
import pg from "pg";

const server = express();
const PORT = 3000;

const db = new pg.Pool({
  database: "mvp",
});

server.use(express.static("public"));

server.use(express.json());

server.get("/users", (req, res) => {
  db.query("SELECT * FROM users").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.get("/bourbonForum", (req, res) => {
  db.query("SELECT * FROM bourbonForum").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.get("/bbqForum", (req, res) => {
  db.query("SELECT * FROM bbqForum").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.get("/bbqRecipies", (req, res) => {
  db.query("SELECT * FROM bbqRecipies").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.get("/bourbonReviews", (req, res) => {
  db.query("SELECT * FROM bourbonReviews").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
