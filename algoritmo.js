function vertice(nomeVertice, arestas) {
    return {
        "nome": nomeVertice,
        "arestas": arestas,
        "Conexao": function (vertice, valor) {
            let arestaLigacao = aresta(this, vertice, valor);
            this.arestas.push(arestaLigacao);
            vertice.arestas.push(arestaLigacao);
        },
        "verticesVizinhos": function () {
            let listaDeVerticesVizinhos = []
            for (let contagem = 0; contagem < this.arestas.length; contagem++) {
                if (this.arestas[contagem].verticeUm.nome == this.nome) {
                    listaDeVerticesVizinhos.push({
                        "vertice": this.arestas[contagem].verticeDois,
                        "peso": this.arestas[contagem].valor
                    })
                }
                else {
                    listaDeVerticesVizinhos.push({
                        "vertice": this.arestas[contagem].verticeUm,
                        "peso": this.arestas[contagem].valor
                    })
                }
            }
            return listaDeVerticesVizinhos;
        }
    };
};

function aresta(verticeUm, verticeDois, valor) {
    return {
        verticeUm, verticeDois, valor
    };
};

function visitante() {
    let visitados = []
    return {
        "visitados": visitados,
        "adicionar": function (verticeVisitado) {
            this.visitados.push(verticeVisitado)
        },
        "foiVisitado": function (verticeFoiVisitado) {
            for (let contagem = 0; contagem < this.visitados.length; contagem++) {
                if (this.visitados[contagem].nome == verticeFoiVisitado.nome) {
                    return true
                }
            }
            return false
        }
    }
}

function dijkstra(inicio, fim) {
    let distancias = {};
    let anterior = {};
    let naoVisitados = [];
    let visitador = visitante();
    distancias[inicio.nome] = 0;
    naoVisitados.push(inicio);
    while (naoVisitados.length > 0) {
        naoVisitados.sort((a, b) => distancias[a.nome] - distancias[b.nome]);
        let verticeAtual = naoVisitados.shift()
        if (verticeAtual.nome == fim.nome) {
            break;
        }
        visitador.adicionar(verticeAtual);
        let vizinhos = verticeAtual.verticesVizinhos();
        vizinhos.forEach(function (vizinho) {
            if (!visitador.foiVisitado(vizinho.vertice)) {
                let distanciaAtual = distancias[verticeAtual.nome] + vizinho.peso;
                if (distanciaAtual < (distancias[vizinho.vertice.nome] || Infinity)) {
                    distancias[vizinho.vertice.nome] = distanciaAtual;
                    anterior[vizinho.vertice.nome] = verticeAtual;
                    naoVisitados.push(vizinho.vertice);
                }
            }
        });
    }
    let caminho = [];
    let atual = fim;
    while (atual) {
        caminho.unshift(atual.nome);
        atual = anterior[atual.nome];
    }
    return {
        "caminho": caminho,
        "distancia": distancias[fim.nome]
    }
}

let verticeA = vertice("A", [])
let verticeB = vertice("B", [])
let verticeC = vertice("C", [])
let verticeD = vertice("D", [])
let verticeE = vertice("E", [])
let verticeF = vertice("F", [])
let verticeG = vertice("G", [])
let verticeH = vertice("H", [])
let verticeI = vertice("I", [])
let verticeJ = vertice("J", [])
let verticeK = vertice("K", [])
let verticeL = vertice("L", [])

verticeA.Conexao(verticeB, 2);
verticeA.Conexao(verticeD, 4);
verticeB.Conexao(verticeC, 3);
verticeB.Conexao(verticeL, 7);
verticeC.Conexao(verticeD, 5);
verticeD.Conexao(verticeE, 2);
verticeE.Conexao(verticeF, 5);
verticeE.Conexao(verticeI, 6);
verticeF.Conexao(verticeL, 4);
verticeF.Conexao(verticeG, 6);
verticeG.Conexao(verticeK, 3);
verticeG.Conexao(verticeH, 3);
verticeH.Conexao(verticeI, 4);
verticeI.Conexao(verticeJ, 10);
verticeJ.Conexao(verticeK, 8);
verticeK.Conexao(verticeL, 6);

let resultado = dijkstra(verticeA, verticeK);
console.log(resultado.caminho);

function medirTempoExecucao(funcao) {
    const inicio = performance.now();
    funcao(); 
    const fim = performance.now(); 
    const tempoExecucao = fim - inicio;
    console.log(`Tempo de execução: ${tempoExecucao.toFixed(2)} ms`);
    return tempoExecucao; 
}

const tempo = medirTempoExecucao(() => {
    for (let i = 0; i < 1000000; i++) {
        Math.sqrt(i);
    }
});
