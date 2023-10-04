function Layout({ children }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>knex-joins-stories</title>
      </head>
      <body>
        <div className="app">{children}</div>
      </body>
    </html>
  )
}

export default Layout
