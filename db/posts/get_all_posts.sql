SELECT * FROM posts AS p
JOIN users AS u ON p.user_id = u.user_id
JOIN comments as c ON p.comment_id = c.comment_id