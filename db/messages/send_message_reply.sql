UPDATE inbox SET
  last_message = ${message},
  date = now()
where conversation_id = ${conversation_id};

INSERT INTO messages(id_sender, conversation_id, message, date)
VALUES(${id_sender}, ${conversation_id}, ${message}, now());