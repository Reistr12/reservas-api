# Reservas API - Sistema de Agendamento de Quadras Esportivas

## 💻 Tecnologias Utilizadas

### Backend
- **Node.js** (v18+) - Ambiente de execução JavaScript
- **Express** - Framework para construção da API REST
- **Prisma ORM** - Camada de acesso ao banco de dados
- **MySQL** - Sistema de banco de dados relacional

## 🛠️ Funcionalidades Principais

### Controle de Quadras
- Cadastro de quadras com tipos específicos (futebol, vôlei, basquete, tênis)
- Validação de nomes únicos

### Sistema de Reservas
- Agendamento com verificação de conflitos de horário
- Validação de integridade referencial (quadra deve existir)
- Consulta de reservas por quadra
