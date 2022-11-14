INSERT INTO conversations(user_id1, user_id2, date)
VALUES(${user_id_sender}, ${user_id_receiver}, now());

INSERT INTO messages(conversation_id, user_id_sender, subject, message, date)
VALUES(lastval(), ${user_id_sender}, ${subject}, ${message}, now());
