INSERT INTO messages(user_id_sender, user_id_receiver, subject, message, date)
values(${user_id_sender}, ${user_id_receiver}, ${subject}, ${message}, now());
