SELECT * FROM inbox as i 
  JOIN users AS u on i.last_message_user_id = u.user_id 
WHERE i.user_id = ${user_id}
