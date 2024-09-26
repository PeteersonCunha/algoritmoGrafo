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
            var listaDeVerticesVizinhos = []
            for (var contagem = 0; contagem < this.arestas.length; contagem++) {
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

        }

    };

};

function aresta(verticeUm, verticeDois, valor) {

    return {
        verticeUm, verticeDois, valor
    };

};

var verticeA = vertice('A', []);
var verticeB = vertice('B', []);

verticeA.Conexao(verticeB, 4);
function visitante() {
    var visitados = []
    return {
        "visitados": visitados,
        "adicionar": function (verticeVisitado) {
            this.visitados.push(verticeVisitado)
        },
        "foiVisitado": function (verticeFoiVisitado) {
            for (var contagem = 0; contagem < this.visitados.length; contagem++) {
                if (this.visitados[contagem].nome == verticeFoiVisitado.nome) {
                    return true

                }
            }

            return false

        }

    }
}
var visitanteA = visitante()
visitanteA.adicionar(verticeB)
console.log('Visitados ' + visitanteA.visitados[0].nome)
console.log(`as arestas do vertice dois é ${verticeA.arestas[0].verticeDois.nome}`)

