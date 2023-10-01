function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/output.css" rel="stylesheet" />
        <link rel="icon" href="data:," />
        <title>Charlottes Web Log</title>
      </head>

      <body className="flex flex-col p-4 gap-4">{children}</body>
    </html>
  )
}

export default Layout
