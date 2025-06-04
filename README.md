# Islamic Quiz App Backend
Firstly, make sure you have connection in mongoDB.
If you go into compass and you select connect and it works you're good.
Else, open a new main terminal and run:

```bash
    brew services start mongodb-community

```

Clone repo and run
```bash
    npm install
```

Ensure you have a .env file for db and connection.
e.g:

```bash
    JWT_SECRET=yourSuperSecretKey
    MONGO_URI=mongodb://localhost:27017
```

To spin backend(API) server up run:

```bash
    npm run dev
```
To spin up Front end server , open a new terminal
in webstorm and run :

```bash
    cd front-end/client
    npm install //to install if not
    
    npm start // to start FE create-react-app
```