SELECT *
FROM (SELECT *,
             row_number() OVER (PARTITION BY (CASE WHEN user_id_sender = ${user_id} THEN user_id_receiver ELSE user_id_sender END) ORDER BY date DESC) AS seqnum
      FROM messages AS m
      JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON m.user_id_sender = u.user_id
      WHERE ${user_id} IN (user_id_sender, user_id_receiver)
     ) messages
WHERE seqnum = ${user_id}

