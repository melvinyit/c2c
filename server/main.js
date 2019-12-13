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

//database util
const sql = require('./util.sql');
const s3Util = require('./util.bucket');
const initDb = require('./init.db');

//config
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
const bucketImages = s3Util.bucket(s3,'c2c','images');
const butketImagesURL = 'https://c2c.sgp1.digitaloceanspaces.com/images/';

const mUpload = multer({ dest: path.join(__dirname,'/tmp' )});
const app = express();
const carRouter = express.Router();
const bookingRouter = express.Router();
const profileRouter = express.Router();
const carSecureRouter = express.Router();
const bookingSecureRouter = express.Router();
const profileSecureRouter = express.Router();

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





//MYSQL DB area
const CREATEPROFILE = 'INSERT INTO `profile` SET ?';
const CREATECARRESERVEDDATE = 'INSERT INTO `reserved` SET ?';
const CREATECAR = 'INSERT INTO `car` SET ?';
const GETLISTOFCARS = 'SELECT p.username,p.first_name,c.* FROM `car` c JOIN `profile` p ON c.owner_id=p.profile_id LIMIT ? OFFSET ?';
const GETPROFILEFORAUTH = 'SELECT profile_id,username,password,salt,status,type FROM `profile` WHERE `username`=?';
const GETPROFILEBYID = 'SELECT * from `profile` where `profile_id`=?';
const GETCARBYID = 'SELECT * from `car` WHERE `car_id`=?';
const GETBOOKINGBYOWNERID = 'SELECT b.*,c.rental_rate,bd.drivers_no,bd.reason,r.date_from,r.date_to FROM `book` b JOIN `car` c ON b.car_id=c.car_id JOIN `book_details` bd ON b.book_details_id=bd.book_details_id JOIN `reserved` r ON r.reserved_id=b.reserved_id WHERE c.owner_id=?';
const GETBOOKINGBYRENTERID = 'SELECT b.*,c.rental_rate,bd.drivers_no,bd.reason,r.date_from,r.date_to FROM `book` b JOIN `car` c ON b.car_id=c.car_id JOIN `book_details` bd ON b.book_details_id=bd.book_details_id JOIN `reserved` r ON r.reserved_id=b.reserved_id WHERE b.renter_id=?';
const GETBOOKDETAILSBYID = 'select * from book where book_id=?';
const UPDATEBOOKSTATUSBYID = 'update book set status = ? where book_id = ?';

const insertIntoProfile = sql.mkQueryFromPool(sql.mkQuery(CREATEPROFILE),pool);
const insertIntoReserved = sql.mkQueryFromPool(sql.mkQuery(CREATECARRESERVEDDATE),pool);
const insertIntoCar = sql.mkQueryFromPool(sql.mkQuery(CREATECAR),pool);
const selectListCarsPagination = sql.mkQueryFromPool(sql.mkQuery(GETLISTOFCARS),pool);
const selectProfileForAuth = sql.mkQueryFromPool(sql.mkQuery(GETPROFILEFORAUTH),pool);
const selectProfileById = sql.mkQueryFromPool(sql.mkQuery(GETPROFILEBYID),pool);
const selectCarById = sql.mkQueryFromPool(sql.mkQuery(GETCARBYID),pool);
const selectBookByOwnerId = sql.mkQueryFromPool(sql.mkQuery(GETBOOKINGBYOWNERID),pool);
const selectBookByRenterId = sql.mkQueryFromPool(sql.mkQuery(GETBOOKINGBYRENTERID),pool);
const selectbookbyid = sql.mkQueryFromPool(sql.mkQuery(GETBOOKDETAILSBYID),pool);
const updatebookstatusbyid = sql.mkQueryFromPool(sql.mkQuery(UPDATEBOOKSTATUSBYID),pool);

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
        res.status(201).json({msg:'created'});
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
                //console.log('returning user',profile);
                const jwt_token=jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: {...profile}
                  }, SERVER_JWT_SECRET);
                delete profile['username'];
                delete profile['status'];
                return res.status(200).json({...profile,jwt_token:jwt_token,jwt_exp:Math.floor(Date.now() / 1000) + (60 * 60)});
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

profileSecureRouter.get('/get',(req,res)=>{
    //console.log('secure get profile token:',req.body);
    console.log('userinfo',req.jwt_params);
    selectProfileById([req.jwt_params.data.profile_id]).then(result=>{
        const profile = {...result[0]};
        delete profile['password'];
        delete profile['salt'];
        return res.status(200).json(profile);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

profileSecureRouter.put('/update',(req,res)=>{

});

profileSecureRouter.post('/upload/dp',mUpload.single('imageName'),(req,res)=>{

});
//END user profile api

//START car api
carRouter.use('/reserve/test',(req,res)=>{
    const params = {car_id:10001,date_from:new Date().getTime(),date_to:new Date().getTime(),created_by:0,created_date:0,last_updated_by:0,last_updated_date:0};
    console.log('/reserve/car',params);
    insertIntoReserved([params]).then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

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
    selectCarById([req.params.carid]).then(result=>{
        //console.log(result);
        res.status(200).json({...result[0]});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});

carSecureRouter.post('/add',(req,res)=>{
    //console.log(req.body);
    //console.log(req.jwt_params);
    const car = {...req.body,owner_id:req.jwt_params.data.profile_id};
    //console.log(car);
    insertIntoCar([car]).then(r=>console.log(r)).catch(e=>console.log(e));
    res.status(200).json({msg:'test ok'});
});
//END car api

//START booking api
bookingSecureRouter.post('/add',(req,res)=>{
    console.log(req.body);
    console.log('resting ',req.body.drivers[0].license);
    console.log(req.jwt_params);
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
			res.status(201).json({msg:'book created'});
		})().catch(error=>{
			console.log(error);
            conn.rollback(err=>{
                if(err) console.log(err);
                console.log('rollbacked pending conn release');
            });
			conn.release();
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
    selectbookbyid(req.params.bookid).then(result=>{
        //console.log(result);
        res.status(200).json({...result[0]});
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

