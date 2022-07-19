SELECT * FROM posts AS p
JOIN users AS u ON p.user_id = u.user_id
ORDER BY p.post_id DESC