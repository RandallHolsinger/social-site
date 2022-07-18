SELECT * FROM comments AS C 
 JOIN users AS u on c.user_id = c.user_id
WHERE post_id = ${post_id}
ORDER BY comment_id DESC