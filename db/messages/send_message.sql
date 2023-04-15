WITH new_conversation AS (
  INSERT INTO conversations(user_id_1, user_id_2, date)
  VALUES(${id_sender}, ${id_receiver}, now())
  returning conversation_id
), 
new_inbox AS (
  INSERT INTO inbox(owner_id, conversation_id, friend_uid, last_sent_id, last_subject, last_message, date)
    VALUES(${id_sender}, (select conversation_id from new_conversation), ${id_receiver}, ${id_sender}, ${subject}, ${message}, now()),
          (${id_receiver}, (select conversation_id from new_conversation), ${id_sender}, ${id_sender}, ${subject}, ${message}, now())
)
INSERT INTO messages(id_sender, conversation_id, subject, message, date)
VALUES(${id_sender}, (select conversation_id from new_conversation), ${subject}, ${message}, now());

