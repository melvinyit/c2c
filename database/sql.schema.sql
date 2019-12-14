drop schema if exists `c2cdb`;

create schema `c2cdb`;

use `c2cdb`;

CREATE TABLE `c2cdb`.`profile` (
  `profile_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `status` CHAR(2) NOT NULL COMMENT 'PE - Pending, AC - Active,  SU - Suspended, DE - Deleted, OT - Others',
  `type` CHAR(1) NOT NULL COMMENT 'A - admin, R - renter, O - car owner, M - moderator',
  `password` VARCHAR(128) NOT NULL COMMENT 'up to 512bit hashing',
  `salt` CHAR(4) NOT NULL,
  `otp_secret` VARCHAR(128) NULL,
  `token_secret` VARCHAR(128) NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(128) NOT NULL,
  `contact_no` VARCHAR(15) NOT NULL,
  `image_key` VARCHAR(128) NULL,
  `address` TINYTEXT NULL,
  `rating` DECIMAL(2,1) NULL DEFAULT 0,
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`profile_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  INDEX `idx_status` (`status` ASC) INVISIBLE,
  INDEX `idx_type` (`type` ASC) INVISIBLE,
  INDEX `idx_rating` (`rating` ASC) VISIBLE);
  
ALTER TABLE `c2cdb`.`profile` AUTO_INCREMENT=101;

CREATE TABLE `c2cdb`.`insurance` (
  `insurance_id` INT NOT NULL AUTO_INCREMENT,
  `insurance_no` VARCHAR(45) NOT NULL,
  `type` VARCHAR(1) NOT NULL COMMENT 'C - car, U - user/driver/renter',
  `issuer` VARCHAR(20) NOT NULL COMMENT 'conmapny that issue insurance ',
  `insurance_details_key` VARCHAR(65) NOT NULL COMMENT 'insurance details store in mongo db (collection: insurance_details)\nkey is concat(insurance_id,insurance_no,issuer,type) with delimiter \'|\'\n',
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`insurance_id`));
  
CREATE TABLE `c2cdb`.`car` (
  `car_id` INT NOT NULL AUTO_INCREMENT,
  `owner_id` INT NOT NULL,
  `insurance_id` INT NULL,
  `status` CHAR(1) NOT NULL COMMENT 'A- Active, D - Deleted',
  `vehicle_regis_no` varchar(12) NOT NULL,
  `rental_rate` INT(4) NOT NULL COMMENT 'SGD / per day ',
  `country_code` CHAR(2) NOT NULL COMMENT 'country code store in mongo db collection (countries)',
  `city` VARCHAR(25) NOT NULL,
  `images_keys` TINYTEXT NULL COMMENT 'array of images s3 keys (up to 12 photos per car) delimiter |',
  `year` INT(4) NOT NULL COMMENT 'for car query api',
  `maker` VARCHAR(20) NOT NULL COMMENT 'for car query api',
  `model` VARCHAR(20) NOT NULL COMMENT 'for car query api',
  `trim` VARCHAR(128) NOT NULL COMMENT 'for car query api',
  `features_codes` VARCHAR(128) NULL COMMENT 'array of fature codes. feature detail store in mongo db (collection: car_feature)',
  `description` MEDIUMTEXT NULL,
  `faq` MEDIUMTEXT NULL,
  `extras` MEDIUMTEXT NULL,
  `ccp_flag` ENUM('Y', 'N') NOT NULL DEFAULT 'N' COMMENT 'custom collection point flag Y - yes , N - no',
  `cdp_flag` ENUM('Y', 'N') NOT NULL DEFAULT 'N' COMMENT 'custom delivery point flag Y - yes , N - no',
  `like_count` INT(5) NOT NULL DEFAULT 0 COMMENT 'like details store in mongo db (collection: car_like)',
  `review_count` INT(5) NOT NULL DEFAULT 0 COMMENT 'review details store in mongo db (collection: car_review)',
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`car_id`),
  INDEX `fk_car_owner_idx` (`owner_id` ASC) VISIBLE,
  INDEX `fk_car_insurance_idx` (`insurance_id` ASC) VISIBLE,
  UNIQUE KEY `vehicle_regis_no_UNIQUE` (`vehicle_regis_no`),
  INDEX `idx_status` (`status` ASC) INVISIBLE,
  INDEX `idx_rentalrate` (`rental_rate` ASC) INVISIBLE,
  INDEX `idx_country_city` (`country_code` ASC, `city` ASC) INVISIBLE,
  INDEX `idx_liked` (`like_count` ASC) VISIBLE,
  CONSTRAINT `fk_car_insurance`
  FOREIGN KEY (`insurance_id`)
  REFERENCES `c2cdb`.`insurance` (`insurance_id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE,
  CONSTRAINT `fk_car_owner`
    FOREIGN KEY (`owner_id`)
    REFERENCES `c2cdb`.`profile` (`profile_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT);
    
CREATE TABLE `c2cdb`.`reserved` (
  `reserved_id` INT NOT NULL AUTO_INCREMENT,
  `car_id` INT NOT NULL,
  `date_from` BIGINT UNSIGNED NOT NULL,
  `date_to` BIGINT UNSIGNED NOT NULL,
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`reserved_id`),
  INDEX `fk_reserved_car_idx` (`car_id` ASC) VISIBLE,
  CONSTRAINT `fk_reserved_car`
    FOREIGN KEY (`car_id`)
    REFERENCES `c2cdb`.`car` (`car_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `c2cdb`.`location_point` (
  `location_point_id` INT NOT NULL AUTO_INCREMENT COMMENT 'first 1000 index is static location, there after are custom location',
  `type` ENUM('S', 'N') NOT NULL DEFAULT 'N' COMMENT 'the type of collection point, S - default or static point, N - non-static point, custom point declare by user',
  `title` VARCHAR(60) NOT NULL,
  `address` TINYTEXT NOT NULL,
  `rate` SMALLINT(3) NOT NULL DEFAULT 0 COMMENT 'the additional rate for certain delivery point',
  `lat` DECIMAL(9,6) NULL,
  `long` DECIMAL(9,6) NULL,
  `description` MEDIUMTEXT NULL,
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`location_point_id`));
  
ALTER TABLE `c2cdb`.`location_point` AUTO_INCREMENT=1001;
  
#remove car_location_point_junction (disallow car owner to choose pickup and dropoff point for assessment  
CREATE TABLE `c2cdb`.`car_location_point_junction` (
  `car_location_point_id` INT NOT NULL AUTO_INCREMENT,
  `car_id` INT NOT NULL,
  `location_point_id` INT NOT NULL,
  `type` ENUM('C', 'D') NOT NULL COMMENT 'C - Collection point, D - Dropoff point',
  PRIMARY KEY (`car_location_point_id`),
  INDEX `fk_car_location_point_car_idx` (`car_id` ASC) VISIBLE,
  INDEX `fk_car_location_point_lp_idx` (`location_point_id` ASC) VISIBLE,
  INDEX `idx_type` (`type` ASC) VISIBLE,
  CONSTRAINT `fk_car_location_point_car`
    FOREIGN KEY (`car_id`)
    REFERENCES `c2cdb`.`car` (`car_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_car_location_point_lp`
    FOREIGN KEY (`location_point_id`)
    REFERENCES `c2cdb`.`location_point` (`location_point_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `c2cdb`.`license` (
  `license_id` INT NOT NULL AUTO_INCREMENT,
  `issuer` VARCHAR(60) NOT NULL DEFAULT 'LTA',
  `license_no` VARCHAR(20) NOT NULL,
  `issue_country` VARCHAR(74) NOT NULL COMMENT 'co',
  `exp_in_year` TINYINT NULL COMMENT 'year of experience of driving',
  `license_front_key` VARCHAR(128) NULL COMMENT 'the picture key in S3 for driver license - front view',
  `license_back_key` VARCHAR(128) NULL COMMENT 'the picture key in S3 for driver license - back view',
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`license_id`));
  
CREATE TABLE `c2cdb`.`driver` (
  `driver_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NULL,
  `license_id` INT NOT NULL,
  `insurance_id` INT NULL,
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`driver_id`),
  INDEX `fk_driver_license_idx` (`license_id` ASC) VISIBLE,
  INDEX `fk_driver_insurance_idx` (`insurance_id` ASC) VISIBLE,
  CONSTRAINT `fk_driver_license`
    FOREIGN KEY (`license_id`)
    REFERENCES `c2cdb`.`license` (`license_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_driver_insurance`
    FOREIGN KEY (`insurance_id`)
    REFERENCES `c2cdb`.`insurance` (`insurance_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `c2cdb`.`invoice` (
  `invoice_id` INT NOT NULL AUTO_INCREMENT,
  `reference_no` CHAR(11) NOT NULL COMMENT 'YYMMDDxxxxH (payment year, payment month, payment date, last 4 digit of invoice id, checksum or random char)',
  `status` CHAR(1) NOT NULL COMMENT 'A - accepted, P -processing, R - rejected, O - Others',
  `amount` DECIMAL(9,4) NOT NULL,
  `type` VARCHAR(15) NOT NULL COMMENT 'payment type (eg visa, nets, cash)',
  `from` INT NOT NULL,
  `to` INT NOT NULL,
  `details_id` VARCHAR(30) NULL COMMENT 'details store in Mongo db (collection: invoice_details)',
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`invoice_id`),
  INDEX `idx_reference_no` (`reference_no` ASC) INVISIBLE,
  UNIQUE INDEX `reference_no_UNIQUE` (`reference_no` ASC) INVISIBLE,
  INDEX `fk_invoice_profile_to_idx` (`to` ASC) VISIBLE,
  INDEX `fk_invoice_profile_from_idx` (`from` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_profile_to`
    FOREIGN KEY (`to`)
    REFERENCES `c2cdb`.`profile` (`profile_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_invoice_profile_from`
    FOREIGN KEY (`from`)
    REFERENCES `c2cdb`.`profile` (`profile_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `c2cdb`.`book_details` (
  `book_details_id` INT NOT NULL AUTO_INCREMENT,
  `collection_point_id` INT NOT NULL,
  `dropoff_point_id` INT NOT NULL,
  `drivers_no` TINYINT NOT NULL DEFAULT 1,
  `reason` CHAR(2) NOT NULL COMMENT 'TR - travel, WE - Wedding, HO - Holiday, TP - Temp Replacement,EV - Events, OT - Other',
  `total_days_rented` INT NULL DEFAULT 1,
  `comments` MEDIUMTEXT NULL,
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`book_details_id`),
  INDEX `fk_book_details_location_c_idx` (`collection_point_id` ASC) VISIBLE,
  INDEX `fk_book_details_location_d_idx` (`dropoff_point_id` ASC) VISIBLE,
    CONSTRAINT `fk_book_details_location_c`
    FOREIGN KEY (`collection_point_id`)
    REFERENCES `c2cdb`.`location_point` (`location_point_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_book_details_location_d`
    FOREIGN KEY (`dropoff_point_id`)
    REFERENCES `c2cdb`.`location_point` (`location_point_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);
  
CREATE TABLE `c2cdb`.`book` (
  `book_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(2) NOT NULL COMMENT 'N - new, A - Accepted, R - Reserved, C - Cancelled, X - Rejected, P - Paid, L - On loan, O - Completed, D - Deleted',
  `car_id` INT NOT NULL,
  `renter_id` INT NOT NULL,
  `reserved_id` INT NOT NULL,
  `book_details_id` INT NOT NULL,
  `invoice_id` INT NULL,
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE INDEX `invoice_id_UNIQUE` (`invoice_id` ASC) VISIBLE,
  INDEX `fk_book_car_idx` (`car_id` ASC) VISIBLE,
  INDEX `fk_book_profile_renter_idx` (`renter_id` ASC) VISIBLE,
  INDEX `fk_book_reserved_idx` (`reserved_id` ASC) VISIBLE,
  INDEX `fk_book_book_details_idx` (`book_details_id` ASC) VISIBLE,
  INDEX `fk_book_invoice_idx` (`invoice_id` ASC) VISIBLE,
  INDEX `idx_status` (`status` ASC) VISIBLE,
  CONSTRAINT `fk_book_car`
    FOREIGN KEY (`car_id`)
    REFERENCES `c2cdb`.`car` (`car_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_book_profile_renter`
    FOREIGN KEY (`renter_id`)
    REFERENCES `c2cdb`.`profile` (`profile_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_book_reserved`
    FOREIGN KEY (`reserved_id`)
    REFERENCES `c2cdb`.`reserved` (`reserved_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_book_book_details`
    FOREIGN KEY (`book_details_id`)
    REFERENCES `c2cdb`.`book_details` (`book_details_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_book_invoice`
    FOREIGN KEY (`invoice_id`)
    REFERENCES `c2cdb`.`invoice` (`invoice_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);
    
CREATE TABLE `c2cdb`.`book_driver_junction` (
  `book_driver_id` INT NOT NULL AUTO_INCREMENT,
  `book_details_id` INT NOT NULL,
  `driver_id` INT NOT NULL,
  PRIMARY KEY (`book_driver_id`),
  INDEX `fk_book_driver_book_details_idx` (`book_details_id` ASC) VISIBLE,
  INDEX `fk_book_driver_driver_idx` (`driver_id` ASC) VISIBLE,
  CONSTRAINT `fk_book_driver_book_details`
    FOREIGN KEY (`book_details_id`)
    REFERENCES `c2cdb`.`book_details` (`book_details_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_book_driver_driver`
    FOREIGN KEY (`driver_id`)
    REFERENCES `c2cdb`.`driver` (`driver_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);
    
CREATE TABLE `c2cdb`.`tag` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `profile_id` INT NOT NULL,
  `car_id` INT NOT NULL,
  `created_by` INT NULL,
  `created_date` BIGINT UNSIGNED NULL,
  `last_updated_by` INT NULL,
  `last_updated_date` BIGINT UNSIGNED NULL,
  `deleted_by` INT NULL,
  PRIMARY KEY (`tag_id`),
  INDEX `fk_tag_profile_idx` (`profile_id` ASC) VISIBLE,
  INDEX `fk_tag_car_idx` (`car_id` ASC) VISIBLE,
  CONSTRAINT `fk_tag_profile`
    FOREIGN KEY (`profile_id`)
    REFERENCES `c2cdb`.`profile` (`profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tag_car`
    FOREIGN KEY (`car_id`)
    REFERENCES `c2cdb`.`car` (`car_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
commit;    