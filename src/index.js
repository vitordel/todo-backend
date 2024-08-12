const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const swaggerDocs = require('./swagger/swagger');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:4200', // URL do frontend
  }),
);

app.use('/', router);
app.get('/', (req, res) => {
  res.send('Bem-vindo ao seu aplicativo!');
});

swaggerDocs(app);

sequelize
  .sync()
  .then(() => {
    console.log('Banco de dados conectado e modelos sincronizados.');

    const port = process.env.PORT || 3000;

    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log('Servidor iniciado na porta 3000');
      });
    }
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

module.exports = app;
