document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('funcionario-form').addEventListener('submit', function(event) {
        event.preventDefault();  

        try {
            const nome = document.getElementById('nome').value.trim();
            const idade = parseInt(document.getElementById('idade').value.trim());
            const cargo = document.getElementById('cargoFun').value.trim().toLowerCase();
            const departamento = document.getElementById('departamento').value.trim();
            const linguagem = document.getElementById('linguagem').value.trim();
          
            const linguagensValidas = [
                "Java", "Python", "JavaScript", "PHP", "C", "C++", "C#", "Ruby",
                "Swift", "Go", "Rust", "Perl", "Kotlin", "Dart"
            ];
          
            if (!nome || isNaN(idade) || idade <= 0 || cargo === 'escolha') {
                throw new Error("Por favor, preencha todos os campos obrigatórios e selecione um cargo.");
            }

            let funcionario;

            if (cargo === 'gerente') {
                if (!departamento) 
                    throw new Error("Gerentes precisam de um departamento.");
                if (linguagem && linguagem.trim() !== '') 
                    throw new Error("Gerentes não devem preencher o campo de linguagem.");
                funcionario = new Gerente(nome, idade, "Gerente", departamento);
                exibirResultado(funcionario.seApresentar() + "<br>" + funcionario.gerenciar());
            } else if (cargo === 'desenvolvedor') {
                if (!linguagem) 
                    throw new Error("Desenvolvedores precisam de uma linguagem.");
                
                if (departamento) 
                    throw new Error("Desenvolvedores não devem preencher o campo de departamento.");
            
                if(!linguagensValidas.includes(linguagem)) {
                   throw new Error("Insira uma linguagem de programação válida.");
                }

                funcionario = new Desenvolvedor(nome, idade, "Desenvolvedor", linguagem);
                exibirResultado(funcionario.seApresentar() + "<br>" + funcionario.programar());
            } else {
                throw new Error("Cargo inválido. Deve ser 'Gerente' ou 'Desenvolvedor'.");
            }
            exibirErro('');
        } catch (error) {
            exibirErro(error.message);
        }
       });
    });

    const selectElement = document.getElementById("cargoFun");
    selectElement.addEventListener("change", function() {
        if (selectElement.value !== "escolha") {
            selectElement.classList.add("selected");
        } else {
            selectElement.classList.remove("selected");
        }
    });

function exibirErro(mensagem) {
    document.getElementById('mensagemErro').innerHTML = `<p style="color: red;">${mensagem}</p>`;
}

function exibirResultado(mensagem) {
    document.getElementById('resultado').innerHTML = `<p>${mensagem}</p>`;
}

class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        return `Meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}.`;
    }

    trabalhar() {
        return `${this.nome} está trabalhando como ${this.cargo}.`;
    }
}

class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        this.departamento = departamento;
    }

    seApresentar() {
        const apresentacaoSemPonto = super.seApresentar().replace(/\.$/, "");
        return `${apresentacaoSemPonto} do departamento ${this.departamento}.`;
    }

    gerenciar() {
        return `${this.nome} está gerenciando o departamento de ${this.departamento}.`;
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    }

    seApresentar() {
        return `${super.seApresentar()} Especializado em ${this.linguagem}.`;
    }

    programar() {
        return `${this.nome} está programando em ${this.linguagem}.`;
    }
}