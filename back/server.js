import express from "express";
import pg from "pg";
import dotenv from "dotenv";

// console.log("before", process.env.DATABASE_URL);
dotenv.config();
// console.log("after", process.env.DATABASE_URL);

const server = express();
const PORT = 3000;
server.use(express.static("public"));

console.log(process.env.DATABASE_URL);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
// const db = new pg.Pool({
//   connectionString: "postgres://localhost:3000/mvp",
// });

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.get("/api/bourbonForum", (req, res) => {
  db.query("SELECT * FROM bourbonForum").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.get("/api/bbqForum", (req, res) => {
  db.query("SELECT * FROM bbqForum").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.get("/api/bbqRecipies", (req, res) => {
  db.query("SELECT * FROM bbqRecipies").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.get("/api/bourbonReviews", (req, res) => {
  db.query("SELECT * FROM bourbonReviews").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

//postgres - create a database
//Ran migration.sql and seed.sql files
//psql -f back/migration.sql postgres://mvp_fp51_user:qhsZ1OV2QPfOVseMAICUbG1llKSULByu@dpg-che0cc1mbg5afv16h1gg-a.ohio-postgres.render.com/mvp_fp51
//the above needs to be done when we are working out of the student_mvp directory

//node/npm
