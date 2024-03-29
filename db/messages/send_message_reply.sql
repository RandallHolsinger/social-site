UPDATE inbox SET
  last_message = ${message},
  date = now()
where conversation_id = ${conversation_id};

INSERT INTO messages(id_sender, id_receiver, conversation_id, message, subject, date)
VALUES(${id_sender}, ${id_receiver}, ${conversation_id}, ${message}, ${subject}, now());