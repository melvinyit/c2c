//Loading lib
const fs = require('fs');
//const uuid = require('uuid');
const path = require('path');
const aws = require('aws-sdk');
const mysql = require('mysql');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
//const passport = require('passport');

const sql = require('./util.sql');
const s3Util = require('./util.bucket');
const initDb = require('./init.db');

//config
const PORT = parseInt(process.argv[2] || process.env.APP_PORT || process.env.PORT) || 3000;
const dbConf = require('./conf.db');
dbConf.mysql.ssl = {ca: fs.readFileSync(dbConf.mysql.cacert)};

//sql
const pool = mysql.createPool(dbConf.mysql);
//mongo
const client = new MongoClient(dbConf.mongodb.url,{ useUnifiedTopology: true });

const mongoBook = () => client.db('c2c').collection('Book');
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
const bookRouter = express.Router();
const userRouter = express.Router();

//MYSQL DB area
const CREATEPROFILE = 'INSERT INTO `profile` SET ?';
const GETLISTOFCARS = 'SELECT p.username,p.first_name,c.* FROM `car` c JOIN `profile` p ON c.owner_id=p.profile_id LIMIT ? OFFSET ?';
const CREATECARRESERVEDDATE = 'INSERT INTO `reserved` SET ?';

const insertIntoProfile = sql.mkQueryFromPool(sql.mkQuery(CREATEPROFILE),pool);
const selectListCarsPagination = sql.mkQueryFromPool(sql.mkQuery(GETLISTOFCARS),pool);
const insertIntoReserved = sql.mkQueryFromPool(sql.mkQuery(CREATECARRESERVEDDATE),pool);

//START APPLICATION
app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());

//START user api
userRouter.post('/create',(req,res)=>{
    const params = {};
    insertIntoProfile([params]).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
    //res.status(200).json({msg:'ok'});
});
//END user api

//START car api
carRouter.use('/reserve/test',(req,res)=>{
    //INSERT INTO `c2cdb`.`reserved`(`reserved_id`, `car_id`, `date_from`, `date_to`, `created_by`, 
    //`created_date`, `last_updated_by`, `last_updated_date`) VALUES ('1', '10001', '1', '1', '11', '1', '1', '1');
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

carRouter.get('/list',(req,res)=>{
    console.log('ca');
    const limit = 5;
    const offset = 0;
    selectListCarsPagination([limit,offset]).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'database error'});
    });
});
//END car api

//binding router
app.use('/api/car',carRouter);
app.use('/api/user',userRouter);
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

