SELECT * FROM posts AS p 
  join (select user_id, first_name, last_name, profile_img from users as u) on p.user_id = u.user_id
  left OUTER JOIN comments AS c on p.post_id  = c.post_id
WHERE p.user_id = ${user_id}