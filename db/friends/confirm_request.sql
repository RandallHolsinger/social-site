UPDATE friends SET
  friend_status = 'accepted'
WHERE user_id_recieved = {user_id} friend_id = ${friend_id}