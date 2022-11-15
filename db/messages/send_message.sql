INSERT INTO messages(user_id_sender, subject, message, date)
VALUES(${user_id_sender}, ${subject}, ${message}, now());

CREATE OR REPLACE FUNCTION check_conversation_exists() RETURNS trigger AS $$
BEGIN
  IF ((${user_id_sender} = conversations.user_id1 AND ${user_id_receiver} = conversations.user_id2) 
     OR (${user_id_receiver} = conversations.user_id1 AND user_id_sender = conversations.user_id2))
    THEN UPDATE inbox
      SET 
        user_id2 = ${user_id_receiver},
        last_message_user_id = ${user_id_sender},
        last_subject = ${subject},
        last_message = ${message},
        date = now()
      WHERE (${user_id_sender} = conversations.user_id1 AND ${user_id_receiver} = conversations.user_id2) 
         OR (${user_id_receiver} = conversations.user_id1 AND ${user_id_sender} = conversations.user_id2);
  ELSE
    INSERT INTO conversations(user_id1, user_id2, date)
    VALUES(${user_id_sender}, ${user_id_receiver}, now());
    INSERT INTO inbox(user_id2, last_message_user_id, last_subject, last_message, date)
    VALUES(${user_id_receiver}, ${user_id_sender}, ${subject}, ${message}, now());
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_conversation 
BEFORE INSERT on messages FOR EACH STATEMENT EXECUTE FUNCTION check_conversation_exists();


