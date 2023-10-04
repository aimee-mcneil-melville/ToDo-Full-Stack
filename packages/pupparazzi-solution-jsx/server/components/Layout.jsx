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
        <div className="app">
          <h1 className="title">Pupparazzi</h1>
          <a className="nav" href="/">
            Home
          </a>
          <a className="nav" href="/new">
            Add Puppy
          </a>
        </div>
        {children}
      </body>
    </html>
  )
}

export default Layout
