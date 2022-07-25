select * from friends 
where user_id_sent = ${user_id_sender} 
AND user_id_recieved = ${user_id_reciever}