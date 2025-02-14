# Full-Stack-Development-I

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Installation
Open command prompt and 

```cd [Desired Directory]``` - location for the app to be stored

```git clone [Paste URL]``` - to retrieve contents from applicable branch

```cd [Directory]\travlr``` - to change directory to travlr app

```npm install``` - to download applicable node_modules

```npm start``` - to start the server

Navigate in Chrome browser to ```http://localhost:3000``` to see customer facing site.

Open a new command prompt:

```cd [Directory]\travlr\app_admin``` - change to admin site directory

```npm install``` - download applicable node_modules

```ng serve``` - run admin site

Navigate to ```http://localhost:4200``` to see admin site.

## Use
```localhost:3000``` links show regular .html files

Navigating to ```localhost:3000/travel``` instead of travel.html shows the dynamically rendered pages from the server.

In order to enable admin actions for the admin portal, a user must be created using Postman.

### Using Postman to create an admin
Send a POST request to ```http://localhost:3000/api/register``` with the body in ```x-www-form-urlencoded```, with the attributes: 

```name: string```

```email: email```

```password: 12+ character password w/special character```

The response will be the created user's bearer token. 

### Using the Angular Admin Portal
From ```localhost:4200```, the admin portal, additional travel packages can be added using the 'Add Trip' button and entering the applicable information. These additions can then be seen at ```localhost:3000/travel``` as well as the admin portal.

In order to enable admin actions, a user must login. From here, enter the credentials that were previously registered.

The admin site should now be populated with Add, Edit, and Delete Trip functionality as well as creating new administrators.

## Future use
To prevent anyone unauthorized from creating admins, perform the following:

In ```travlr/app_api/routes/index.js```:

Change ```router.route("/register").post(authController.register);``` to:

```router.route("/register").post(authenticateJWT, authController.register);```

This addition ensures only current administrators can add other administrators.
