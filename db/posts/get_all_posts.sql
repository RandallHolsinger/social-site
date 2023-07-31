SELECT * FROM posts AS p
  LEFT JOIN liked_posts AS lp ON lp.post_id = p.post_id 
  JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON p.user_id = u.user_id
  JOIN images AS i ON p.post_id = i.post_id
ORDER BY p.post_id DESC;