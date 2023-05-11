DROP TABLE IF EXISTS bbqrecipes;
DROP TABLE IF EXISTS bourbonforum;
DROP TABLE IF EXISTS bbqforum;
DROP TABLE IF EXISTS bourbonreviews;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(25),
    first_name TEXT,
    last_name TEXT,
    user_password VARCHAR(50),
    youtube_channel VARCHAR(200)
);

CREATE TABLE bourbonforum(
    id SERIAL,
    user_id INTEGER REFERENCES users(id),
    comment VARCHAR(5000) NOT NULL,
    post_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE bbqforum(
    id SERIAL,
    user_id INTEGER REFERENCES users(id),
    comment VARCHAR(5000) NOT NULL,
    post_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE bbqrecipes(
    id SERIAL,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(50),
    ingredients TEXT,
    steps VARCHAR,
    temperature INTEGER,
    comments VARCHAR(5000),
    post_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE bourbonreviews(
    id SERIAL,
    user_id INTEGER REFERENCES users(id),
    bourbon_type TEXT,
    bourbon_name TEXT,
    review VARCHAR(5000),
    notes VARCHAR(500)
);
