SELECT * FROM friends AS f
  JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON (
    CASE WHEN f.user_id_sent = ${user_id} THEN f.user_id_recieved 
         WHEN f.user_id_recieved = ${user_id} THEN f.user_id_sent
    END) = u.user_id
WHERE (f.user_id_sent = ${user_id} OR f.user_id_recieved = ${user_id}) AND f.friend_status = 'accepted'