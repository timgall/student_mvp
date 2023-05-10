DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bourbonForum;
DROP TABLE IF EXISTS bbqForum;
DROP TABLE IF EXISTS bbqRecipies;
DROP TABLE IF EXISTS bourbonReviews;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(25),
    first_name TEXT,
    last_name TEXT,
    youtube_channel VARCHAR(200)
);

CREATE TABLE bourbonForum(
    id SERIAL,
    user_id INTEGER REFERENCES users(id),
    comment VARCHAR(5000) NOT NULL,
    post_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE bbqForum(
    id SERIAL,
    user_id INTEGER REFERENCES users(id),
    comment VARCHAR(5000) NOT NULL,
    post_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE bbqRecipies(
    id SERIAL,
    user_id INTEGER REFERENCES users(id),
    ingredients TEXT,
    steps VARCHAR,
    temperature INTEGER,
    comments VARCHAR(5000),
    post_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE bourbonReviews(
    id SERIAL,
    user_id INTEGER REFERENCES users(id),
    bourbon_type TEXT,
    bourbon_name TEXT,
    review VARCHAR(5000),
    notes VARCHAR(500)
);
