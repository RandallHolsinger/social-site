WITH dislike_post AS (
  DELETE FROM liked_posts
  WHERE post_id = ${post_id} AND user_id = ${user_id}
)
UPDATE posts
 SET likes = likes - 1
WHERE post_id = ${post_id};