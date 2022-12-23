SELECT * FROM posts AS p
JOIN users AS u ON p.user_id = u.user_id
JOIN images as i on p.post_id - i.post_id
ORDER BY p.post_id DESC