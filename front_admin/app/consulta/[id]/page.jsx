import Link from "next/link"

async function getPersonal(id) {
  const response = await fetch("http://localhost:3004/personals/"+id)
  const dado = await response.json()
  // console.log("=".repeat(40))
  // console.log(dado)
  // console.log("=".repeat(40))
  return dado
}

export default async function Consulta({params}) {

  const personal = await getPersonal(params.id)
  
  return (
    <div className="container">
      <h2 className="mt-2">Consulta de personals</h2>
      <form>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="nome" className="form-label">Nome do personal</label>
            <input type="text" className="form-control" id="nome" value={personal.nome} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="treino" className="form-label">Treino</label>
            <input type="text" className="form-control" id="treino" value={personal.treino} readOnly />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-3">
            <label htmlFor="local" className="form-label">local</label>
            <input type="text" className="form-control" id="local" value={personal.local} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="descricao" className="form-label">Descrição</label>
            <input id="descricao" className="form-control" value={personal.descricao} readOnly />
          </div>
          <div className="col-sm-2">
            <p>Status do personal:</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" 
                id="destaque" 
                checked={personal.destaque}
                readOnly
                />
              <label className="form-check-label" htmlFor="destaque">Destaque</label>
            </div>
          </div>
        </div>

        <Link className="btn btn-success float-end" href="/listagem">Voltar</Link>

      </form>
    </div>
  )
}