# rb-meetup
Simple demonstrations explaining the use of main threads and thread pool in Node JS


Usage: node demo1.js

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

Compare the timelines

Usage: node demo2.js [operation] [count]

	operation: --sync or --async
	count: integer 1 to 20

Compare the timelines
