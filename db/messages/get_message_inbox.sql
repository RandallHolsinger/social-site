SELECT * FROM inbox AS i 
JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON i.friend_uid = u.user_id
WHERE i.owner_id = ${user_id}
ORDER BY i.date DESC;
