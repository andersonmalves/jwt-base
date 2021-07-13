const express = require('express');
const routes = require('./routes');

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());

const apiRoutes = express.Router();
apiRoutes.post('/api/users', routes.createUser);
apiRoutes.post('/api/login', routes.findUser);

app.use(apiRoutes);

app.listen(port);
console.log('conectado na porta ' + port);
