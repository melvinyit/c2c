import { profile } from './profile';

export interface car {
    car_id?:number,
    owner?:profile,
    insurance?:car_insurance,
    status?:string,
    vehicle_regis_no?:string,
    rental_rate?:number,
    country_code?:string,
    conntry?:string,
    city?:string,
    images_keys?:string[],
    year?:number,
    maker?:string,
    model?:string,
    trim?:string,
    features_codes?:string,
    description?:string,
    faq?:string,
    extras?:string,
    ccp_flag?:string,
    cdp_flag?:string,
    like_count?:number,
    review_count?:number,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
}

export enum carStatus {
    A='Active',
    D='Deleted'
}
export enum carStatusCode {
    Active='A',
    Deleted='D'
}

export interface car_reserved_date {
    reserved_id?:number,
    car_id?:number,
    date_from?:number,
    date_to?:number,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
}

export interface location_point {
    location_point_id?:number,
    type?:string,
    title?:string,
    address?:string,
    rate?:number,
    lat?:number,
    long?:number,
    description?:string,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
}

export interface car_insurance {
    insurance_id?:number,
    insurance_no?:string,
    type?:string,
    issuer?:string,
    insurance_details_key?:string,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
}

/*
  "car_id" int(11) NOT NULL AUTO_INCREMENT,
  "owner_id" int(11) NOT NULL,
  "insurance_id" int(11) DEFAULT NULL,
  "status" char(1) NOT NULL COMMENT 'A- Active, D - Deleted',
  "vehicle_regis_no" varchar(12) NOT NULL,
  "rental_rate" int(4) NOT NULL COMMENT 'SGD / per day ',
  "country_code" char(2) NOT NULL COMMENT 'country code store in mongo db collection (countries)',
  "city" varchar(25) NOT NULL,
  "images_keys" tinytext NOT NULL COMMENT 'array of images s3 keys (up to 12 photos per car)',
  "year" int(4) NOT NULL COMMENT 'for car query api',
  "maker" varchar(20) NOT NULL COMMENT 'for car query api',
  "model" varchar(20) NOT NULL COMMENT 'for car query api',
  "trim" varchar(128) NOT NULL COMMENT 'for car query api',
  "features_codes" varchar(128) DEFAULT NULL COMMENT 'array of fature codes. feature detail store in mongo db (collection: car_feature)',
  "description" mediumtext,
  "faq" mediumtext,
  "extras" mediumtext,
  "ccp_flag" enum('Y','N') NOT NULL DEFAULT 'N' COMMENT 'custom collection point flag Y - yes , N - no',
  "cdp_flag" enum('Y','N') NOT NULL DEFAULT 'N' COMMENT 'custom delivery point flag Y - yes , N - no',
  "like_count" int(5) NOT NULL DEFAULT '0' COMMENT 'like details store in mongo db (collection: car_like)',
  "review_count" int(5) NOT NULL DEFAULT '0' COMMENT 'review details store in mongo db (collection: car_review)',
  "created_by" int(11) DEFAULT NULL,
  "created_date" bigint(20) unsigned DEFAULT NULL,
  "last_updated_by" int(11) DEFAULT NULL,
  "last_updated_date" bigint(20) unsigned DEFAULT NULL,
  "deleted_by" int(11) DEFAULT NULL,

  "reserved_id" int(11) NOT NULL AUTO_INCREMENT,
  "car_id" int(11) NOT NULL,
  "date_from" bigint(20) unsigned NOT NULL,
  "date_to" bigint(20) unsigned NOT NULL,
  "created_by" int(11) DEFAULT NULL,
  "created_date" bigint(20) unsigned DEFAULT NULL,
  "last_updated_by" int(11) DEFAULT NULL,
  "last_updated_date" bigint(20) unsigned DEFAULT NULL,
  "deleted_by" int(11) DEFAULT NULL,

  "location_point_id" int(11) NOT NULL AUTO_INCREMENT COMMENT 'first 1000 index is static location, there after are custom location',
  "type" enum('S','N') NOT NULL DEFAULT 'N' COMMENT 'the type of collection point, S - default or static point, N - non-static point, custom point declare by user',
  "title" varchar(60) NOT NULL,
  "address" tinytext NOT NULL,
  "rate" smallint(3) NOT NULL DEFAULT '0' COMMENT 'the additional rate for certain delivery point',
  "lat" decimal(9,6) DEFAULT NULL,
  "long" decimal(9,6) DEFAULT NULL,
  "description" mediumtext,
  "created_by" int(11) DEFAULT NULL,
  "created_date" bigint(20) unsigned DEFAULT NULL,
  "last_updated_by" int(11) DEFAULT NULL,
  "last_updated_date" bigint(20) unsigned DEFAULT NULL,
  "deleted_by" int(11) DEFAULT NULL,
  
  "insurance_id" int(11) NOT NULL AUTO_INCREMENT,
  "insurance_no" varchar(45) NOT NULL,
  "type" varchar(1) NOT NULL COMMENT 'C - car, U - user/driver/renter',
  "issuer" varchar(20) NOT NULL COMMENT 'conmapny that issue insurance ',
  "insurance_details_key" varchar(65) NOT NULL COMMENT 'insurance details store in mongo db (collection: insurance_details)\nkey is concat(insurance_id,insurance_no,issuer,type) with delimiter ''|''\n',
  "created_by" int(11) DEFAULT NULL,
  "created_date" bigint(20) unsigned DEFAULT NULL,
  "last_updated_by" int(11) DEFAULT NULL,
  "last_updated_date" bigint(20) unsigned DEFAULT NULL,
  "deleted_by" int(11) DEFAULT NULL,
*/