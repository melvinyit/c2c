import { car_reserved_date, location_point } from './car';
import { profile } from './profile';

export interface book {
    book_id?:number,
    book_details?:book_details,
    status?:string,
    renter?:profile,
    reserved?:car_reserved_date,
    invoice?:invoice,
    car_id?:number,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
}

export interface custombooktiny {
  book_id?:number,
  renter_id?:number,
  car_id?:number,
  book_details_id?:number,
  reserve_id?:number,
  status?:string,
  rental_rate?:number,
  drivers_no?:number,
  date_from?:number,
  date_to?:number,
  reason?:string

}

export enum bookStatus {
  N='New',
  A='Accepted',
  R='Reserved',
  C='Cancelled',
  X='Rejected',
  P='Paid',
  L='On Loan',
  O='Completed',
  D='Deleted'
}
export enum bookStatusCode {
  New='N',
  Accepted='A',
  Reserved='R',
  Cancelled='C',
  Rejected='X',
  Paid='P',
  'On Loan'='L',
  Completed='O',
  Deleted='D'
}

export interface book_details{
    book_details_id?:number,
    collection_point?:location_point,
    dropoff_point?:location_point,
    drivers?:driver[],
    drivers_no?:number,
    reason?:string,
    comments?:string,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
}

export enum bookDetailsReason{
  TR = 'Travel', 
  WE = 'Wedding', 
  HO = 'Holiday', 
  TP = 'Temp Replacement', 
  EV = 'Events', 
  OT = 'Others'
}
export enum bookDetailsReasonCode{
  Travel='TR', 
  Wedding='WE', 
  Holiday='HO', 
  'Temp Replacement'='TP', 
  Events='EV', 
  Others='OT'
}

export interface driver {
    driver_id?:number,
    first_name?:string,
    last_name?:string,
    license?:license,
    insurance?:driver_insurance,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
}

export interface license {
    license_id?:number,
    issuer?:string,
    license_no?:string,
    issue_country?:string,
    exp_in_year?:number,
    license_front_key?:string,
    license_back_key?:string,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
}

export interface invoice {
    invoice_id?:number,
    reference_no?:string,
    status?:string,
    amount?:number,
    type?:string,
    from?:profile,
    to?:profile,
    details_id?:number,
    created_by?:number,
    created_date?:string,
    last_updated_by?:number,
    last_updated_date?:string,
    deleted_by?:number
}

export interface driver_insurance {
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

/*  "book_id" int(11) NOT NULL AUTO_INCREMENT,
"status" varchar(2) NOT NULL COMMENT 'N - new, A - Accepted, R - Reserved, C - Cancelled, X - Rejected, P - Paid, L - On loan, C - Completed, D - Deleted',
"car_id" int(11) NOT NULL,
"renter_id" int(11) NOT NULL,
"reserved_id" int(11) NOT NULL,
"book_details_id" int(11) NOT NULL,
"invoice_id" int(11) DEFAULT NULL,
"created_by" int(11) DEFAULT NULL,
"created_date" bigint(20) unsigned DEFAULT NULL,
"last_updated_by" int(11) DEFAULT NULL,
"last_updated_date" bigint(20) unsigned DEFAULT NULL,
"deleted_by" int(11) DEFAULT NULL,

  "book_details_id" int(11) NOT NULL AUTO_INCREMENT,
  "collection_point_id" int(11) NOT NULL,
  "dropoff_point_id" int(11) NOT NULL,
  "drivers_no" tinyint(4) NOT NULL DEFAULT '1',
  "reason" char(2) NOT NULL COMMENT 'TR - travel, WE - Wedding, HO - Holiday, TP - Temp Replacement,EV - Events, OT - Other',
  "comments" mediumtext,
  "created_by" int(11) DEFAULT NULL,
  "created_date" bigint(20) unsigned DEFAULT NULL,
  "last_updated_by" int(11) DEFAULT NULL,
  "last_updated_date" bigint(20) unsigned DEFAULT NULL,
  "deleted_by" int(11) DEFAULT NULL,
  
"driver_id" int(11) NOT NULL AUTO_INCREMENT,
  "first_name" varchar(45) NOT NULL,
  "last_name" varchar(45) DEFAULT NULL,
  "license_id" int(11) NOT NULL,
  "insurance_id" int(11) NOT NULL,
  "created_by" int(11) DEFAULT NULL,
  "created_date" bigint(20) unsigned DEFAULT NULL,
  "last_updated_by" int(11) DEFAULT NULL,
  "last_updated_date" bigint(20) unsigned DEFAULT NULL,
  "deleted_by" int(11) DEFAULT NULL,

    "license_id" int(11) NOT NULL AUTO_INCREMENT,
  "issuer" varchar(60) NOT NULL DEFAULT 'LTA',
  "license_no" varchar(20) NOT NULL,
  "issue_country" varchar(74) NOT NULL COMMENT 'co',
  "exp_in_year" tinyint(4) DEFAULT NULL COMMENT 'year of experience of driving',
  "license_front_key" varchar(128) DEFAULT NULL COMMENT 'the picture key in S3 for driver license - front view',
  "license_back_key" varchar(128) DEFAULT NULL COMMENT 'the picture key in S3 for driver license - back view',
  "created_by" int(11) DEFAULT NULL,
  "created_date" bigint(20) unsigned DEFAULT NULL,
  "last_updated_by" int(11) DEFAULT NULL,
  "last_updated_date" bigint(20) unsigned DEFAULT NULL,
  "deleted_by" int(11) DEFAULT NULL,

   "invoice_id" int(11) NOT NULL AUTO_INCREMENT,
  "reference_no" char(11) NOT NULL COMMENT 'YYMMDDxxxxH (payment year, payment month, payment date, last 4 digit of invoice id, checksum or random char)',
  "status" char(1) NOT NULL COMMENT 'A - accepted, P -processing, R - rejected, O - Others',
  "amount" decimal(9,4) NOT NULL,
  "type" varchar(15) NOT NULL COMMENT 'payment type (eg visa, nets, cash)',
  "from" int(11) NOT NULL,
  "to" int(11) NOT NULL,
  "details_id" varchar(30) DEFAULT NULL COMMENT 'details store in Mongo db (collection: invoice_details)',
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
