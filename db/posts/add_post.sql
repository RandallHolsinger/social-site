WITH new_post as (
INSERT INTO posts(user_id, title, post, date)
VALUES(${user_id}, ${titleInput}, ${postInput}, now());
returning post_id
), new_image as (
  INSERT INTO images(post_id, image_path, date)
  select post_id from new_post
  VALUES(post_id, ${file}, now())
);