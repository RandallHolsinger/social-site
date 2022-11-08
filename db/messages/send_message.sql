-- writes message into the Messages Table 
INSERT INTO messages(user_id_sender, user_id_reciever, subject, message, date)
values(${user_id_sender}, ${user_id_reciever}, ${subject}, ${message}, now())
returning message_id
-- Then takes the message_id and writes the data to the inbox table
INSERT INTO inbox (message_id, last_message_user_id, subject, message, date)
values (message_id, user_id_sender, subject, mmessage, now());