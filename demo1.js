/*
 * @Author: govind
 * @Date:   2018-05-24 05:07:33
 * @Last Modified by:   govindrao54
 * @Last Modified time: 2018-05-25 23:28:49
 */

var express = require('express');
var chalk = require('chalk');
var winston = require('winston');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'meetup_dev'
    },
    pool: { min: 0, max: 7 }
});

var log = new winston.Logger({
    level: 'debug',
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: 'logs/meetup.log',
            json: false
        })
    ]
});

log.info(chalk.yellow(`\n
	Usage: node demo1.js\n
	step 1: only math-api
		curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/math-api"
	step 2: only db-api
		curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/db-api"
	step 3: back to back db-api
		curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/db-api" & curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/db-api"
	step 4: back to back math api
		curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/math-api" & curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/math-api"
	step 5: first db-api then math-api
		curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/db-api" & curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/math-api"
	step 5: first math-api then db-api
		curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/math-api" & curl -w "@curl_format.txt" -o /dev/null -s -X GET "http://localhost:3000/db-api"
`));

var app = express();

// math api
app.get('/math-api', function(req, res) {
	log.info(chalk.magenta('math-api called'));

    var COUNTER = 10;
    for (var j = 1; j < COUNTER; j++) {
        for (var i = 0; i < 2000000000; i++) {
            // do nothing
        }
    }
	log.info(chalk.bgMagenta('math-api success'));
    return finalCallback(req, res, null, 'forLoop done!');
});

// db api
app.get('/db-api', function(req, res) {
	log.info(chalk.green('db-api called'));

    // an expensive db query, table contains over 5 lac rows
    knex('device_history')
        .select()
        .where('state', 'like', '%ASDFFGHJKL-1234567890%')
        .andWhere('created_date', '<', 1512341234)
        .andWhere('id', '<', 234567)
        .then(function(res1) {
            log.info(chalk.bgGreen("db-api success"));
            return finalCallback(req, res, null, res1);
        })
        .catch(function(err1) {
            log.info(chalk.red("db-api failed", err1));
            return finalCallback(req, res, err1, null);
        });
});

var finalCallback = function(req, res, err, data) {
    if (err) {
        var errorCode = (err && err.statusCode) ? err.statusCode : 400;
        var errorMessage = (err && err.message) ? err.message : "Some error occurred";
        return res.status(errorCode).send({
            "statusCode": "4XX",
            "message": errorMessage,
            "data": data
        });
    } else {
        return res.status(200).send({
            "statusCode": "2XX",
            "data": data
        });
    }
}

app.listen(3000, function() {
    log.info(chalk.cyan("Roambee Meetup Demo Server running on port - 3000"));
});