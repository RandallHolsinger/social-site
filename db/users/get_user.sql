SELECT user_id, first_name, last_name, dob, city, state_province, 
occupation, high_school, college, profile_img, about_me 
FROM users 
WHERE user_id = ${user_id}