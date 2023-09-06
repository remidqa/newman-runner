# README

## Used Technologies
- Newman
- Nodejs
- Docker

## What is this application for
A simple application to run newman executions
A server listen to ```/run/coll_id/:coll_id/env_id/:env_id'``` route and send results to another API (an API capable of managing executions, reports, execution history, alerts,... )

## Setup
The easiest way to run the API is to build a Docker container and run it
first set up some variables (either in a ```.env``` or ```Dockerfile``` file): 
- ```POSTMAN_API_KEY``` : required if your collections and/or env files are private
- ```API_QA_INT_URL``` : where we want to send the ```.json``` reports to

## Build
- ```docker build -t newman-runner```
- ```docker run newman-runner```

## Routes
- ```[GET] /reports/coll_id/:coll_id```
    - expected params
        - ```coll_id```: [MANDATORY] postman collection id

- ```[POST] /run/coll_id/:coll_id```
    - expected params:
        - ```coll_id```: [MANDATORY] postman collection id
    - expected query:
        - ```env_id```: [OPTIONAL] postman environment id

- ```[GET] /report```
    - expected query inputs
        - ```coll_id```: [MANDATORY] postman collection id

- ```[DELETE] /report```
    - expected query inputs:
        - ```report_name```: name of the report to delete.
