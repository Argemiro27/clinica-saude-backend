const empresasRoutes = require('./router/empresas.js');
const cargosRoutes = require('./router/cargos.js');
const authRoutes = require('./router/auth');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


// Endpoint to perform SELECT query
app.use('/empresas', empresasRoutes);

// Endpoint to perform SELECT query
app.use('/cargos', cargosRoutes);

app.use('/auth', authRoutes);


app.listen(5001, () => {
    console.log('API está rodando na porta 5001.');
});
