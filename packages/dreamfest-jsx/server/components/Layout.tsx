import Footer from './Footer.tsx'
import Header from './Header.tsx'

interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/main.css" rel="stylesheet" />
        <link rel="icon" href="data:," />
        <title>DreamFest</title>
      </head>

      <body>
        <div id="page-container">
          <div id="content-wrap">
            <Header />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}

export default Layout
