UPDATE messages
  SET seen = true
WHERE id_sender = ${friend_uid} AND id_receiver = ${user_id} ;