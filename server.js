var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Q = require('q');
/// set credentials to request for signedURL
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
AWS.config.loadFromPath('.aws-config.json');

var app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(express.static(__dirname + "/assets"));
app.set('view engine', 'jade');

app.get('/', function(req, res){
    getAllDirectoryFilesS3('/').then((urlList) => {
        res.render('index.jade', {imageUrlList: urlList});
    });
});



function getAllDirectoryFilesS3(projectPath){
	var bucketInfo = {
			 endpoint: 's3-eu-central-1.amazonaws.com',
			 signatureVersion: 'v4',
			 region: 'eu-central-1',
			 params: {Bucket: 'tw-cycle'},
	}
	bucketInfo.params.Prefix = projectPath.substring(1)
	var deferred = Q.defer();
	var bucket = new AWS.S3(bucketInfo);
	bucket.listObjects(function(err, data){
		if(err){
			deferred.resolve(err)
		}else{
			var dataList = data.Contents
			var urlList = dataList.map((item, index) => {
				if(item.Size == 0) return;
				var params = { Key : item.Key }
				return bucket.getSignedUrl('getObject', params)
			})
			deferred.resolve(urlList)
		}
	});
	return deferred.promise;
}



app.listen(8080);
console.log('Listening on port 8080');
