const express = require('express');
const app = express();
const reservesRouters = require('./routers/reserv');
const PORT = 5000;

app.use(express.json()); // Para parsear JSON no body das requisições
app.use('/api', reservesRouters); // Prefixo '/api' para todas as rotas

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});
