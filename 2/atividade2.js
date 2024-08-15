const fs = require('fs');

const dados = fs.readFileSync('./dados.json', 'utf-8');
const alunos = JSON.parse(dados).alunos;

for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    const nomePasta = aluno.nome + '_' + aluno.matricula;

    if (!fs.existsSync(nomePasta)) {
        fs.mkdirSync(nomePasta);
    }

    for (let j = 0; j < aluno.projetos.length; j++) {
        const projeto = aluno.projetos[j];
        const nomeArquivo = nomePasta + '/' + projeto.titulo + '.txt';

        fs.writeFileSync(nomeArquivo, projeto.resumo);
    }
}

console.log("Pastas e arquivos criados com sucesso!");
