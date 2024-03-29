SELECT * FROM posts AS p 
  JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON p.user_id = u.user_id
  JOIN images AS i ON p.post_id = i.post_id
WHERE p.user_id = ${user_id}
ORDER BY p.post_id desc
