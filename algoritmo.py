class Vertice:
    def __init__(self, nome):
        self.nome = nome
        self.arestas = []

    def conexao(self, vertice, valor):
        aresta_ligacao = Aresta(self, vertice, valor)
        self.arestas.append(aresta_ligacao)
        vertice.arestas.append(aresta_ligacao)

    def vertices_vizinhos(self):
        lista_vizinhos = []
        for aresta in self.arestas:
            if aresta.vertice_um.nome == self.nome:
                lista_vizinhos.append({"vertice": aresta.vertice_dois, "peso": aresta.valor})
            else:
                lista_vizinhos.append({"vertice": aresta.vertice_um, "peso": aresta.valor})
        return lista_vizinhos


class Aresta:
    def __init__(self, vertice_um, vertice_dois, valor):
        self.vertice_um = vertice_um
        self.vertice_dois = vertice_dois
        self.valor = valor


class Visitante:
    def __init__(self):
        self.visitados = []

    def adicionar(self, vertice):
        self.visitados.append(vertice)

    def foi_visitado(self, vertice):
        return vertice in self.visitados


def dijkstra(inicio, fim):
    distancias = {inicio.nome: 0}
    anterior = {}
    nao_visitados = [inicio]
    visitador = Visitante()

    while nao_visitados:
        nao_visitados.sort(key=lambda v: distancias.get(v.nome, float('inf')))
        vertice_atual = nao_visitados.pop(0)

        if vertice_atual.nome == fim.nome:
            break

        visitador.adicionar(vertice_atual)
        vizinhos = vertice_atual.vertices_vizinhos()

        for vizinho in vizinhos:
            vertice_vizinho = vizinho["vertice"]
            peso = vizinho["peso"]
            if not visitador.foi_visitado(vertice_vizinho):
                distancia_atual = distancias[vertice_atual.nome] + peso
                if distancia_atual < distancias.get(vertice_vizinho.nome, float('inf')):
                    distancias[vertice_vizinho.nome] = distancia_atual
                    anterior[vertice_vizinho.nome] = vertice_atual
                    nao_visitados.append(vertice_vizinho)

    caminho = []
    atual = fim
    while atual:
        caminho.insert(0, atual.nome)
        atual = anterior.get(atual.nome)

    return {"caminho": caminho, "distancia": distancias.get(fim.nome, float('inf'))}



verticeA = Vertice("A")
verticeB = Vertice("B")
verticeC = Vertice("C")
verticeD = Vertice("D")
verticeE = Vertice("E")
verticeF = Vertice("F")
verticeG = Vertice("G")
verticeH = Vertice("H")
verticeI = Vertice("I")
verticeJ = Vertice("J")
verticeK = Vertice("K")
verticeL = Vertice("L")


verticeA.conexao(verticeB, 2)
verticeA.conexao(verticeD, 4)
verticeB.conexao(verticeC, 3)
verticeB.conexao(verticeL, 7)
verticeC.conexao(verticeD, 5)
verticeD.conexao(verticeE, 2)
verticeE.conexao(verticeF, 5)
verticeE.conexao(verticeI, 6)
verticeF.conexao(verticeL, 4)
verticeF.conexao(verticeG, 6)
verticeG.conexao(verticeK, 3)
verticeG.conexao(verticeH, 3)
verticeH.conexao(verticeI, 4)
verticeI.conexao(verticeJ, 10)
verticeJ.conexao(verticeK, 8)
verticeK.conexao(verticeL, 6)

resultado = dijkstra(verticeA, verticeK)
print(resultado["caminho"])

import time

def medir_tempo_execucao(funcao):
    inicio = time.time()
    funcao()
    fim = time.time()
    tempo_execucao = (fim - inicio) * 1000
    print(f"Tempo de execução: {tempo_execucao:.2f} ms")
    return tempo_execucao


medir_tempo_execucao(lambda: [x**0.5 for x in range(1000000)])
