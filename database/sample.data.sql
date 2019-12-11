use `c2cdb`;

#insert into profile
INSERT INTO `c2cdb`.`profile` (`profile_id`, `username`, `status`, `type`, `password`, `salt`, `first_name`, `email`, `contact_no`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES ('10000', 'test1', 'AC', 'A', 'password', 'salt', 'test1 name', 'test@test.com', '12345678', '0', '0', '0', '0');

#insert into car
INSERT INTO `c2cdb`.`car` (`car_id`, `owner_id`, `status`, `vehicle_regis_no`, `rental_rate`, `country_code`, `city`, `images_keys`, `year`, `maker`, `model`, `trim`, `like_count`, `review_count`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES ('10000', '10000', 'A', 'SXX1234B', '40', 'SG', 'Singapore', '[key]', '1990', 'hyndai', 'model', 'trimed data', '0', '0', '1', '1', '1', '1');
INSERT INTO `c2cdb`.`car` (`car_id`, `owner_id`, `status`, `vehicle_regis_no`, `rental_rate`, `country_code`, `city`, `images_keys`, `year`, `maker`, `model`, `trim`, `like_count`, `review_count`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES ('10001', '10000', 'A', 'SXX1234C', '40', 'SG', 'Singapore', '[key]', '1990', 'hyndai', 'model', 'trimed data', '0', '0', '1', '1', '1', '1');
