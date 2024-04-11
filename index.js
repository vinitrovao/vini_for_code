class Calculadora {
    constructor() {
        this.resultado = null;
        this.comandos = {
            '+': this.soma,
            '-': this.subtracao,
            '*': this.multiplicacao,
            '/': this.divisao,
            '^': this.exponenciacao,
            'raiz': this.radiciacao,
            '!': this.fatorial,
            'trig': this.trigonometria,
            'log': this.logaritmo
        };
    }

    toString() {
        return `Resultado: ${this.resultado !== null ? this.resultado : 0}`;
    }

    soma(...args) {
        if (this.resultado === null) {
            this.resultado = args.reduce((acc, curr) => acc + curr, 0);
        } else {
            this.resultado += args.reduce((acc, curr) => acc + curr, 0);
        }
        return this.resultado;
    }

    subtracao(...args) {
        if (this.resultado === null) {
            this.resultado = args[0] - args.slice(1).reduce((acc, curr) => acc + curr, 0);
        } else {
            this.resultado -= args.reduce((acc, curr) => acc + curr, 0);
        }
        return this.resultado;
    }

    multiplicacao(...args) {
        if (this.resultado === null) {
            this.resultado = 1;
        }
        this.resultado = args.reduce((acc, curr) => acc * curr, this.resultado);
        return this.resultado;
    }

    divisao(...args) {
        if (this.resultado === null) {
            this.resultado = 1;
        } else {
            this.resultado = args.reduce((acc, curr) => {
                if (curr === 0) {
                    return "Erro: Divisão por zero";
                }
                return acc / curr;
            }, args[0]);
        }
        return this.resultado;
    }

    radiciacao(num) {
        this.resultado = Math.sqrt(num);
        return this.resultado;
    }

    exponenciacao(base, expoente) {
        this.resultado = Math.pow(base, expoente);
        return this.resultado;
    }

    fatorial(num) {
        this.resultado = this.factorial(num);
        return this.resultado;
    }

    factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        for (let i = n - 1; i >= 1; i--) {
            n *= i;
        }
        return n;
    }

    trigonometria(angulo) {
        const angulo_rad = this.radians(angulo);
        this.resultado = [Math.sin(angulo_rad), Math.cos(angulo_rad), Math.tan(angulo_rad)];
        return this.resultado;
    }

    radians(degrees) {
        return degrees * (Math.PI / 180);
    }

    logaritmo(num, base) {
        this.resultado = Math.log(num) / Math.log(base);
        return this.resultado;
    }

    all_clear() {
        this.resultado = null;
        return "Resultado resetado.";
    }
}

const calculadora = new Calculadora();

const botoes = document.querySelectorAll('.simbolo, .simbolo_segundo, .numero, .numero_zero, .virgula');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const operacao = botao.getAttribute('data-op');
        const display = document.getElementById('display');
        let valorAtual = display.innerText;

        if (operacao === '=') {
            try {
                const resultado = eval(valorAtual);
                display.innerText = resultado;
                calculadora.resultado = resultado;
            } catch (error) {
                display.innerText = 'Erro';
            }
        } else if (operacao === 'AC') {
            display.innerText = '0';
            calculadora.all_clear();
        } else if (operacao === 'back') {
            display.innerText = valorAtual.slice(0, -1);
        } else if (operacao === 'sin' || operacao === 'cos' || operacao === 'tan' || operacao === 'log' || operacao === 'rad' || operacao === '!') {
            const numero = parseFloat(valorAtual);
            const resultado = calculadora.comandos[operacao](numero);
            display.innerText = resultado;
        } else if (operacao === '%') {
            const percentual = parseFloat(valorAtual) / 100;
            display.innerText = percentual;
        } else {
            display.innerText = valorAtual === '0' ? operacao : valorAtual + operacao;
        }
    });
});
