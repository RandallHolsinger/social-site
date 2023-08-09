SELECT count(*) from messages
WHERE id_receiver = ${user_id} AND seen = false;