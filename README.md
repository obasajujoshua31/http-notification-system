# http-notification-system


Steps to setup the project

1. clone the project using either https or ssh
- with https: git clone https://github.com/obasajujoshua31/http-notification-system
- with ssh git clone git@github.com:obasajujoshua31/http-notification-system.git

2. Create a file called .env in the both directories of subscriber and publisher and copy the contents of .env.example into it and fill in your details.

3. Technologies used

- SQLite Database
- Express Api application
- Docker
- Docker-compose
- NodeJs

4. docker-compose up to start the application

`Please note if you running the application with docker-compose, make sure your subscriber endpoint is http://subscriber:{PORT} not http://localhost:{PORT}`

If you are running it directly, you can use localhost.

5. - Start application at port 8000 and navigate to http://localhost:8000/api-docs for the publisher api for the API documentation if you are running it locally
Note: If you are starting your application in a different port, go to swagger.json and change the host to the port you are using
 - Start application at port 9000 and navigate to http://localhost:9000/api-docs for the subscriber api for the API documentation if you are running it locally
Note: If you are starting your application in a different port, go to swagger.json and change the host to the port you are using
