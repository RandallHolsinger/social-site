UPDATE posts SET 
  post = ${data},
  edited = true
WHERE post_id = ${post_id}