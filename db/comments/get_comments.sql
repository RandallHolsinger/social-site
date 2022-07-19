SELECT * FROM comments AS C 
 JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON c.user_id = u.user_id
WHERE post_id = ${post_id}
ORDER BY comment_id ASC