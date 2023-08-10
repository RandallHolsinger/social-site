UPDATE messages
  SET seen = true
WHERE conversation_id = ${conversation_id} AND id_receiver = ${user_id} AND seen IS NOT NULL;
UPDATE inbox
  SET seen = true
WHERE owner_id = ${user_id} AND conversation_id = ${conversation_id};