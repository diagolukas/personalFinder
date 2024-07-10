'use client'

import ItemPersonal from "@/components/ItemPersonal"
import { useEffect, useState } from "react"

export default function Home() {
  const [personals, setPersonals] = useState([])

  useEffect(() => {
    async function getPersonals() {
//      const response = await fetch("http://localhost:3004/personals?destaque=true")
      const response = await fetch("http://localhost:3004/personals/destaques")
      const dados = await response.json()
      setPersonals(dados)
    }
    getPersonals()
  }, [])

  const listaPersonals = personals.map(personal => (
    <ItemPersonal key={personal.id}
      personal={personal}
    />
  ))

  return (
    <div className="container mt-3">
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
        {listaPersonals}
      </div>
    </div>
  )
}
