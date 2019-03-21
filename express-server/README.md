# Express Server Application

This is the API to manage the documents.

This API uses a remote mongodb, because the purpose of this application is just show my coding abilities.

This API is made on top of express framework and babel with es.next presets.

## App Structure

- config
This folder contains some app configurations in a simple js approach, I don't used .env in this project.

- controllers
This folder contains the controllers, that only delegates the services calls according the route

- db
This folder contains the function that connect to the mongo db

- docs
This folder contains the swagger ui structure file

- models
This folder contains the models of the application

- routes
This folder contains the router of the application

- services
This folder contains the services, that holds all the business logics of the app

The entrypoint of the app is the index.js file

### Build

This application uses babel to build, because I used ES next features.

To run this application locally, you must run npm run serve and go to localhost:3000 in your browser.