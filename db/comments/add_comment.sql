WITH new_comment AS (
  INSERT INTO comments(user_id, post_id, comment, date)
  VALUES(${user_id}, ${post_id}, ${data}, now())
)
UPDATE posts
  SET comment_count = comment_count + 1
WHERE post_id = ${post_id};