function Screen() {
  // TODO: select the message from global state
  const message = 'Fix me'

  return (
    <p
      className="text-4xl text-center mt-10 bg-slate-900 text-white whitespace-pre-wrap"
      style={{ fontFamily: 'ConnectionRegular' }}
    >
      {message}
    </p>
  )
}

export default Screen
