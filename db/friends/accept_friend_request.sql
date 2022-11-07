UPDATE friends SET friend_status = 'friend'
WHERE source_id = ${source_id} AND target_id = ${target_id}