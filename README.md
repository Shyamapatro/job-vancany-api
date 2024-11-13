## How to run in your local?
1. Required NodeJs version `22.9.0`
2. Create`.env` and update the environment variables
3. Update the Database credentials in `.env` file
4. Run `npm install`
5. Run `npm run dev`


## Folder structure
### /app/config/*.js
- config.js file contains configurations created from environment variables
- auth.config.js file contains configurations of auth 
- dbConnection.js contains database connection


### /models/*.model.js
- user.js have users models
- jobListing.js have users models


### /routes/routes.js
- It contains all the API endpoints defined, whether it is protected / authenticated routes or public routes.

### /app/middleware/authJWT.js
- it is use validate the user have the access to that route

### controllers/
- Handles API requests, validates it, handles business logic and generates the response

## Resources
- https://sequelize.org/docs/v6/ - Node.Js ORM tool
- https://www.youtube.com/watch?v=lwLNdJDYz-Q - is used to configure husky and eslint