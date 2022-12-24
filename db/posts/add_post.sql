WITH new_post as (
INSERT INTO posts(user_id, title, post, date)
VALUES(${user_id}, ${titleInput}, ${postInput}, now())
returning post_id
)
INSERT INTO images(post_id, image_file, date)
VALUES((select post_id from new_post), ${filename}, now());