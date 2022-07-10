INSERT INTO users(username, password, email, date)
VALUES(${username}, ${password}, ${email}, now())
returning user_id , username