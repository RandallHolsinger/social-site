INSERT INTO friends(user_id_sent, user_id_recieved, friend_status, date)
VALUES(${user_id_sender}, ${user_id_reciever}, 'sent', now())