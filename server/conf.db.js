module.exports = {
	mysql: {
		host: 'db-mysql-sgp1-81184-do-user-6725275-0.db.ondigitalocean.com',
		port: 25060,
		user: 'c2c_db_user', password: 'J4f7dsuDkl',
		database: 'c2cdb',
		connectionLimit: 10,
		cacert: 'D:/ibf/project 2c2/ca-certificate.crt'
	},
	s3: {
		accessKey: 'VKNGBO72NUJLK6WWAJNA',
		secret: 'U6is5ZczdnU9oiF9iui8EfEPnwN/j9XIQ3XMuA1zgvU',
		endpoint: 'sgp1.digitaloceanspaces.com'
	},
	mongodb: {
		//url: 'mongodb://localhost:27017'
		//user:c2cmongouser
		//password:xKXCmR8miGlbZ5Y8
		url:'mongodb+srv://c2cmongouser:xKXCmR8miGlbZ5Y8@firstcluster-azthl.mongodb.net/test?retryWrites=true&w=majority'
		//url:'mongodb://c2cmongouser:xKXCmR8miGlbZ5Y8@firstcluster-shard-00-00-azthl.mongodb.net:27017,firstcluster-shard-00-01-azthl.mongodb.net:27017,firstcluster-shard-00-02-azthl.mongodb.net:27017/test?ssl=true&replicaSet=FirstCluster-shard-0&authSource=admin&retryWrites=true&w=majority'
		//url: `mongodb://readuser:vdpeYhTzhZTAR2Mx@firstcluster-shard-00-00-azthl.mongodb.net:27017,firstcluster-shard-00-01-azthl.mongodb.net:27017,firstcluster-shard-00-02-azthl.mongodb.net:27017/test?ssl=true&replicaSet=FirstCluster-shard-0&authSource=admin&retryWrites=true&w=majority`
	}
}
