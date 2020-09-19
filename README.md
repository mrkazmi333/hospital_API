## Hospital API

## Index

- [About](#about)
- [Usage](#usage)
  - [Pre-Requisites](#pre-requisites)
  - [Development Environment](#development-environment)
  - [File Structure](#file-structure)
  - [Commands](#command)
  - [Functionalities](#functionalities)
  - [API usage](#api-usage)

## About

An API for management of coronavirus patients which can come handy for a clinic/hospital or any organisation so that they can manage their patients easily by integrating this API in client Interface:

## Usage

To use this code, make sure you have all the `pre-requisites` and your `development environment` is ready. After that you can read about the `file-structure`, which also explains about project structure and how things are working in background. Commands will tell you about the important `commands` you should konow.

### Pre-requisites

In order to work on this project or to develop it, you need to have some pre-installed tools and knowledge about them. Below are the tools you need to install on your system:

- NPM
- Nodejs
- Postman (For Interacting with the API as a fornt end framework) You can download it from [here](https://www.postman.com/)

### Development Environment

Once you have all the requirements checked out, you can develop this project. You need to set up the development environment to work on it. Follow the steps given below to setup:

1. Clone this repository, write in terminal `git clone https://github.com/mrkazmi333/`.
2. Go inside the cloned folder using `$ cd hospital_api_`, and install all the dependencies. `$ npm install`
3. To test run the dev server. `$ npm start`

### File Structure

| No  | File/Folder name                 | Details                                                                                       |
| --- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| 1   | ./assets                         | Contains the image for demo or API preview using postman.                                     |
| 2   | ./config                         | Folder containing all the passport strategies and middlewares                                 |
| 3   | ./config/mongoose                | Responsible for connecting our MongoDB with our application uisng mongoose.                   |
| 4   | ./config/passport-jwt-strategy   | This gives a Json Web token which we will further use in our header for most of the requests. |
| 5   | ./config/passport-local-strategy | Used for Logging in for Doctor and then use jwt.                                              |
| 6   | ./controllers/api/v1             | Contains all our API functionalities.                                                         |
| 7   | ./models                         | All the database schemas are in models folder.                                                |
| 8   | ./routes                         | Containt all the routes                                                                       |
| 9   | ./routes/index.js                | Entry point of Routes                                                                         |
| 10  | ./routes/api/index.js            | Entry point of all our API routes for different versions of API.                              |
| 11  | ./routes/api/v1/index.js         | This directs all the routes of v1 of API                                                      |
| 12  | ./routes/api/v1                  | Contains all our major routes for this project that we will be using.                         |
| 13  | ./node_modules/...               | Auto installed node packages.                                                                 |
| 14  | index.js                         | Entry point for our application.                                                              |
| 15  | package.json                     | NPM package file for this project.                                                            |
| 16  | package-lock.json                | NPM packages details.                                                                         |
| 17  | .gitignore                       | To ignore files to be a part of version control.                                              |

### Commands

- Installing all the dependencies.
  ```
  npm install
  ```
- Starting development server.
  ```
  npm start
  ```

### Functionalities

1. Register a Doctor with username, name and password.
2. Doctor login(User) we are authenticating the doctor usinf passport which then returns a jwt for upcoming requests which needs authoriztion.
3. A logged in doctor can register a patient who came for the checkup using his Mobile number and name. ID of the patient will be his mobile number.
4. A report can be cretaed by a doctor which gives the status while submitting the reuest form body and authorization token in header.
5. All the reports of a particular patient can be viewed using their ID.
6. All the reports can be viewed which is filtered by status.

### API usage:

#### Base URL: `http://localhost:8000/api/v1/`

1. `/doctors/register` (Request Type: POST) Doctor registration, Registring a new doctor with 'name', 'username', 'password', 'confirm password'.
   <br>
   Example of request with Output:
   ![Doctor Registration](/assets/doctor_register.png)

2. `/doctors/login`(Request Type: POST) Logging in the Dcotor with 'username' and 'password', Getting json web token token in response for using it for authorization while sending further requests.
   <br>
   Example of request with output response:
   ![Doctor Login](/assets/doctor_login.png)

3. `patients/register` (Request Type: POST) Authorization required, Registring apatient using 'mobile' numebr and 'name'. When a doctor is logged in then only a patient can be registered by that doctor using the athorization token received while logging in.
   <br>
   Example of Patient registartion request with sample output response:
   ![Patient Registration](/assets/patients_register.png)

4. `patients/:id/create_report` (Request Type: POST) Authorization required, A doctor can create a new report of a particular registered patient using its `id` (mobile number) while sending the Status in form body.
   <br>
   Example of Report creation of a patient with output response:
   ![Report created](/assets/create_report.png)

5. `patients/:id/all_reports` (Request Type: GET) Authorization Required, ALl the reports of a particular patient can be fetched using this end point url by a registered doctor by providing their id in params.
   <br>
   Example of All reports of a patient with output response:
   ![All rpeorts of patient](/assets/get_all_reports.png)

6. `reports/:status` (Request Type: GET) Authroization required, A doctor can get all the reports with a particular status provided in the params.
   Example of Reports filtered by status with output response:
   <br>
   ![Reports by status](/assets/reports_by_status.png)
