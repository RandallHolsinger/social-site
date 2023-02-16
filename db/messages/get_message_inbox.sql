SELECT * FROM inbox AS i 
JOIN users AS u ON i.user_id = u.user_id
WHERE i.id_sender = ${user_id} OR i.user_id = ${user_id} 
ORDER BY i.date DESC;
