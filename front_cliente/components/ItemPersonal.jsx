import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"
import Estrelas from "./Estrelas"
import Link from "next/link"

export default function ItemPersonal(props) {

  const { clienteId } = useContext(ClienteContext)

  return (
    <div className="col">
      <div className="card">
        <img src={props.personal.foto} className="card-img-top" width={200} height={400} alt="..." />
        <div className="card-body">
          <p className="card-title">
            {props.personal.nome}
          </p>
          <p className="card-text">
            Tipo de Treino: {props.personal.treino}
          </p>
          <p className="card-text">
            Local: {props.personal.local}
          </p>
          <p className="small">
            {props.personal.descricao}
          </p>
        </div>
        {clienteId &&
          <div>
            <Estrelas soma={props.personal.soma} num={props.personal.num} />
            <div className="float-end">
              <i class="bi bi-chat-dots text-primary fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              <Link href={"/avaliar/" + props.personal.id}>
                <i class="bi bi-patch-plus text-danger fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              </Link>
            </div>
          </div>
        }
      </div>
    </div >
  )
}