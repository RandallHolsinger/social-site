SELECT * FROM friends WHERE 
(user_id_sent OR user_id_recieved = ${user_id})
AND
accepted = true
