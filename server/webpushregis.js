const webpush = require('web-push');

const dbConf = require('./conf.db');
const publicVapidKey = process.env.PUBLIC_VAPID_KEY || dbConf.webpush.publicKey;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY  || dbConf.webpush.privateKey;

// Replace with your email
webpush.setVapidDetails('mailto:melvinyit@hotmail.com', publicVapidKey, privateVapidKey);

console.log('regis done');