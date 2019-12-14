const wp = require('web-push');

const keys = wp.generateVAPIDKeys();

console.log(keys);