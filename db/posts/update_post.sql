UPDATE posts SET 
  title = ${title},
  post = ${data},
  edited = true
WHERE post_id = ${post_id};

Update images SET
  image_file = ${filename}
WHERE post_id = ${post_id};