import 'bootstrap/dist/css/bootstrap.css'
import Titulo from '@/components/Titulo'

export const metadata = {
  title: 'Personal Controler',
  description: 'Sistema de Controle de Personais',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">  
    <head>
      <link rel="shortcut icon" href="./halteres.png" type="image/x-icon" />  
    </head>    
      <body>
        <Titulo />
        {children}
      </body>
    </html>
  )
}
