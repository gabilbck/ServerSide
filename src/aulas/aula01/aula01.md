# Server-Side

Anotações e comandos utilizados durante a disciplina de SERVER-SIDE

## Ferramentas

* Python
* Node
* XAMPP
* VS CODE
* MariaDB*
* ySQL*

## Criando um Aplicativo pelo Node:

```npm install -g express-generator```  
Instala globalmente o pacote Express Generator, que é uma ferramenta oficial do Express.js usada para criar rapidamente a estrutura básica de um projeto Express.

```npm install -g express```  
Instala o framework Express.js globalmente no seu sistema usando o npm

```npx express -e MFlix```  
Ele cria um novo projeto Express.js chamado MFlix, utilizando EJS como motor de templates. A estrutura do projeto gerada incluirá diretórios padrão como routes, views, public e arquivos de configuração (app.js ou server.js).

```md <nomeDaPasta>```  
Cria uma pasta

```cd <nomeDaPasta>```  
Muda o local do diretório para o qual você está acessando atualmente à pasta mencionada

```npx express -e <nomeDoProjetoa>```  
serve para criar um novo projeto Express.js dentro de uma pasta chamada nomeDaPasta, utilizando EJS como motor de templates.

```cd <nomeDoProjeto>```  
Muda pasta do projeto

```npm install```  
Instala o Node Package Manager dentro do projeto

```code .```  
Abre o projeto no VSCode

```<nomeDoProjeto> start```  
Inicia o projeto em um servidor local

*Para acessar o servidor local, no navegador pesquise:*
```localhost:3000```

## Componentes do Sistema feito em NodeJS/EJS

### Estrutura do aplicativo

```
/NomeDoProjeto
│── /bin  
│   ├── www  
│── /public  
│   ├── images/  
│   ├── javascripts/  
│   ├── stylesheets/  
│       ├── style.css  
│── /routes  
│   ├── index.js  
│   ├── users.js  
│── /views  
│   ├── error.ejs  
│   ├── index.ejs  
│   ├── layout.ejs  
│── app.js  
│── package.json  
```

### ```app.js``` (Arquivo principal do servidor)

```
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// Configurando o mecanismo de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Definição das rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Captura erros 404 e encaminha para o tratador de erros
app.use(function(req, res, next) {
  next(createError(404));
});

// Tratador de erros
app.use(function(err, req, res, next) {
  // Define locais, fornecendo apenas erros no desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza a página de erro
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

### ```bin/www``` (Pagina inicial)

Esse arquivo é responsável por configurar e iniciar o servidor na porta definida.
```
#!/usr/bin/env node

const app = require('../app');
const debug = require('debug')('meu-projeto:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

### ```views/layout.ejs``` (Layout base do projeto)

```
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body>
    <h1><%= title %></h1>
    <%- body %>
</body>
</html>
```

### ```views/index.ejs``` (Página inicial)

```
<% layout('layout') %>

<h1>Bem-vindo ao Express</h1>
<p>Edite <code>views/index.ejs</code> e recarregue.</p>
```

### ```views/error.ejs``` (Página de erro)

```
<% layout('layout') %>

<h1><%= message %></h1>
<h2><%= error.status %></h2>
<pre><%= error.stack %></pre>
```

### ```package.json``` (Dependências e scripts)

```
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Um aplicativo Express com EJS",
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  }
}
```
