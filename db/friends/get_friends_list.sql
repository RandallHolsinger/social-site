SELECT * FROM friends as f
JOIN (SELECT user_id, first_name, last_name, profile_img FROM users) AS u ON (
 CASE WHEN f.source_id = ${user_id} THEN f.target_id 
         WHEN f.target_id = ${user_id} THEN f.source_id
    END) = u.user_id
WHERE (f.source_id = ${user_id} OR f.target_id = ${user_id}) AND (f.friend_status = 'friend')