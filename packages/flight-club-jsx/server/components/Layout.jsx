function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Hack the Airlines</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="output.css" rel="stylesheet" />
      </head>
      <body className="grid place-items-center min-h-screen print:block">
        {children}
      </body>
    </html>
  )
}

export default Layout
