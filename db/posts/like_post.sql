WITH like_post AS (
  INSERT INTO liked_posts (post_id, user_id, date)
  VALUES (${post_id}, ${user_id}, now())
)
UPDATE posts
 SET likes = likes + 1
WHERE post_id = ${post_id};