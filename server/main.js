//Loading lib
const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');
const aws = require('aws-sdk');
const mysql = require('mysql');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const crypto = require("crypto");
//const passport = require('passport');
const jwt = require('jsonwebtoken');
const otplib = require('otplib');
const qrcode = require('qrcode');

//database util
const sql = require('./util.sql');
const s3Util = require('./util.bucket');
const initDb = require('./init.db');

//config
const APPNAME = 'c2c-app';
const PORT = parseInt(process.argv[2] || process.env.APP_PORT || process.env.PORT) || 3000;
const SERVER_JWT_SECRET = 'secretkeyforjwtTODO-Generate';
const dbConf = require('./conf.db');
dbConf.mysql.ssl = {ca: fs.readFileSync(dbConf.mysql.cacert)};

//sql
const pool = mysql.createPool(dbConf.mysql);
//mongo
const client = new MongoClient(dbConf.mongodb.url,{ useUnifiedTopology: true });

const mongoBook = () => client.db('c2c').collection('BookHistory');
//s3
const s3 = new aws.S3({
	endpoint: new aws.Endpoint(dbConf.s3.endpoint),
	accessKeyId: dbConf.s3.accessKey,
	secretAccessKey: dbConf.s3.secret
});
const bucketProfileImages = s3Util.bucket(s3,'c2c','images/profile');
const bucketCarImages = s3Util.bucket(s3,'c2c','images/car');
const butketImagesURL = 'https://c2c.sgp1.digitaloceanspaces.com/images/';

const mUpload = multer({ dest: path.join(__dirname,'/tmp' )});
const app = express();
const carRouter = express.Router();
const bookingRouter = express.Router();
const profileRouter = express.Router();
const carSecureRouter = express.Router();
const bookingSecureRouter = express.Router();
const profileSecureRouter = express.Router();




//MYSQL DB area
const CREATEPROFILE = 'INSERT INTO `profile` SET ?';
const CREATECAR = 'INSERT INTO `car` SET ?';
const UPDATEBOOKSTATUSBYID = 'update book set status = ? where book_id = ?';
const UPDATEPROFILEBTID = 'update `profile` set ? where profile_id = ?';
const UPDATEPROFILEOTPBYID = 'update `profile` set otp_secret=? where profile_id = ?';
const GETPROFILEOTPBYID = 'select otp_secret from `profile` where profile_id = ?';
const GETLISTOFCARS = 'SELECT p.username,p.first_name,p.last_name,p.image_key,c.* FROM `car` c JOIN `profile` p ON c.owner_id=p.profile_id LIMIT ? OFFSET ?';
const GETPROFILEFORAUTH = 'SELECT profile_id,username,password,salt,status,type,otp_secret FROM `profile` WHERE `username`=?';
const GETPROFILEBYID = 'SELECT * from `profile` where `profile_id`=?';
const GETBOOKINGBYOWNERID = 'SELECT b.*,c.rental_rate,bd.drivers_no,bd.reason,r.date_from,r.date_to,c.model,c.maker,c.images_keys FROM `book` b JOIN `car` c ON b.car_id=c.car_id JOIN `book_details` bd ON b.book_details_id=bd.book_details_id JOIN `reserved` r ON r.reserved_id=b.reserved_id WHERE c.owner_id=?';
const GETBOOKINGBYRENTERID = 'SELECT b.*,c.rental_rate,bd.drivers_no,bd.reason,r.date_from,r.date_to,c.model,c.maker,c.images_keys FROM `book` b JOIN `car` c ON b.car_id=c.car_id JOIN `book_details` bd ON b.book_details_id=bd.book_details_id JOIN `reserved` r ON r.reserved_id=b.reserved_id WHERE b.renter_id=?';
const GETBOOKDETAILSBYID = 'select * from book where book_id=?';
const GETCARSBYOWNERID = 'select * from car where owner_id=?';
const GETCARBYID = 'SELECT p.first_name,p.last_name,p.email,p.contact_no,p.image_key,c.* from `car` c JOIN `profile` p on p.profile_id=c.owner_id WHERE `car_id`= ?';
const GETRESERVEDBYCARID = 'select * from reserved where car_id = ?'
const GETLOCATION_POINT = 'select * from location_point';

const insertIntoProfile = sql.mkQueryFromPool(sql.mkQuery(CREATEPROFILE),pool);
const insertIntoCar = sql.mkQueryFromPool(sql.mkQuery(CREATECAR),pool);
const updatebookstatusbyid = sql.mkQueryFromPool(sql.mkQuery(UPDATEBOOKSTATUSBYID),pool);
const updateProfileById = sql.mkQueryFromPool(sql.mkQuery(UPDATEPROFILEBTID),pool);
const updateProfileOTPById = sql.mkQueryFromPool(sql.mkQuery(UPDATEPROFILEOTPBYID),pool);
const selectProfileOTPById = sql.mkQueryFromPool(sql.mkQuery(GETPROFILEOTPBYID),pool);
const selectListCarsPagination = sql.mkQueryFromPool(sql.mkQuery(GETLISTOFCARS),pool);
const selectProfileForAuth = sql.mkQueryFromPool(sql.mkQuery(GETPROFILEFORAUTH),pool);
const selectProfileById = sql.mkQueryFromPool(sql.mkQuery(GETPROFILEBYID),pool);
const selectBookByOwnerId = sql.mkQueryFromPool(sql.mkQuery(GETBOOKINGBYOWNERID),pool);
const selectBookByRenterId = sql.mkQueryFromPool(sql.mkQuery(GETBOOKINGBYRENTERID),pool);
const selectbookbyid = sql.mkQueryFromPool(sql.mkQuery(GETBOOKDETAILSBYID),pool);
const selectCarByOwnerId = sql.mkQueryFromPool(sql.mkQuery(GETCARSBYOWNERID),pool);
const selectCarById = sql.mkQueryFromPool(sql.mkQuery(GETCARBYID),pool);
const selectreservedBycarId = sql.mkQueryFromPool(sql.mkQuery(GETRESERVEDBYCARID),pool);
const selectalllocationpoint = sql.mkQueryFromPool(sql.mkQuery(GETLOCATION_POINT),pool);

//aggeregate
const GETCARMONEY = 'select sum(c.rental_rate) as total_rent, sum(bd.total_days_rented)as total_days,sum(ld.rate) as total_dropoff_rate,sum(lc.rate) as total_collection_rate,sum(c.rental_rate*bd.total_days_rented+ld.rate+lc.rate)as total_rate from book b join book_details bd on b.book_details_id=bd.book_details_id join location_point ld on ld.location_point_id = bd.dropoff_point_id join location_point lc on lc.location_point_id = bd.collection_point_id join car c on c.car_id=b.car_id where c.car_id = ?';
const getCarMoney = sql.mkQueryFromPool(sql.mkQuery(GETCARMONEY),pool);

//other transaction
const UPDATEPROFILEIMAGE = 'update `profile` set `image_key`=? where profile_id=?';
const updateProfileImageQuery = sql.mkQuery(UPDATEPROFILEIMAGE);
const UPDATECARIMAGE = 'update `car` set `images_keys`=? where car_id=?';
const updateCarImageQuery = sql.mkQuery(UPDATECARIMAGE);

//retrive booking 
const GETBOOKFULLBYID = 'select b.*,bd.*,r.*,p.first_name,p.last_name,p.contact_no,p.email,p.image_key from book b join book_details bd on b.book_details_id=bd.book_details_id join reserved r on r.reserved_id=b.reserved_id join `profile` p on p.profile_id = b.renter_id where b.book_id = ?';
const GETCARBYBOOKID = 'select c.*,p.first_name,p.last_name,p.contact_no,p.email,p.image_key from book b join car c on c.car_id=b.car_id join `profile` p on p.profile_id = c.owner_id where b.book_id =?';
const GETCOLLECTIONPOINTBYBOOKID = 'select l.* from book b join book_details bd on b.book_details_id=bd.book_details_id join location_point l on l.location_point_id = bd.collection_point_id where b.book_id = ?';
const GETDROPOFFPOINTBYBOOKID = 'select l.* from book b join book_details bd on b.book_details_id=bd.book_details_id join location_point l on l.location_point_id = bd.dropoff_point_id where b.book_id = ?';
const GETDRIVERSBYBOOKID = 'select d.*,l.* from book b join book_details bd on b.book_details_id=bd.book_details_id join book_driver_junction j on bd.book_details_id=j.book_details_id join driver d on d.driver_id=j.driver_id join license l on l.license_id = d.license_id where b.book_id=?';
const GETMONEY = 'select c.rental_rate, bd.total_days_rented,ld.rate as dropoff_rate,lc.rate as collection_rate,((c.rental_rate*bd.total_days_rented)+ld.rate+lc.rate)as total_rate from book b join book_details bd on b.book_details_id=bd.book_details_id join location_point ld on ld.location_point_id = bd.dropoff_point_id join location_point lc on lc.location_point_id = bd.collection_point_id join car c on c.car_id=b.car_id where book_id = ?';
const getbook1book = sql.mkQueryFromPool(sql.mkQuery(GETBOOKFULLBYID),pool);
const getbook2car = sql.mkQueryFromPool(sql.mkQuery(GETCARBYBOOKID),pool);
const getbook3cp = sql.mkQueryFromPool(sql.mkQuery(GETCOLLECTIONPOINTBYBOOKID),pool);
const getbook4dp = sql.mkQueryFromPool(sql.mkQuery(GETDROPOFFPOINTBYBOOKID),pool);
const getbook5driver = sql.mkQueryFromPool(sql.mkQuery(GETDRIVERSBYBOOKID),pool);
const getbook6money  = sql.mkQueryFromPool(sql.mkQuery(GETMONEY),pool);

//create book transaction sql
const CREATERESERVED = 'INSERT INTO `reserved` SET ?';
const CREATELICENSE = 'INSERT INTO `license` SET ?';
const CREATEDRIVER = 'INSERT INTO `driver` SET ?';
const CREATEBOOKDETAILS = 'INSERT INTO `book_details` SET ?';
const CREATEBOOKDETAILSDRIVER = 'INSERT INTO `book_driver_junction` SET ?';
const CREATEBOOK = 'INSERT INTO `book` SET ?';
const insertReservedQuery = sql.mkQuery(CREATERESERVED);
const insertLicenseQuery = sql.mkQuery(CREATELICENSE);
const insertDriverQuery = sql.mkQuery(CREATEDRIVER);
const insertBookDetailsQuery = sql.mkQuery(CREATEBOOKDETAILS);
const insertBookDetailsDrivers = sql.mkQuery(CREATEBOOKDETAILSDRIVER);
const insertBookQuery = sql.mkQuery(CREATEBOOK);














//function/middleware area
const getHashPassword = (password,salt) => {
    return crypto.createHmac('sha512',salt).update(password).digest('hex');
} 

const tokenDecoder = () => {
    //console.log('jwt header jwt token',req.get('Authorization'));
    return (req,res,next) =>{
        req.jwt_params = jwt.verify(req.get('Authorization').substring(7),SERVER_JWT_SECRET);
        next();
    };
};

const getFullSingleCar = async (carid) => {
    const a = await (async () =>{
        let result;
        let sqlobj = await selectCarById([carid]);
        result = {...sqlobj[0]};
        sqlobj = await selectreservedBycarId([carid]);
        result.reserved_dates = [];
        sqlobj.forEach(e => {
            //console.log(e);
            result.reserved_dates.push({...e})
        });
        sqlobj = await selectalllocationpoint();
        result.location_points = [];
        sqlobj.forEach(e => {
            //console.log(e);
            result.location_points.push({...e})
        });
        sqlobj = await getCarMoney([carid]);
        //console.log(sqlobj);
        result.money = {...sqlobj[0]};
        //console.log('inside async',result);
        return result;
    })().catch(error=>{
        console.log(error);
        conn.rollback(err=>{
            if(err) console.log(err);
            console.log('rollbacked pending conn release');
            conn.release();
        });
        return {err:'fail to retrive full single car'};
    });
    console.log('a');
    return a;
}

const getFullSingleBooking = async (bookid) => {
    return await (async () =>{
        let result;
        let sqlobj = await getbook1book([bookid]);
        result = {...sqlobj[0]};
        sqlobj = await getbook2car([bookid]);
        result.car = {...sqlobj[0]};
        sqlobj = await getbook3cp([bookid]);
        result.collection_point = {...sqlobj[0]};
        sqlobj = await getbook4dp([bookid]);
        result.dropoff_point = {...sqlobj[0]};
        sqlobj = await getbook5driver([bookid]);
        result.drivers = []
        sqlobj.forEach(e => {
            result.drivers.push({...e})
        });
        sqlobj = await getbook6money([bookid]);
        result.money = {...sqlobj[0]};
        //console.log(result);
        return result;
    })().catch(error=>{
        console.log(error);
        conn.rollback(err=>{
            if(err) console.log(err);
            console.log('rollbacked pending conn release');
            conn.release();
        });
        return {err:'fail to retrive full single car'};
    });
};



//START APPLICATION
app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());

//START user profile api
profileRouter.post('/create',(req,res)=>{
    //console.log(req.body)
    const salt = uuid().substring(0,4);
    let params = {...req.body,salt:salt,password:getHashPassword(req.body.password,salt)};
    //console.log(params);
    insertIntoProfile([params]).then(result=>{
        //console.log(JSON.stringify(result))
        res.status(201).json({msg:`Your account as '${req.body.username}' had been created`});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

profileRouter.post('/authProfile',(req,res)=>{
    const username = req.body.username;
    const rawPassword = req.body.password;
    //console.log(username,'||',rawPassword);
    selectProfileForAuth([username]).then(result=>{
        if(result.length==1){
            const profile = {...result[0]};
            //console.log('authicateing',profile);
            if(getHashPassword(rawPassword,profile.salt)===profile.password){
                //console.log('logging in');
                delete profile['password'];
                delete profile['salt'];
                delete profile['otp_secret'];
                //console.log('returning user',profile);
                let expTime = 1;
                switch(profile.type){
                    case 'A':
                    case 'O':
                        expTime= Math.floor(Date.now() / 1000) + (60*120);
                        break;
                    case 'R':
                        expTime= Math.floor(Date.now() / 1000) + (60*120);
                        break;
                    default:
                        console.log('type not found',profile.type);
                        expTime= Math.floor(Date.now() / 1000) + (60);
                }
                const jwt_token=jwt.sign({
                    //iat: Math.floor(Date.now() / 1000),
                    exp: expTime,
                    data: {...profile,otp_auth:false}
                  }, SERVER_JWT_SECRET);
                delete profile['username'];
                delete profile['status'];
                return res.status(200).json({...profile,jwt_token:jwt_token,jwt_exp:expTime,otp_auth:'false'});
            };
            return res.status(403).json({msg:'wrong password'});
        };
        //console.log('user not found')
        return res.status(401).json({msg:'user not found||more then one user:'+result.length});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

profileSecureRouter.get('/register/otp',(req,res)=>{
    const secret = otplib.authenticator.generateSecret();
    console.log(secret);
    const otpauth = otplib.authenticator.keyuri(req.jwt_params.data.profile_id, APPNAME, secret);
    //console.info('otpauth: ', otpauth)
    qrcode.toDataURL(otpauth, 
        (err, imgSrc) => {
            if(err) {
                console.info('error: ', error);
                return res.status(500).json({msg:'qr error'});
            }
            updateProfileOTPById([secret,req.jwt_params.data.profile_id]).then(r=>{
                res.status(200).json({msg:'ok',imgSrc});
            }).catch(err=>{
                console.log(err);
                res.status(500).json({msg:'database error'});
            });
        }
    )
});


profileSecureRouter.post('/auth/otp',(req,res)=>{
        console.log('auth-otp:',req.body.code);
        selectProfileOTPById([req.jwt_params.data.profile_id]).then(r=>{
            const otp_secret = r[0].otp_secret;
            const profile = req.jwt_params.data;
            const expTime = Math.floor(Date.now() / 1000) + (60*60);
            //const token = otplib.authenticator.generate(r[0].otp_secret);
            try {
                const isValid = otplib.authenticator.check(req.body.code,otp_secret);
                console.log('validity:',isValid);
                if(isValid){
                    const jwt_token=jwt.sign({
                        //iat: Math.floor(Date.now() / 1000),
                        exp: expTime,
                        data: {...profile,otp_auth:true}
                      }, SERVER_JWT_SECRET);
                    return res.status(200).json({...profile,jwt_token:jwt_token,jwt_exp:expTime,otp_auth:'true'});
                }
                res.status(404).json({msg:'otp fail'});
            } catch (err) {
                console.error(err);
                res.status(404).json({msg:'otp fail'});
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).json({msg:'database error'});
        });
    }
);

profileSecureRouter.get('/get',(req,res)=>{
    //console.log('secure get profile token:',req.body);
    console.log('userinfo',req.jwt_params);
    selectProfileById([req.jwt_params.data.profile_id]).then(result=>{
        const profile = {...result[0]};
        delete profile['password'];
        delete profile['salt'];
        delete profile['otp_secret'];
        delete profile['token_secret'];
        return res.status(200).json(profile);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

profileSecureRouter.put('/update',(req,res)=>{
    //console.log(req.body);
    let params = req.body;
    const profile_id = params.profile_id;
    delete params['profile_id'];
    //console.log(profile_id);
    updateProfileById([params,profile_id]).then(result=>{
        //console.log(JSON.stringify(result));
        //console.log(result);
        res.status(203).json({msg:`Hi ${params.first_name} ${params.last_name}, your profile had been successfully updated`,result});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

profileSecureRouter.post('/upload/dp',mUpload.single('profileImage'),s3Util.deleteTmpFile(),(req,res)=>{
    //console.log('req ojb',req.jwt_token);
    //console.log('req ojb',req.jet_params);
    //console.log(req.body);
    //console.log(req.file);
    pool.getConnection((err,conn)=>{
		if (err) return console.log(err);	
		(async () =>{
			const start = await sql.startTransaction(conn);
			await updateProfileImageQuery({...start,params:[req.file.filename,req.jwt_params.data.profile_id]});
			await bucketProfileImages(req.file);
            await sql.commit({...start});
            conn.release();
			res.status(200).json({msg:'testing complete'});
		})().catch(error=>{
			console.log(error);
			//sql.rollback({...err});
            //conn.release();
            conn.rollback(err=>{
                if(err) console.log(err);
                console.log('rollbacked pending conn release');
                conn.release();
            });
			//console.log('THIS is VERY BAD');
			res.status(200).json({msg:'err'});
		});
	});
});
//END user profile api

//START car api
carRouter.get('/list/all',(req,res)=>{
    //console.log('ca');
    const limit = 5;
    const offset = 0;
    selectListCarsPagination([limit,offset]).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});
carRouter.get('/get/one/:carid',(req,res)=>{
    console.log(req.params.carid);
    getFullSingleCar(req.params.carid).then(result=>{
        console.log('result in http call',result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
    //selectCarById([req.params.carid])
});

carSecureRouter.post('/add',(req,res)=>{
    //console.log(req.body);
    //console.log(req.jwt_params);
    const car = {...req.body,owner_id:req.jwt_params.data.profile_id};
    //console.log(car);
    insertIntoCar([car]).then(r=>console.log(r)).catch(e=>console.log(e));
    res.status(201).json({msg:`Your Car (${req.body.vehicle_regis_no}) had been registered`});
});

carSecureRouter.get('/owner/list',(req,res)=>{
    console.log(req.jwt_params.data.profile_id);
    selectCarByOwnerId([req.jwt_params.data.profile_id]).then(r=>{
        console.log(r);
        res.status(200).json(r);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

carSecureRouter.post('/upload/car-image',mUpload.single('carImage'),s3Util.deleteTmpFile(),(req,res)=>{
    //console.log('req ojb',req.jet_params);
    console.log(req.body);
    console.log(req.file);
    pool.getConnection((err,conn)=>{
		if (err) return console.log(err);	
		(async () =>{
			const start = await sql.startTransaction(conn);
			await updateCarImageQuery({...start,params:[req.file.filename,req.body.car_id]});
			await bucketCarImages(req.file);
            await sql.commit({...start});
            conn.release();
			res.status(200).json({msg:'car image updated'});
		})().catch(error=>{
			console.log(error);
			//sql.rollback({...err});
            //conn.release();
            conn.rollback(err=>{
                if(err) console.log(err);
                console.log('rollbacked pending conn release');
                conn.release();
            });
			res.status(200).json({msg:'err'});
		});
	});
});
//END car api

//START booking api
bookingSecureRouter.post('/add',(req,res)=>{
    console.log('adding booking');
    //console.log(req.body);
    //console.log('resting ',req.body.drivers[0].license);
    //console.log(req.jwt_params);
    pool.getConnection((err,conn)=>{
        if (err){
			console.log(err);	
			return res.status(500).json({msg:'SQL error',error:err});
		}
		(async () =>{
            const start = await sql.startTransaction(conn);
            //insert reserverd request
            let insertResult = await insertReservedQuery({...start,params:req.body.reserved});
            const reservedId = insertResult.result.insertId;
            insertResult = await insertBookDetailsQuery({...start,params:req.body.book_details});
            const bookDetailsId = insertResult.result.insertId;
            //insert driver and their license and join to book details
            //const driverIdArray = [];
            for (let driver of req.body.drivers){
                //console.log('index',driver);
                const resultlicense = await insertLicenseQuery({...start,params:driver.license});
                //console.log('result license',resultlicense.result.insertId);
                delete driver['license'];
                driver.license_id = resultlicense.result.insertId;
                const resultdriver = await insertDriverQuery({...start,params:driver});
                //driverIdArray.push(resultdriver.result.insertId);
                await insertBookDetailsDrivers({...start,params:{book_details_id:bookDetailsId,driver_id:resultdriver.result.insertId}});
            }
            //insert booking record
            const bookParams = {
                status:req.body.status,
                car_id:req.body.car_id,
                renter_id:req.jwt_params.data.profile_id,
                reserved_id:reservedId,
                book_details_id:bookDetailsId
            };
            insertResult = await insertBookQuery({...start,params:bookParams});
            //console.log('driverIds',driverIdArray);
            //console.log('reservedId',reservedId);
            //console.log('bookDetailsId',bookDetailsId);
            //console.log('final book result',insertResult.result);
            sql.commit(start);
			conn.release();
			res.status(201).json({msg:'Your booking is created'});
		})().catch(error=>{
			console.log(error);
            conn.rollback(err=>{
                if(err) console.log(err);
                console.log('rollbacked pending conn release');
                conn.release();
            });
			res.status(200).json({msg:'SQL error',error:err});
		});
    });
});

bookingSecureRouter.get('/list/owner/booking',(req,res)=>{
    selectBookByOwnerId(req.jwt_params.data.profile_id).then(result=>{
        //console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

bookingSecureRouter.get('/list/renter/booking',(req,res)=>{
    selectBookByRenterId(req.jwt_params.data.profile_id).then(result=>{
        //console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

bookingSecureRouter.get('/full/booking/:bookid',(req,res)=>{  
    getFullSingleBooking(req.params.bookid).then(result=>{
        //console.log(result);
        //console.log(getFullSingleBooking(req.params.bookid));
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

bookingSecureRouter.put('/update/booking/status',(req,res)=>{
    updatebookstatusbyid([req.body.status,req.body.book_id]).then(result=>{
        //console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});
//END booking api

//binding router
app.use('/api/profile',profileRouter);
app.use('/api/car',carRouter);

app.use('/api/profile/secure',tokenDecoder(),profileSecureRouter);
app.use('/api/car/secure',tokenDecoder(),carSecureRouter);
app.use('/api/booking/secure',tokenDecoder(),bookingSecureRouter);


app.use((req,res)=>{
	res.status(400).json({msg:'Bad Request'});
});

//END APPLICATION  //starting server
initDb.testSQL(pool).then(()=>initDb.testS3(s3,'c2c')).then(()=>initDb.connectMongo(client)).then(()=>{
	console.log('tested DB connection');
	app.listen(PORT,() => {
			console.info(`Application started on port ${PORT} at ${new Date()}`);
	});
}).catch((err)=>{console.log(err);process.exit(0)});

