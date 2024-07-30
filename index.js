const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3444;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '..........',
    database: 'estoque_informatica'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado no banco!');
});

// Rota para buscar equipamentos
app.get('/equipamentos', (req, res) => {
    const { query } = req.query;
    let sql = 'SELECT * FROM equipamentos';
    if (query) {
        sql += ` WHERE numero_patrimonio LIKE '%${query}%' OR modelo LIKE '%${query}%' OR categoria LIKE '%${query}%'`;
    }
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Rota para inserir um equipamento
app.post('/equipamentos', (req, res) => {
    const { numero_patrimonio, modelo, categoria, data_insercao } = req.body;
    const sql = 'INSERT INTO equipamentos (numero_patrimonio, modelo, categoria, data_insercao) VALUES (?, ?, ?, ?)';
    db.query(sql, [numero_patrimonio, modelo, categoria, data_insercao], (err, result) => {
        if (err) throw err;
        res.send('Equipamento inserido!');
    });
});

// Rota para deletar um equipamento
app.delete('/equipamentos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM equipamentos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Equipamento deletado!');
    });
});

// Rota para editar um equipamento
app.put('/equipamentos/:id', (req, res) => {
    const { id } = req.params;
    const { numero_patrimonio, modelo, categoria, data_insercao } = req.body;
    const sql = 'UPDATE equipamentos SET numero_patrimonio = ?, modelo = ?, categoria = ?, data_insercao = ? WHERE id = ?';
    db.query(sql, [numero_patrimonio, modelo, categoria, data_insercao, id], (err, result) => {
        if (err) throw err;
        res.send('Equipamento atualizado!');
    });
});


app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`);
});

app.use(express.static('public'));
