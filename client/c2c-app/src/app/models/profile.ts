
export interface profile  {
    profile_id?:number,
    username:string,
    status:string,
    type:string,
    email?:string,
    password?:string,
    salt?:string,
    otp_secret?:string,
    token_secret?:string,
    first_name?:string,
    last_name?:string,
    contact_no?:string,
    image_key?:string,
    address?:string,
    rating?:string,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
};

export interface profileAuth {
    profile_id:number,
    username?:string,
    status?:string,
    type?:string,
    jwt_token:string,
    jwt_exp:number
};

export enum profileStatus {
    PE='Pending',
    AC='Active',
    SU='Suspended',
    DE='Deleted',
    OT='Others'
};
//reverse mapping
export enum profileStatusCode {
    Pending='PE',
    Active='AE',
    Suspended='SU',
    Deleted='DE',
    Others='OT'
};

export enum profileType {
    A='Admin',
    R='Renter',
    O='Car Owner',
    M='Moderator',
};
//reverse mapping
export enum profileTypeCode {
    Admin='A',
    Renter='R',
    'Car Owner'='O',
    Moderator='M'
};

/*
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
  */