Installation
============

1. Ensure that required dependencies are installed:
    * Node Js version 14.0.0  is recommended.
    * Node NPM version 6.14.0  is recommended.


Main service
=================

2. Run `cd api`, to enter directory.
2. Run `npm install`, to install dependencies.
2. Run `cp .env.example .env`, to create .env file.
2. Run `npm run dev`, to run the project.

Micro service
=================

2. Run `cd services/file-generator`, to enter directory.
2. Run `npm install`, to install dependencies.
2. Run `cp .env.example .env`, to create .env file.
2. Run `npm run dev`, to run the project.


Branch management
=================

* Branch for new task should be created from `dev`
* When task is done - create pull request to `dev`, before pull request run `npm run build` to check
* Then pull request to `CICD` for deployment,
* If task is tested and accept - create pull request to `master`
# booking-system-backend
