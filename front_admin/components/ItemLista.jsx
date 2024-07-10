import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import Swal from 'sweetalert2'

export default function ItemLista(props) {

  function confirmaExclusao(id, titulo) {
    // if (confirm(`Confirma Exclusão do personal "${titulo}"?`)) {
    //   props.exclui(id)
    // }
    Swal.fire({
      title: `Confirma Exclusão do personal "${titulo}"?`,
      text: "Esta operação não poderá ser desfeita",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim. Excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.exclui(id)
        Swal.fire(
          'Excluído!',
          'personal excluído com sucesso',
          'success'
        )
      }
    })
  }

  return (
    <tr>
      <td>
        <img src={props.personal.foto} alt={`foto de ${props.personal.nome}`} width={80} />        
      </td>
      <td className={props.personal.destaque ? "fw-bold" : ""}>{props.personal.nome}</td>
      <td className={props.personal.destaque ? "fw-bold" : ""}>{props.personal.cref}</td>
      <td className={props.personal.destaque ? "fw-bold" : ""}>{props.personal.treino}</td>
      <td className={props.personal.destaque ? "fw-bold" : ""}>{props.personal.local}</td>
      <td className={props.personal.destaque ? "fw-bold" : ""}>{props.personal.descricao}</td>

      <td>
        <i className="bi bi-x-circle text-danger" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={() => confirmaExclusao(props.personal.id, props.personal.titulo)}
           title="Excluir"
        ></i>
        <i className="bi bi-pencil-square text-warning ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.altera}
           title="Alterar"
        ></i>
        <i className="bi bi-search text-success ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.consulta}
           title="Consultar"
        ></i>
        <i className="bi bi-house-check text-primary ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.destaca}
           title="Destacar"
        ></i>
      </td>
    </tr>    
  )
}