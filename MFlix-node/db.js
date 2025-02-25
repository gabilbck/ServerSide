const mysql = require('mysql2/promise');

async function conectar() {
    const conexao = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'mflix'
    })
    console.log('Conectou no BD mflix');
    return conexao;
}

conectar();