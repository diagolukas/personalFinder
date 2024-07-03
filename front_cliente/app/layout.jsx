import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Titulo from '@/components/Titulo';
import ClienteProvider from '@/contexts/cliente';

export const metadata = {
  title: 'Personal Finder',
  description: 'Personal Finder, Avaliação e Comentários',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <link rel="shortcut icon" href="./logo.png" type="image/x-icon" />
      <body>
        <ClienteProvider>
          <Titulo />
          {children}
        </ClienteProvider>
      </body>
    </html>
  )
}
