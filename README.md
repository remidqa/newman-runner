# NEWMAN-RUNNER

This application is a Newman tests runner wrapped in an API. It can be used to trigger tests and and manage reports

## Technologies
- Newman
- Nodejs
- fastify
- Docker
- remidqa quality workflow

## Build
- This application is designed for a Docker usage.
- To build simple run : ```docker build -t {tag-name} .```
- Then the image will be available on your local repository

## Configuration
- All psotman files (environment and collections) are fetched on execution request : set env variable ```POSTMAN_API_KEY```
- This application execute collections tests sub-folders as tests, you must design your collection for this usage
- 
  ## Usage
- ```[POST] /run``` with 2 mandatory variables (```coll_id```, ```env_id``` and ```fodler```) in the body : ```{"coll_id": "${coll_id}", "env_id": "${env_id}", "folder": "${folder}"}```
    - ```coll_id```: Postman ID of the collection you need to execute, your ```POSTMAN_API_KEY``` must have acces to this collection
    - ```env_id```: Postman ID of the environment you need to execute, your ```POSTMAN_API_KEY``` must have acces to this environment
    - ```folder```: is, in the collection, the name of the sub-folder to execute
    - RESPONSE : you will get the report's name in the body response
- ```[GET] /report?report_name=${report_name}``` : to get the .json report
