SELECT * FROM messages AS m
JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u on m.id_sender = u.user_id 
WHERE m.conversation_id = ${conversation_id}