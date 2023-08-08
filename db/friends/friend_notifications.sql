select count(*) from friends
where target_id = ${user_id} and seen = false;