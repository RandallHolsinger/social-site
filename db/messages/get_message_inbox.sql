-- SELECT * FROM messages as m
--   JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u
--   ON u.user_id = m.user_id_sender
-- WHERE (m.user_id_sender = ${user_id} OR m.user_id_receiver = ${user_id})
-- ORDER  BY date DESC

SELECT m.*
FROM messages m 
  JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON m.user_id_receiver = u.user_id
WHERE ${user_id} IN (m.user_id_sender , m.user_id_receiver) AND
      (LEAST(m.user_id_sender, m.user_id_receiver), GREATEST(m.user_id_sender, m.user_id_receiver), date) IN 
       (SELECT LEAST(m2.user_id_sender, m2.user_id_receiver), GREATEST(m2.user_id_sender, m2.user_id_receiver), MAX(m2.date)
        FROM messages m2
        GROUP BY LEAST(m2.user_id_sender, m2.user_id_receiver), GREATEST(m2.user_id_sender, m2.user_id_receiver));
