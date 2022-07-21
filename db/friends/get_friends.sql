SELECT * FROM friends AS f
  JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON f.user_id_recieved = u.user_id
WHERE user_id_sent = ${user_id} OR user_id_recieved = ${user_id}

