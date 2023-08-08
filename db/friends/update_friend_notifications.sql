UPDATE friends
  SET seen = true
WHERE target_id = ${user_id}