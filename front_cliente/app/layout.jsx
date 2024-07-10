import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Titulo from '@/components/Titulo';
import ClienteProvider from '@/contexts/cliente';

export const metadata = {
  title: 'PersonalFinder',
  description: 'PersonalFinder, Avaliação e Comentários de Personal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="/halteres.png" />
      </head>
      <body>
        <ClienteProvider>
          <Titulo />
          {children}
        </ClienteProvider>
      </body>
    </html>
  )
}
