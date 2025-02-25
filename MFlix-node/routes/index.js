var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express do Manseira' });
});

router.post('/login', 
  function(req, res, next) {
    /*
    FAZ DIVERSAS FUNÇÕES
    - pegga os dados do formulario html
    - pede para o BD ver se existe o usuario
    - se existe o usuário:
      - registra a sessão de uso do usuário
      - redireciona para a tela de escolha de perfil
    - se o usuario não existe:, mostra uma tela de erro
    */
  res.send('login');
});

module.exports = router;
