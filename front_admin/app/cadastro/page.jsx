'use client'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Cadastro() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
    }
  });

  async function enviaDados(data) {
    //    console.log(data);    
    const personal = await fetch("http://localhost:3004/personals",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      },
    )
    if (personal.status == 201) {
      // alert("Ok! personal cadastrado com sucesso")
      toast.success("Ok! personal cadastrado com sucesso")
      reset()
    } else {
      // alert("Erro...")
      toast.error("Erro... Não foi possível concluir o cadastro")
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Cadastro de personais</h2>
      <form onSubmit={handleSubmit(enviaDados)}>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="nome" className="form-label">Nome do personal</label>
            <input type="text" className="form-control" id="nome" {...register("nome")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="cpf" className="form-label">cpf do personal</label>
            <input type="text" className="form-control" maxLength={11} id="cpf" {...register("cpf")} required />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-10">
            <label htmlFor="descricao" className="form-label">descrição</label>
            <input type="text" className="form-control" id="descricao" {...register("descricao")} required />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="treino" className="form-label">treino</label>
            <input type="text" className="form-control" id="treino" {...register("treino")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="cref" className="form-label">CREF</label>
            <input type="decimal" className="form-control" maxLength={6} id="cref" {...register("cref")} required />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="foto" className="form-label">Foto do personal</label>
            <input type="url" className="form-control" id="foto" {...register("foto")} required />
          </div>

          <div className="col-sm-4">
            <label htmlFor="local" className="form-label">local</label>
            <input type="text" className="form-control" id="local" {...register("local")} required />
          </div>
        </div>

        <div className="mt-4">
          <input type="submit" value="Enviar" className="btn btn-primary me-3" />
          <input type="button" value="Limpar" className="btn btn-danger"
            onClick={() => reset()} />
        </div>
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