UPDATE users SET
  city = COALESCE(${city}, city),
  state_province = COALESCE(${state_province}, state_province),
  dob = COALESCE(${dob}, dob),
  occupation = COALESCE(${occupation}, occupation),
  high_school = COALESCE(${high_school}, high_school),
  college = COALESCE(${college}, college),
  about_me = COALESCE(${about_me}, about_me)
WHERE user_id = ${user_id}
