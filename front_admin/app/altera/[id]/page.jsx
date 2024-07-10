'use client'
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Alteracao() {
  const params = useParams()
  //  console.log(params)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    async function getPersonal() {
      const response = await fetch("http://localhost:3004/personals/"+params.id)
      const dado = await response.json()
      reset({
        nome: dado.nome,
        cref: dado.cref,
        cpf: dado.cpf,
        treino: dado.treino,
        local: dado.local,
        descricao: dado.descricao,
        foto: dado.foto
      })
    }
    getPersonal()
  }, [])

  async function alteraDados(data) {    
    const personal = await fetch("http://localhost:3004/personals/"+ params.id,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      },
    )
    if (personal.status == 200) {
      // alert("Ok! personal cadastrado com sucesso")
      toast.success("Ok! personal alterado com sucesso")
    } else {
      // alert("Erro...")
      toast.error("Erro... Não foi possível concluir a alteração")
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Alteração de personals</h2>
      <form onSubmit={handleSubmit(alteraDados)}>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="titulo" className="form-label">Nome do personal</label>
            <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="cref" className="form-label">cref</label>
            <input type="decimal" className="form-control" maxLength={6} id="cref" {...register("cref")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="cpf" className="form-label">cpf</label>
            <input type="decimal" className="form-control" maxLength={11} id="cpf" {...register("cpf")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="treino" className="form-label">treino</label>
            <input type="text" step="0.10" className="form-control" id="treino" {...register("treino")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="local" className="form-label">local</label>
            <input type="text" step="0.10" className="form-control" id="local" {...register("local")} required />
          </div>
        </div>
        <div className="col-sm-4">
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <input type="textarea" className="form-control" id="descricao" {...register("descricao")} required />
        </div>

        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="foto" className="form-label">foto do personal</label>
            <input type="url" className="form-control" id="foto" {...register("foto")} required />
          </div>
        </div>

        <input type="submit" value="Alterar" className="btn btn-success me-3" />
        <input type="button" value="Limpar" className="btn btn-danger"
          onClick={() => reset()} />

      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}