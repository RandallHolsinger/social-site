SELECT * FROM friends
WHERE user_id_sent = ${user_id_sender} and user_id_recieved = ${user_id_reciever}
and friend_status = 'pending'