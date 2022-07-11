UPDATE friends SET
 accepted = true
WHERE user_id_sent = ${user_id_sent} AND user_id_recieved = ${user_id_recieved}