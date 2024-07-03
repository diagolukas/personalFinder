'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Estrelas from '@/components/Estrelas'
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"

export default function Avaliar() {
  const params = useParams()
  const [personal, setPersonal] = useState({})
  const { clienteId } = useContext(ClienteContext)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { estrelas: 3 }
  })

  useEffect(() => {
    async function getPersoanl() {
      const response = await fetch("http://localhost:3004/personals/" + params.id)
      const dado = await response.json()
      setPersonal({
        id: dado.id,
        nome: dado.nome,
        cref: dado.cref,
        cpf: dado.cpf,
        treino: dado.treino,
        local: dado.local,
        descricao: dado.descricao,
        avaliacao: dado.avaliacao,
        foto: dado.foto,
        soma: dado.soma,
        num: dado.num
      })
    }
    getPersoanl()
  }, [])

  async function enviaComentario(data) {
    const avaliacao = {...data, cliente_id: clienteId, personal_id: personal.id}

    const avalia = await fetch("http://localhost:3004/avaliacao",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(avaliacao)
      },
    )

    if (avalia.status == 201 && atualiza_estrelas.status == 200) {
      alert("Ok! Avaliação cadastrada com sucesso")
      reset()
    } else {
      alert("Erro no cadastro da avaliação...")
    }
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <div className="card">
            <img src={personal.foto} alt="personal" width={300} className="mx-auto d-block mt-1" />
            <div className="card-body">
              <h5 className="card-title">
                {personal.nome}
              </h5>
              <p className="card-text">
                Treino: {personal.treino}
              </p>
              <p className="card-text">
                {personal.descricao}
              </p>
              <p className="card-text small">
                {/* Valor: R$ {personal.preco} */}
              </p>
              <Estrelas soma={personal.soma} num={personal.num} />
              <span className="ms-2">{personal.num} avaliações</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <form className="card-body" onSubmit={handleSubmit(enviaComentario)}>
              <h3 className="card-title">Cadastre o seu comentário sobre este Personal</h3>
              <hr />
              <div class="my-4">
                <label for="comentario" class="form-label fs-5">Seu Comentário:</label>
                <textarea class="form-control form-control-lg" id="comentario" rows="3"
                  {...register("comentario")}></textarea>
              </div>
              <div class="mb-3">
                <label for="estrelas" class="form-label fs-5">Sua Avaliação (Estrelas)</label>
                <select class="form-select form-select-lg mb-3" {...register("estrelas")}>
                  <option value="1">1 Estrela</option>
                  <option value="2">2 Estrelas</option>
                  <option value="3">3 Estrelas</option>
                  <option value="4">4 Estrelas</option>
                  <option value="5">5 Estrelas</option>
                </select>
              </div>
              <div class="d-grid gap-2 col-6 ms-auto">
                <input type="submit" className="btn btn-primary btn-lg mt-3" value="Enviar" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}