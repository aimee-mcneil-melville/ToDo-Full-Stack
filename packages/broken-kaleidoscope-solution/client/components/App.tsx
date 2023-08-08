import Pixel from './Pixel.tsx'

function App() {
  return (
    <>
      {Array.from({ length: 100 }).map((_, i) => (
        <Pixel key={i} />
      ))}
    </>
  )
}

export default App
