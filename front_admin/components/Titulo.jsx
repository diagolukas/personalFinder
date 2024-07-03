import Link from "next/link"; 
import Image from "next/image"; 

export default function Titulo() {
  return (
    <nav className="navbar navbar-expand-lg bg-danger">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <img src="./halteres.png" alt="Logo" width="72" height="60" className="d-inline-block align-text-top"/>
          <h2 className="float-end mt-2 ms-2">Personal Finder: ADM</h2>
        </Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link text-light" href="/cadastro">Cadastro</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" href="/listagem">Listagem</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}