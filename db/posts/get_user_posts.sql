SELECT * FROM posts AS p 
JOIN users AS u on p.user_id = u.user_id
JOIN comments AS c on p.comment_id = c.comment_id
WHERE p.user_id = ${user_id}