import express from 'express';

const app = express();

app.use(express.json());

// Rota  conjunto
// Recurso = usuário

// Métodos HTTP
//  GET, POST, PUT E DELETE

// Parâmetros
//  QUERY PARAMS: http://localhost:3333/users?search=diego
//  ROUTE PARAMS: http://localhost:3333/users/1 (identificar um recurso ex: deletar ou atualizar usuário)
//  BODY:         http://localhost:3333/users 

app.get('/users', (request, response) => {
  // console.log('req query',request.query);
  // console.log('req params',request.params);
  // console.log('req body',request.body  );
  return response.json({message: 'Hello world'});
});

app.listen(3333);

// banco de dados:
// Driver nativo, query bilder, ORM

// Driver nativo - executar direto pelo node: sqlite3.query('SELECT * from ...');
// Query Builder - knex('user').select('*').where('name','mateus');
// ORM (object relational mapping) - tabela user tem uma classe User 