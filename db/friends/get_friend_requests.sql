SELECT * FROM friends AS f
  JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON f.user_id_sent = u.user_id
WHERE (f.user_id_sent = ${user_id} OR f.user_id_recieved = ${user_id}) AND f.confirmed IS NULL

 