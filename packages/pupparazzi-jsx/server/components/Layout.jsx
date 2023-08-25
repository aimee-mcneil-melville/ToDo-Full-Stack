function Layout({ children }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Pupparazzi</title>
        <link
          href="https://fonts.googleapis.com/css?family=Spirax"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/main.css" />
        <link rel="icon" href="data:," />
      </head>
      <body>
        <div class="app">
          <h1 class="title">Pupparazzi</h1>
          <a class="nav" href="/">
            Home
          </a>
          {children}
        </div>
      </body>
    </html>
  )
}

export default Layout
