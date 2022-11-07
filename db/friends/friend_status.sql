-- user_id is the user that is stored in the session.
-- user_id2 is the user_id from profile.
-- checks for a matched record between both users.

SELECT * FROM friends
WHERE (target_id = ${user_id} OR source_id = ${user_id})
AND (target_id = ${user_id2} OR source_id = ${user_id2})
