UPDATE users SET
  city = COALESCE(NULLIF(${city}, ''), city),
  state_province = COALESCE(NULLIF(${state_province}, ''), state_province),
  dob = COALESCE(NULLIF(${dob}, ''), dob),
  occupation = COALESCE(NULLIF(${occupation}, ''), occupation),
  high_school = COALESCE(NULLIF(${high_school}, ''), high_school),
  college = COALESCE(NULLIF(${college}, ''), college),
  about_me = COALESCE(NULLIF(${about_me}, ''), about_me)
WHERE user_id = ${user_id}
