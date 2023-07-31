SELECT * FROM posts AS p
  JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON p.user_id = u.user_id
  LEFT JOIN liked_posts AS l ON p.post_id = l.post_id 
  JOIN images AS i ON p.post_id = i.post_id
ORDER BY p.post_id DESC;