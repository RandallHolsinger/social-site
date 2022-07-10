UPDATE users SET
  email = COALESCE($2, email),
  dob = COALESCE($3, dob),
  city = COALESCE($4, city),
  state = COALESCE($5, state),
  about_me = COALESCE(#6, about_me)
WHERE user_id = $1
