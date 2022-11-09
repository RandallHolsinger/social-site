SELECT * FROM messages 
WHERE (sender_id = 1 AND receiver_id = 3 OR
       sender_id = 3 AND receiver_id = 1)
ORDER  BY date DESC
LIMIT  1;