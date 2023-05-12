import express from "express";
import pg from "pg";
import dotenv from "dotenv";

// console.log("before", process.env.DATABASE_URL);
dotenv.config();
// console.log("after", process.env.DATABASE_URL);

//server data
const server = express();
const PORT = 3000;
server.use(express.static("public"));
server.use(express.json());
//
//database pool

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
// const db = new pg.Pool({
//   connectionString: "postgres://localhost:3000/mvp",
// });
//

//get and post user list

server.get("/api/users", (req, res) => {
  console.log("Hello World!");
  db.query("SELECT * FROM users")
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});
server.post("/api/users", (req, res) => {
  const { user_name, first_name, last_name, user_password, youtube_channel } =
    req.body;
  if (!user_name || !first_name || !last_name || !user_password) {
    res.sendStatus(422);
    return;
  }
  db.query(
    "INSERT INTO users(user_name, first_name, last_name, user_password, youtube_Channel) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [user_name, first_name, last_name, user_password, youtube_channel]
  ).then((result) => {
    res.status(201).send(result.rows[0]);
  });
});
//

//get and post bourbonforum
server.get("/api/bourbonforum", (req, res) => {
  db.query("SELECT * FROM bourbonforum").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});
server.post("/api/bourbonforum", (req, res) => {
  const { user_id, comment, post_date } = req.body;
  if (!user_id || !comment || !post_date) {
    res.sendStatus(422);
    return;
  }
  db.query(
    "INSERT INTO bourbonforum(user_id, comment, post_date) VALUES($1,$2,$3) RETURNING *"
  ).then((result) => {
    res.status(201).send(result.rows[0]);
  });
});
//

//get and post bbqforum
server.get("/api/bbqforum", (req, res) => {
  db.query("SELECT * FROM bbqforum").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});
server.post("/api/bbqforum", (req, res) => {
  const { user_id, comment, post_date } = req.body;
  if (!user_id || !comment || !post_date) {
    res.sendStatus(422);
    return;
  }
  db.query(
    "INSERT INTO bbqforum(user_id, comment, post_date) VALUES($1,$2,$3) RETURNING *"
  ).then((result) => {
    res.status(201).send(result.rows[0]);
  });
});
//

//get and post bbq recipes
server.get("/api/bbqrecipes", (req, res) => {
  db.query(
    "SELECT users.user_name AS user_name, bbqrecipes.title, bbqrecipes.ingredients, bbqrecipes.steps, bbqrecipes.temperature, bbqrecipes.comments, bbqrecipes.post_date  FROM bbqrecipes INNER JOIN users on bbqrecipes.user_id = users.id"
  ).then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});
server.post("/api/bbqrecipes", (req, res) => {
  const {
    user_id,
    title,
    ingredients,
    steps,
    temperature,
    comments,
    post_date,
  } = res.body;
  if (
    !user_id ||
    !title ||
    !ingredients ||
    !steps ||
    !temperature ||
    !comments ||
    !post_date
  ) {
    res.sendStatus(422);
    return;
  }
  db.query(
    "INSERT INTO bbqrecipes(user_id, title, ingredients, steps, temperature, comments, post_date) VALUES($1,$2,$3,$4,$5,$6,$7), RETURNING *"
  ).then((result) => {
    res.status(201).send(result.rows[0]);
  });
});
//

//get and post bourbonreviews
server.get("/api/bourbonreviews", (req, res) => {
  db.query("SELECT * FROM bourbonreviews").then((result) => {
    res.send(result.rows);
    console.log(result.rows);
  });
});
server.post("/api/bourbonreviews", (req, res) => {
  const { user_id, bourbon_type, bourbon_name, review, notes } = req.body;
  if (!user_id || !bourbon_type || !bourbon_name || !review || !notes) {
    res.sendStatus(422);
    return;
  }
  db.query(
    "INSERT INTO bbqforum(user_id, bourbon_type, bourbon_name, review, notes) VALUES($1,$2,$3,$4,$5) RETURNING *"
  ).then((result) => {
    res.status(201).send(result.rows[0]);
  });
});
//

//listen on port
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

//postgres - create a database
//Ran migration.sql and seed.sql files
//psql -f back/migration.sql postgres://mvp_fp51_user:qhsZ1OV2QPfOVseMAICUbG1llKSULByu@dpg-che0cc1mbg5afv16h1gg-a.ohio-postgres.render.com/mvp_fp51
//the above needs to be done when we are working out of the student_mvp directory

//node/npm
