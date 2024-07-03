'use client'
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
import { useRouter } from "next/navigation"
import Pesquisa from "@/components/Pesquisa"
import Swal from 'sweetalert2'

export default function Listagem() {
  const [personals, setPersonal] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getPersonal() {
      const response = await fetch("http://localhost:3004/personals")
      const dados = await response.json()
      setPersonal(dados)
      setIsLoading(false)
    }
    getPersonal()
  }, [])

  async function excluiPersonal(id) {
    const response = await fetch("http://localhost:3004/personals/" + id, {
      method: "DELETE"
    })
    const novosDados = personals.filter(personal => personal.id != id)
    setPersonal(novosDados)
  }
// Personal
  async function destacaPersonal(id, status_atual) {
    await fetch("http://localhost:3004/personals/" + id,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ destaque: !status_atual })
      })
    const indiceAlterado = personals.findIndex(personal => personal.id == id)
    const novosDados = [...personals]
    novosDados[indiceAlterado].destaque = !status_atual
    setPersonal(novosDados)
  }

  const listaPersonals = personals.map(personal => (
    <ItemLista key={personal.id}
      personal={personal}
      exclui={() => excluiPersonal(personal.id)}
      altera={() => router.push('altera/' + personal.id)}
      consulta={() => router.push('consulta/' + personal.id)}
      destaca={() => destacaPersonal(personal.id, personal.destaque)}
    />
  ))

  async function filtraDados(data) {
    if (data.pesq.length < 2) {
      Swal.fire("Digite, no mínimo, 2 caracteres")
      return
    }

    const pesquisa = data.pesq.toUpperCase()

    const response = await fetch("http://localhost:3004/personals")
    const dados = await response.json()

    const novosDados = dados.filter(personal =>
      personal.nome.toUpperCase().includes(pesquisa) || personal.treino.toUpperCase().includes(pesquisa) || personal.local.toUpperCase().includes(pesquisa)
    )
    
    if (novosDados.length == 0) {
      Swal.fire("Não há personals com a palavra chave informada...")
      return
    }

    setPersonal(novosDados)
  }

  async function mostraTodos() {
    const response = await fetch("http://localhost:3004/personals")
    const dados = await response.json()
    setPersonal(dados)
  }

  if (isLoading) {
    return (
      <div className="container">
        <h2>Listagem de personals</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }
{/* alterar para layout de personal */}
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm-7">
          <h2 className="mt-2">Listagem de personals</h2>
        </div>
        <div className="col-sm-5">
          <Pesquisa filtra={filtraDados} mostra={mostraTodos} />
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>CREF</th>
            <th>Treino</th>
            <th>Local</th>
            <th>Descricao</th>
          </tr>
        </thead>
        <tbody>
          {listaPersonals}
        </tbody>
      </table>
    </div>
  )
}