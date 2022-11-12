INSERT INTO messages(user_id_sender, user_id_receiver, subject, message, date)
VALUES(${user_id_sender}, ${user_id_receiver}, ${subject}, ${message}, now());

INSERT INTO inbox(message_id, user_id1, user_id2, last_message_user_id, subject, last_message, date)
VALUES(lastval(), ${user_id_sender}, ${user_id_receiver}, ${user_id_sender}, ${subject}, ${message}, now())
ON CONFLICT (message_id, user_id1, user_id2, last_message_user_id, subject, last_message, date)
DO
  UPDATE SET
  message_id = lastval(), 
  last_message_user_id = ${user_id_sender},
  subject= ${subject},
  last_message = ${message},
  date = now();

