import Dog from './Dog.tsx'
import Subtitle from './Subtitle.tsx'

function App() {
  return (
    <div className="container">
      <img
        className="spinner"
        alt="a spinning paw-print"
        src="/images/paw.png"
      />
      <Subtitle text="Doggos" />
      <Dog name="Fido" breed="Bulldog" superpower="plays fetch" />
      <Dog name="Bruce" breed="Dachshund" superpower="barks" />
    </div>
  )
}

export default App
