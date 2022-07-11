UPDATE comments SET
  comment = ${data},
  edited = true
where comment_id = ${comment_id}