insert into users(username, password, email, date)
values(${username}, ${password}, ${email}, now())
returning user_id , username