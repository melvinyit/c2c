use `c2cdb`;

#insert into profile
INSERT INTO `c2cdb`.`profile` (`profile_id`, `username`, `status`, `type`, `password`, `salt`, `first_name`, `email`, `contact_no`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES ('10000', 'test1', 'AC', 'A', 'password', 'salt', 'test1 name', 'test@test.com', '12345678', '0', '0', '0', '0');
INSERT INTO `c2cdb`.`profile` (`profile_id`, `username`, `status`, `type`, `password`, `salt`, `first_name`, `last_name`, `email`, `contact_no`, `image_key`, `address`, `rating`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES ('10001', 'test2', 'AC', 'A', 'password', 'salt', 'firstname', 'lastname', 'email', 'contactno', 'key', 'address', '0.0', '0', '0', '0', '0');

#insert into car
INSERT INTO `c2cdb`.`car` (`car_id`, `owner_id`, `status`, `vehicle_regis_no`, `rental_rate`, `country_code`, `city`, `images_keys`, `year`, `maker`, `model`, `trim`, `like_count`, `review_count`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES ('10000', '10000', 'A', 'SXX1234B', '40', 'SG', 'Singapore', '[key]', '1990', 'hyndai', 'model', 'trimed data', '0', '0', '1', '1', '1', '1');
INSERT INTO `c2cdb`.`car` (`car_id`, `owner_id`, `status`, `vehicle_regis_no`, `rental_rate`, `country_code`, `city`, `images_keys`, `year`, `maker`, `model`, `trim`, `like_count`, `review_count`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES ('10001', '10000', 'A', 'SXX1234C', '40', 'SG', 'Singapore', '[key]', '1990', 'hyndai', 'model', 'trimed data', '0', '0', '1', '1', '1', '1');

#location point
INSERT INTO `c2cdb`.`location_point` (`location_point_id`, `type`, `title`, `address`, `rate`, `lat`, `long`) VALUES ('1', 'S', 'Airport', 'Airport address', '20', '1.369569', '103.991702');
INSERT INTO `c2cdb`.`location_point` (`location_point_id`, `type`, `title`, `address`, `rate`, `lat`, `long`) VALUES ('2', 'S', 'AMK', 'AMK address', '5', '1.426388', '103.991702');
INSERT INTO `c2cdb`.`location_point` (`location_point_id`,`type`, `title`, `address`, `rate`, `lat`, `long`) VALUES ('3','S', 'Woodland', 'woodland address', '5', '1.369569', '103.863011');

INSERT INTO `c2cdb`.`car_location_point_junction` (`car_id`, `location_point_id`, `type`) VALUES ('10000', '1', 'C');
INSERT INTO `c2cdb`.`car_location_point_junction` (`car_id`, `location_point_id`, `type`) VALUES ('10000', '2', 'C');
INSERT INTO `c2cdb`.`car_location_point_junction` (`car_id`, `location_point_id`, `type`) VALUES ('10000', '3', 'C');
INSERT INTO `c2cdb`.`car_location_point_junction` (`car_id`, `location_point_id`, `type`) VALUES ('10000', '1', 'D');
INSERT INTO `c2cdb`.`car_location_point_junction` (`car_id`, `location_point_id`, `type`) VALUES ('10000', '3', 'D');
INSERT INTO `c2cdb`.`car_location_point_junction` (`car_id`, `location_point_id`, `type`) VALUES ('10001', '1', 'C');
INSERT INTO `c2cdb`.`car_location_point_junction` (`car_id`, `location_point_id`, `type`) VALUES ('10001', '1', 'D');

commit;