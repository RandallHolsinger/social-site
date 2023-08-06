WITH remove_comment AS (
  DELETE FROM comments WHERE comment_id = ${comment_id}
)
UPDATE posts
  SET comment_count = comment_count - 1
WHERE post_id = ${post_id};