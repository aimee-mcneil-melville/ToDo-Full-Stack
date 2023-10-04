interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <html>
      <head>
        <title>Dev Academy Phase 1 Express Boilerplate</title>
      </head>

      <body>{children}</body>
    </html>
  )
}

export default Layout
