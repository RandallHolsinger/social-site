with new_inbox as (
  INSERT INTO inbox(inbox_id, last_subject, last_message, date)
  values (${inbox_id}, ${subject}, ${message}, now())
  on conflict (conversation_id)
  DO UPDATE SET 
   last_subject = ${subject},
   last_message = ${message},
   date = now()
)

INSERT INTO messages(id_sender, inbox_id, subject, message, date)
VALUES(${id_sender}, ${inbox_id}, ${subject}, ${message}, now());