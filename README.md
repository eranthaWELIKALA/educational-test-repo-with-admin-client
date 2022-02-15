This project was created to test keycloak features and the keycloak rest-api

How to Setup

Install the Keycloak server and run it on http://localhost:8080/
Link to Keycloak Downloads - https://www.keycloak.org/downloads

Link to Keycloak Documentation - https://www.keycloak.org/documentation

Create a realm called "edu-realm"

Create clients corresponding for the backend and fronend as "edu-user-service" and "edu-frontend" respectively.

edu-frontend - http://localhost:4200

edu-user-service - http://localhost:3000

(Update the client-secret of the edu-user-service in "edu-user-service.env")

Run the frontend and backend using the corresponding commands,
edu-frontend - ng serve

edu-user-service - npm start