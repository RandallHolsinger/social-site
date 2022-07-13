INSERT INTO users(first_name, last_name, email, password, date)
VALUES(${firstName}, ${lastName}, ${email}, ${password}, now())
returning user_id , first_name, last_name