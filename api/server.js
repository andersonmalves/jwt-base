const express = require('express');
const routes = require('./routes');
const validateJWT = require('./auth/validateJWT')

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());

const apiRoutes = express.Router();
apiRoutes.post('/api/users', routes.createUser);
apiRoutes.post('/api/login', routes.userLogin);
apiRoutes.post('/api/products', validateJWT, routes.createProduct); //

app.use(apiRoutes);

app.listen(port);
console.log('conectado na porta ' + port);
