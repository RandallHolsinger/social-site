INSERT INTO messages(user_id_sender, user_id_reciever, subject, message, date)
values($1, $2, $3, $4, now())