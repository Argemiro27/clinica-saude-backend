const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Importe a biblioteca cors

const app = express();
app.use(express.json());
app.use(cors());

// Configure MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'manga'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão com o MySQL estabelecida.');
});

// Rota para executar consultas SQL
app.post('/query', (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Nenhuma consulta SQL fornecida.' });
    }

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ result });
    });
});

app.get('/tables', (req, res) => {
    db.query('SHOW TABLES', (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const tables = result.map(row => row[`Tables_in_${db.config.database}`]);
        return res.status(200).json({ tables });
    });
});

app.listen(5001, () => {
    console.log('API está rodando na porta 3000.');
});
