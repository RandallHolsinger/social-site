UPDATE posts SET 
  post = ${data},
  edited = true
WHERE user_id = ${user_id}