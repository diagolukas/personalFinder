'use client'
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
import { useRouter } from "next/navigation"
import Pesquisa from "@/components/Pesquisa"
import Swal from 'sweetalert2'

export default function Listagem() {
  const [personals, setPersonals] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getPersonals() {
      const response = await fetch("http://localhost:3004/personals")
      const dados = await response.json()
      setPersonals(dados)
      setIsLoading(false)
    }
    getPersonals()
  }, [])

  async function excluiPersonal(id) {
    const response = await fetch("http://localhost:3004/personals/" + id, {
      method: "DELETE"
    })
    const novosDados = personals.filter(personal => personal.id != id)
    setPersonals(novosDados)
  }

  async function destacaPersonal(id, status_atual) {
    await fetch("http://localhost:3004/personals/destaca/" + id, { method: "PATCH" })
    const indiceAlterado = personals.findIndex(personal => personal.id == id)
    const novosDados = [...personals]
    novosDados[indiceAlterado].destaque = !status_atual
    setPersonals(novosDados)
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

    // busca todos os dados e aplica o filtro no vetor
    // -----------------------------------------------
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

    setPersonals(novosDados)

    // busca os dados da API já com o filtro
    // --------------------------------------
    // const response = await fetch("http://localhost:3004/personals?titulo="+data.pesq)
    // const dados = await response.json()
    // setPersonals(dados)
  }

  async function mostraTodos() {
    const response = await fetch("http://localhost:3004/personals")
    const dados = await response.json()
    setPersonals(dados)
  }

  if (isLoading) {
    return (
      <div className="container">
        <h2>Listagem de personals</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm-7">
          <h2 className="mt-2">Listagem de personals</h2>
        </div>
        <div className="col-sm-5 d-flex">
          <Pesquisa filtra={filtraDados} mostra={mostraTodos} />
          <button className="btn btn-danger ms-3 my-2" 
            onClick={() => router.push("/cadastro")}>
              Novo
          </button>
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