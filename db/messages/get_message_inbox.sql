SELECT * FROM inbox AS i 
JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON (
  CASE 
    WHEN i.user_id = ${user_id} THEN i.id_sender
    WHEN i.id_sender = ${user_id} THEN i.user_id
  END
) = u.user_id
WHERE i.id_sender = ${user_id} OR i.user_id = ${user_id} 
ORDER BY i.date DESC;
