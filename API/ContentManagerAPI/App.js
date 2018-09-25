const express = require('express');
const PORT = 3000;
const mysql = require('mysql');
const routes = require('./Routes');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json());

var server = app.listen(PORT);
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'help'
});

con.connect(function(err){
    if (err){
        console.log('Não foi possível se conectar ao Banco de Dados! \nErro: ' + err);
        process.exit();
    } else {
        console.log('Conectado ao Banco de Dados!');
    }
});

console.log('ContentManagerAPI listening at port ' + PORT);

app.all('/', function(req, res){
    res.sendStatus(403);
});

app.post('/save/*', function(req, res){
    con.query('INSERT INTO HELP_CONTENTS VALUES(0, \''+ req.body.content +'\')', function(err, result){
        if (err){
            res.send(err);
         } else res.sendStatus(200);
    });
});

app.post('/load/:id', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    con.query('SELECT * FROM HELP_CONTENTS HP WHERE HP.ID = '+ con.escape(req.params['id']), function(err, result){
        if (err) res.send(err); else res.send(result[0].CONTENT);
    });
    // res.send(req.params['id']);
});