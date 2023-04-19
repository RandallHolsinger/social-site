-- with new_inbox as (
--   -- add conversation id 
--   INSERT INTO inbox(inbox_id, conversation_id, last_subject, last_message, date)
--   values (${inbox_id}, ${conversation_id}, ${subject}, ${message}, now())
--   on conflict (conversation_id)
--   DO UPDATE SET 
--    last_subject = ${subject},
--    last_message = ${message},
--    date = now()
-- )

UPDATE inbox SET
  last_subject = ${subject},
  last_message = ${message},
  date = now()
where conversation_id = ${conversation_id};

INSERT INTO messages(id_sender, conversation_id, subject, message, date)
VALUES(${id_sender}, ${conversation_id}, ${subject}, ${message}, now());