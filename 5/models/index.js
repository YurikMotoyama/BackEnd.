'use strict'; 
// Ativa o modo estrito do JavaScript

const fs = require('fs'); 
// Importa o módulo 'fs' do Node.js para manipulação de arquivos.

const path = require('path'); 
// Importa o módulo 'path' do Node.js para manipulação de caminhos de arquivos.

const Sequelize = require('sequelize'); 
// Importa o Sequelize, para comunicacao com banco de dados

const process = require('process'); 
// Importa o módulo 'process' do Node.js para acessar informações e variáveis de ambiente.

const basename = path.basename(__filename); 
// Define a constante 'basename' como o nome do arquivo atual (sem o caminho), usando a função 'basename' do módulo 'path'.

const env = process.env.NODE_ENV || 'development'; 
// Define o ambiente atual, utilizando a variável de ambiente 'NODE_ENV' ou, se não estiver definida, usa 'development' como padrão.

const config = require(__dirname + '/../config/config.json')[env]; 
// Carrega as configurações do banco de dados a partir de um arquivo JSON, selecionando as configurações específicas para o ambiente atual ('development', 'production', etc.).

const db = {}; 
// Cria um objeto vazio 'db' que armazenará os modelos do banco de dados.

let sequelize; 
// Declara a variável 'sequelize', que será instanciada dependendo das configurações de banco de dados.

if (config.use_env_variable) { 
  sequelize = new Sequelize(process.env[config.use_env_variable], config); 
  // Se uma variável de ambiente específica estiver definida, o Sequelize será configurado com essa variável.
} else { 
  sequelize = new Sequelize(config.database, config.username, config.password, config); 
  // Caso contrário, usa as credenciais do arquivo de configuração para inicializar o Sequelize.
}

fs.readdirSync(__dirname) 
  // Lê de forma síncrona todos os arquivos no diretório atual.

  .filter(file => { 
    return (
      file.indexOf('.') !== 0 && 
      // Filtra arquivos que não começam com um ponto (exclui arquivos ocultos).

      file !== basename && 
      // Exclui o arquivo atual (normalmente este código se encontra num arquivo 'index.js').

      file.slice(-3) === '.js' && 
      // Seleciona apenas arquivos JavaScript (.js).

      file.indexOf('.test.js') === -1 
      // Exclui arquivos de teste (com extensão .test.js).
    );
  })

  .forEach(file => { 
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); 
    // Para cada arquivo filtrado, importa o modelo e o inicializa com Sequelize.

    db[model.name] = model; 
    // Adiciona o modelo ao objeto 'db', com o nome do modelo como chave.
  });

Object.keys(db).forEach(modelName => { 
  if (db[modelName].associate) { 
    db[modelName].associate(db); 
    // Se o modelo tem associações (relacionamentos), elas são definidas aqui.
  }
});

db.sequelize = sequelize; 
// Armazena a instância Sequelize no objeto 'db' para acessos futuros.

db.Sequelize = Sequelize; 
// Armazena o construtor Sequelize para possíveis utilizações futuras (caso seja necessário instanciar algo com Sequelize).

module.exports = db; 
// Exporta o objeto 'db', que contém todos os modelos e a instância Sequelize para uso em outras partes da aplicação.